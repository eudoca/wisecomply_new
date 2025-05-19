import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Minimal React App</h1>
      <p>If you can see this, React is working!</p>
      <button onClick={() => alert('Button clicked!')}>Click me</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);