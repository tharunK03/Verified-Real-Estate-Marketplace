import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Assuming Dashboard exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to Real Estate Portal</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard role={localStorage.getItem('userRole')} />} />
      </Routes>
    </Router>
  );
}

export default App;
