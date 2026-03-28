import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

import Navbar from './Navbar';

const Login = () => {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState(''); // Changed from username
    const [password, setPassword] = useState('');

    const [loadRoute, setLoadRoute] = useState(false);

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:1337/api/login', {
            email,
            password,
            role // Still sending role to the backend to verify
        });
        setRole(response.data.user.role);
        

        
        if (response.data.success) {
            // 1. SAVE THE USER OBJECT TO LOCAL STORAGE
            // This includes fullname, email, and ROLE from your users_tbl
            localStorage.setItem('user', JSON.stringify(response.data.user));

            alert(`role: ${response.data.user.role}`);
            alert(`Welcome ${response.data.user.fullname}!`);

            setLoadRoute(true);
            //window.location.href = '/dashboard';
        }
    } catch (err) {
        alert(err.response?.data?.message || "Login failed");
    }

    function renderContent() {
        if (!loadRoute) {
            return (
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-logo">SMU</div>
                        <h2>GSO Sports Rental</h2>

                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label>EMAIL ADDRESS</label>
                                <input 
                                    type="email"  
                                    placeholder="example@smu.edu.ph"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="input-group">
                                <label>PASSWORD</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <button type="submit" className="login-button">→ Login</button>
                        </form>
                        <p className="footer-text">Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            );
        }
        return null;
    }
};

    return (
        <>
            {loadRoute? <Navbar role={role} /> : {renderContent}}

        
        </>
    );
};

export default Login;