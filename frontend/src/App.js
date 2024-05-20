import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
