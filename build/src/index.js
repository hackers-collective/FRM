import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'transparent',
  padding: '20px',
  margin: '0 auto',
  maxWidth: '600px', // Set a maximum width for better mobile responsiveness
  boxSizing: 'border-box'
};

const bannerStyle = {
  fontFamily: 'Lexend Deca',
  fontSize: '48px', // Decreased the font size for mobile devices
  fontWeight: '500',
  color: '#000022',
  marginBottom: '20px',
  textAlign: 'center',
  margin: '0',
};

const subTitleStyle = {
  fontFamily: 'Lexend Deca',
  fontSize: '24px', // Decreased the font size for mobile devices
  color: '#555555',
  marginBottom: '40px',
  textAlign: 'center',
  margin: '0',
};

const NotFound = () => (
  <div style={containerStyle}>
    <h1 style={bannerStyle}>
    <span style={{ color: '#2222FF' }}>404 </span>
     - Page Not Found
    </h1>
    <p style={subTitleStyle}>
      The requested page does not exist.
    </p>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
