import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesApp from './routes';

function App() {
  return (
    <div className="App">
      <Router>
        <RoutesApp />
      </Router>
    </div>
  );
}

export default App;
