import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginForm'; 
import RegisterForm from './pages/RegisterForm'; 
import StudentDashboard from './pages/StudentDashboard'; 
import StaffDashboard from './pages/StaffDashboard'; 

import Styles from './Styles'; 
import Navbar from './pages/Navbar'; 
import AddEquipment from './pages/insert/AddEquipment';
import Rentals from './pages/Rentals';
import AuditLog from './pages/AuditLog';

import Test from './pages/insert/Test';

import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <div style={{ backgroundColor: '#000', height: '100vh' }}></div>;

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to dashboard if already logged in */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm />} />


          <Route path="/navbar" element={<Navbar />} />
          <Route path="/add-equipment" element={<AddEquipment />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/audit-log" element={<AuditLog />} />

          <Route path="/popup" element={<Test />} />


          <Route 
            path="/dashboard" 
            element={
              user ? (
                user.role?.toLowerCase() === 'staff' ? (
                  <StaffDashboard user={user} setUser={setUser} />
                ) : (
                  <StudentDashboard user={user} setUser={setUser} />
                )
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;