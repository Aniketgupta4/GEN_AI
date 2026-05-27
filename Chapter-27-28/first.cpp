#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>

using namespace std;


struct Example { // -> WHY DOUBLE -> B/C KOI BHI VALUE DOUBLE PE HO SHAKTI HAI
    double study;
    double sleep;
    double marks;
};

// LOAD/STORE OUR DATA IN VECTOR
vector<Example> loadDataset(string filename) {
    vector<Example> data;
    ifstream file(filename);   // -> FILE WAHA SE DATA STRING PE ATA HAI
    string line;

    getline(file, line); // skip header

    while (getline(file, line)) {
        stringstream ss(line);  // -> Line ko stream me convert kiya.
        string val;
        Example e;

        getline(ss, val, ','); e.study = stod(val); // 9,2,55 -> SO -> e.study = 9
        getline(ss, val, ','); e.sleep = stod(val); // e.sleep = 2 
        getline(ss, val, ','); e.marks = stod(val); // e.marks = 55

        data.push_back(e);
    }
    return data;
}


double predict(double study, double sleep,
               double w1,    double w2, double b) {
    return w1 * study + w2 * sleep + b; // FORMULA
}


void train(vector<Example>& data, int epochs, double lr) {

    // Step 1 — start with random small weights
    double w1 = 10.0, w2 = 5.0, b = 6.0;

    for (int epoch = 1; epoch <= epochs; epoch++) {


        for (auto& e : data) {  // same dataset pe bar bar train hona <- epochs
            double predicted = predict(e.study, e.sleep, w1, w2, b);
            double error = e.marks - predicted;          
            w1 = w1 + lr * e.study * error;
            w2 = w2 + lr * e.sleep * error;
            b  = b  + lr * 1       * error; 

        }

        // Print progress every 100 epochs
        if (epoch % 100 == 0) {
            cout << "Epoch " << epoch
                 << "  |  w1=" << w1
                 << "  w2="    << w2
                 << "  b="     << b
                 << endl;
        }
    }

    // Final learned weights
    cout << "\n==============================\n";
    cout << "Training Complete!\n";
    cout << "Learned  →  w1=" << w1
         << "  w2=" << w2
         << "  b="  << b  << endl;
    cout << "Expected →  w1=5  w2=3  b=4\n";
}


int main() {
    vector<Example> data = loadDataset("dataset.csv");

    cout << "Dataset loaded: " << data.size() << " examples\n";

    int    epochs = 1000;
    double lr     = 0.0001;  

    train(data, epochs, lr);

    return 0;
}

// -> AFTER TRAIN IT PREDICTS -> w1=4.92057  w2=2.9442  b=4.85644
// -> BUT EXPECTED -> w1=5  w2=3  b=4


