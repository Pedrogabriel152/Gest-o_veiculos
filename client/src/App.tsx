import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesApp from './routes';

// Toatify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Contexts/auth';

function App() {
  return (
    <div className="App">
      
      <Router>
        <AuthProvider>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
