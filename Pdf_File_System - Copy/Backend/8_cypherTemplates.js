// =====================================================================
// 8_cypherTemplates.js — SAFE CYPHER GENERATION
// =====================================================================
//
// LLM NEVER writes raw Cypher. Instead:
//   1. LLM outputs a JSON plan (which templates to use)
//   2. This file VALIDATES every step against whitelists
//   3. This file BUILDS safe read-only Cypher
//
// WHITELIST = list of things that ARE allowed.
// Anything NOT on the list is rejected.
//
// This guarantees: no DELETE, no SET, no CREATE can ever reach Neo4j.
// =====================================================================



// =====================================================================
// 8_cypherTemplates.js — SAFE CYPHER GENERATION (Updated for Generic Graph)
// =====================================================================

// ── What filter operators are allowed ──
const ALLOWED_OPERATORS = new Set([
  "=", "<>", ">", "<", ">=", "<=", "CONTAINS", "STARTS WITH",
]);

// Helper to generate short variables dynamically since labels are no longer known ahead of time
function getVarForLabel(label) {
  return label ? label.substring(0, 1).toLowerCase() + Math.random().toString(36).substring(2, 5) : 'n';
}

// Map to keep variables consistent within a single query build
let currentVarMap = {};

// Validate ONE step from the plan
function validateStep(step) {
  switch (step.type) {
    case "traversal":
      if (!step.from || typeof step.from !== 'string') throw new Error(`Invalid label: ${step.from}`);
      if (!step.to || typeof step.to !== 'string') throw new Error(`Invalid label: ${step.to}`);
      if (!step.rel || typeof step.rel !== 'string') throw new Error(`Invalid relationship: ${step.rel}`);
      break;

    case "filter": {
      const parts = step.field.split(".");
      if (parts.length !== 2) throw new Error(`Invalid field format: ${step.field}. Expected Label.property`);
      if (!ALLOWED_OPERATORS.has(step.op)) throw new Error(`Invalid operator: ${step.op}`);
      break;
    }

    case "projection":
      for (const field of step.fields) {
        const parts = field.split(".");
        if (parts.length !== 2) throw new Error(`Invalid field format: ${field}. Expected Label.property`);
      }
      break;

    case "aggregation": {
      const validAggs = ["count", "collect", "sum", "avg", "min", "max"];
      if (!validAggs.includes(step.function)) throw new Error(`Invalid aggregation: ${step.function}`);
      if (step.groupBy) {
          const parts = step.groupBy.split(".");
          if (parts.length !== 2) throw new Error(`Invalid groupBy format: ${step.groupBy}. Expected Label.property`);
      }
      break;
    }

    case "sort": {
      const parts = step.field.split(".");
      if (parts.length !== 2) throw new Error(`Invalid sort field format: ${step.field}. Expected Label.property`);
      if (!["ASC", "DESC"].includes(step.direction?.toUpperCase())) throw new Error(`Invalid direction: ${step.direction}`);
      break;
    }

    case "limit":
      if (typeof step.value !== "number" || step.value < 1 || step.value > 100)
        throw new Error(`Invalid limit: ${step.value}`);
      break;

    default:
      throw new Error(`Unknown step type: ${step.type}`);
  }
}

// Build safe Cypher from a validated plan
function buildCypher(plan) {
  const steps = plan.steps;

  // Validate ALL steps first
  steps.forEach(validateStep);

  const matchClauses = [];
  const whereClauses = [];
  let returnClause = "";
  let orderClause = "";
  let limitClause = "";
  const params = {};
  let paramCounter = 0;
  
  // Reset var map for this build
  currentVarMap = {};

  const getVar = (label) => {
      if (!currentVarMap[label]) {
          currentVarMap[label] = getVarForLabel(label);
      }
      return currentVarMap[label];
  }

  for (const step of steps) {
    switch (step.type) {
      case "traversal": {
        const fromVar = getVar(step.from);
        const toVar = getVar(step.to);
        matchClauses.push(
          `MATCH (${fromVar}:${step.from})-[:${step.rel}]->(${toVar}:${step.to})`
        );
        break;
      }

      case "filter": {
        const [label, prop] = step.field.split(".");
        const varName = getVar(label);
        const paramName = `p${paramCounter++}`;
        params[paramName] = step.value;
        whereClauses.push(`${varName}.${prop} ${step.op} $${paramName}`);
        break;
      }

      case "projection": {
        const fields = step.fields.map((f) => {
          const [lbl, prp] = f.split(".");
          return `${getVar(lbl)}.${prp}`;
        });
        const distinct = step.distinct ? "DISTINCT " : "";
        returnClause = `RETURN ${distinct}${fields.join(", ")}`;
        break;
      }

      case "aggregation": {
        const alias = step.alias || `${step.function}_result`;
        if (step.groupBy) {
          const [grpLabel, grpProp] = step.groupBy.split(".");
          const grpVar = getVar(grpLabel);
          const [aggLabel] = (step.field || "").split(".");
          const aggTarget = aggLabel ? getVar(aggLabel) : "*";
          returnClause = `RETURN ${grpVar}.${grpProp}, ${step.function}(${aggTarget}) AS ${alias}`;
        } else {
          const [aggLabel] = (step.field || "").split(".");
          const aggTarget = aggLabel ? getVar(aggLabel) : "*";
          returnClause = `RETURN ${step.function}(${aggTarget}) AS ${alias}`;
        }
        break;
      }

      case "sort": {
        const [sLabel, sProp] = step.field.split(".");
        const sVar = getVar(sLabel);
        if (returnClause.includes(` AS ${sProp}`)) {
          orderClause = `ORDER BY ${sProp} ${step.direction.toUpperCase()}`;
        } else {
          orderClause = `ORDER BY ${sVar}.${sProp} ${step.direction.toUpperCase()}`;
        }
        break;
      }

      case "limit": {
        limitClause = `LIMIT ${step.value}`;
        break;
      }
    }
  }

  const cypher = [
    ...matchClauses,
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "",
    returnClause,
    orderClause,
    limitClause,
  ].filter((p) => p.length > 0).join("\n");

  return { cypher, params };
}

export { buildCypher, validateStep };