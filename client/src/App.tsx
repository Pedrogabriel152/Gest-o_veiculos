import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesApp from './routes';

// Toatify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </Router>
    </div>
  );
}

export default App;
