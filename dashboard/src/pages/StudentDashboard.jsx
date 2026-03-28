import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ user, setUser }) => {
    
    const handleSignOut = () => {
        // 1. Clear browser memory
        localStorage.removeItem('user');
        
        // 2. Reset App state so App.jsx redirects to Login
        if (setUser) {
            setUser(null);
        }

        // 3. Optional: Hard redirect to ensure clean state
        window.location.href = '/'; 
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="logo-section">
                    <div className="logo-icon">S</div>
                    <div className="logo-text">
                        <strong>SMU Sports</strong>
                        <span>RENTAL SYSTEM</span>
                    </div>
                </div>
                
                <nav className="nav-links">
                    <a href="/dashboard" className="active">Dashboard</a>
                    <a href="/equipment">Equipment</a>
                    <a href="/rentals">Rentals</a>
                </nav>

                <div className="sidebar-footer">
                    <div className="profile-info">
                        <div className="avatar">A</div>
                        <div>
                            <p className="user-name">{user?.fullname || "Andrei Raymundo"}</p>
                            <p className="user-role">Student</p>
                        </div>
                    </div>
                    {/* FIXED: Added handleSignOut */}
                    <button className="sign-out-btn" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <h2>Dashboard</h2>
                    <span className="date-text">3/26/2026</span>
                </header>

                <div className="stats-row">
                    <div className="stat-card"><span>📦</span><p>Total Equipment</p><h3>30</h3></div>
                    <div className="stat-card"><span>✔️</span><p>Available Now</p><h3>30</h3></div>
                    <div className="stat-card"><span>🕒</span><p>Active Rentals</p><h3>0</h3></div>
                    <div className="stat-card"><span>⚠️</span><p>Overdue Items</p><h3>0</h3></div>
                </div>

                <div className="content-grid">
                    <div className="recent-activity">
                        <div className="section-header"><h4>Recent Rentals</h4></div>
                        <div className="empty-box">No recent rental activity.</div>
                    </div>
                    <div className="rules-section">
                        <h4>Rental Rules</h4>
                        <ul>
                            <li>✔️ Maximum 3 items at a time.</li>
                            <li>✔️ Return within 24 hours.</li>
                            <li>✔️ Report any damage.</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;