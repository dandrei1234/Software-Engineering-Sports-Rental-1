import React from 'react';
import './StaffDashboard.css';

const StaffDashboard = ({ user, setUser }) => {

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/";
    };

    return (
        <div className="dashboard">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="logo">
                    <h3>SMU Sports</h3>
                    <span>RENTAL SYSTEM</span>
                </div>

                <nav>
                    <a className="active">Dashboard</a>
                    <a href="/equipment">Equipment</a>
                    <a href="/rentals">Rentals</a>
                    <a>Audit Logs</a>
                </nav>

                <div className="profile">
                    <div className="avatar">S</div>
                    <div>
                        <p>{user?.fullname}</p>
                        <span>Staff</span>
                    </div>
                </div>

                <button className="logout" onClick={handleSignOut}>
                    Sign Out
                </button>
            </aside>

            {/* MAIN */}
            <main className="main">

                {/* HEADER */}
                <div className="header">
                    <h2>Dashboard</h2>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>

                {/* STATS */}
                <div className="cards">
                    <div className="card">
                        <p>Total Equipment</p>
                        <h2>30</h2>
                    </div>
                    <div className="card">
                        <p>Available Now</p>
                        <h2>30</h2>
                    </div>
                    <div className="card">
                        <p>Active Rentals</p>
                        <h2>0</h2>
                    </div>
                    <div className="card red">
                        <p>Overdue Items</p>
                        <h2>0</h2>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="content">

                    {/* LEFT */}
                    <div className="left">
                        <div className="box">
                            <div className="box-header">
                                <h3>Recent Rentals</h3>
                                <span>View All</span>
                            </div>

                            <div className="empty">
                                No recent rental activity.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="right">
                        <div className="highlight">
                            <h3>Need Equipment?</h3>
                            <p>Browse our catalog and request items for your sports activities.</p>
                            <button>Browse Catalog</button>
                        </div>

                        <div className="box">
                            <h3>Rental Rules</h3>
                            <ul>
                                <li>✔ Maximum 3 items at a time</li>
                                <li>✔ Return within 24 hours</li>
                                <li>✔ Report damage immediately</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default StaffDashboard;