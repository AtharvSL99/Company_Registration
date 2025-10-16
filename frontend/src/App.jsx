import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* Add other routes here */}
          <Route path="/" element={<div>Welcome to the Company Registration & Verification Module</div>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
