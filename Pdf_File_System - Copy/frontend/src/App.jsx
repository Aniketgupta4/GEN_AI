import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexStatus, setIndexStatus] = useState('Idle');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  
  // Naya state for Mobile Sidebar Toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIndexStatus('Ready to index');
    }
  };

  // ASLI BACKEND CALL FOR PDF UPLOAD & INDEXING
  const handleIndexPDF = async () => {
    if (!selectedFile) return;
    setIsIndexing(true);
    setIndexStatus('Uploading and Indexing PDF... This might take a minute.');
    
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      setIsIndexing(false);
      setIndexStatus('Indexing Complete! Document is ready.');
      setMessages([{ sender: 'system', text: `Successfully indexed "${selectedFile.name}". You can now ask questions.` }]);
    } catch (error) {
      setIsIndexing(false);
      setIndexStatus('Error in indexing PDF.');
      setMessages([{ sender: 'system', text: "Upload failed. Make sure your backend server is running on port 3001." }]);
    }
  };

  // ASLI BACKEND CALL FOR CHAT QUERIES
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedFile) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsAsking(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { sender: 'ai', text: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error connecting to backend API." }]);
    }
    
    setIsAsking(false);
  };

  return (
    <div className="dashboard-container">
      
      {/* LEFT SIDEBAR (Dynamic Class for Mobile) */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        
        {/* Mobile Close Button */}
        <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>

        <div className="brand">
          <div className="logo">R</div>
          <div>
            <p className="brand-subtitle">PDF RAG</p>
            <h1 className="brand-title">Ask your PDF</h1>
          </div>
        </div>

        <div className="card upload-card">
          <h3 className="card-label">Upload PDF</h3>
          <div className="file-input-wrapper">
            <label className="file-input-btn">
              Choose File
              <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
            </label>
            <span className="file-name">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
          </div>
          <button 
            className={`primary-btn ${isIndexing ? 'loading' : ''}`} 
            onClick={handleIndexPDF}
            disabled={!selectedFile || isIndexing}
          >
            {isIndexing ? <span className="spinner"></span> : 'Index PDF'}
          </button>
        </div>

        <div className="card info-card">
          <h3 className="card-label">Status</h3>
          <p className="card-value status-text">{indexStatus}</p>
        </div>

        <div className="card info-card">
          <h3 className="card-label">Active Document</h3>
          <p className="card-value truncate">{selectedFile ? selectedFile.name : 'None selected'}</p>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* MAIN CHAT AREA */}
      <main className="main-content">
        
        <header className="chat-header">
          <div className="header-left">
            {/* Hamburger Button for Mobile */}
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <div className="header-info">
              <h2 className="header-title">DOCUMENT CHAT</h2>
              <p className="header-subtitle">Grounded answers from your file</p>
            </div>
          </div>
          <div className="status-indicator online"></div>
        </header>

        <div className="chat-window">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>Upload a document to start</h3>
              <p>Your RAG assistant is waiting for a PDF to analyze.</p>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-row ${msg.sender}`}>
                  <div className={`message-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="message-row ai">
                  <div className="message-bubble ai typing">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Ask something..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!selectedFile || isIndexing || isAsking}
            />
            <button 
              className="send-btn" 
              onClick={handleSendMessage}
              disabled={!input.trim() || !selectedFile || isAsking}
            >
              Ask
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;