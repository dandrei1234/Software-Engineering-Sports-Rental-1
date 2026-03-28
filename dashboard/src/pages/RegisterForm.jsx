import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const RegisterForm = () => {
    // Keep your individual states
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to lowercase staff/student

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/register', {
                fullname,
                email,
                password,
                role // Sends the current 'role' state
            });

            if (response.data.success) {
                alert("Registration successful! You can now login.");
                window.location.href = '/login'; 
            }
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">SMU</div>
                <h2>Create Account</h2>
                <p className="subtitle">GSO Sports Equipment Rental</p>

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>FULL NAME</label>
                        <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required 
                        />
                    </div>

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

                    <div className="input-group">
                        <label>ACCOUNT TYPE</label>
                        <select 
                            className="role-select" 
                            /* FIX: Changed from formData.role to role */
                            value={role} 
                            /* FIX: Changed from handleChange to setRole */
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            {/* Values MUST be lowercase for your MySQL ENUM */}
                            <option value="student">Student</option>
                            <option value="staff">Staff / GSO Personnel</option>
                        </select>
                    </div>

                    <button type="submit" className="login-button">→ Register</button>
                </form>
                
                <p className="footer-text">
                    Already have an account? <a href="/">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;