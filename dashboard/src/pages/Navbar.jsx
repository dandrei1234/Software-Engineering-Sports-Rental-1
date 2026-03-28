import { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { Drawer } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const width = 240;
const navStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#2a43d1" : "transparent",
    color: isActive ? "white" : "inherit"
});

const Navbar = ({role}) => {
    const [routes, setRoutes] = useState([]);


    useEffect(() => {
        if (role?.toLowerCase() === 'staff') {
            staffNavbar();
        } else {
            studentNavbar();
        }
    }, []);

    function studentNavbar() {
        setRoutes([
            { path: '/', name: 'Rentals' },
            { path: '/palitan', name: 'Equipment' }
        ]);
    };

    function staffNavbar() {
        setRoutes([
            { path: '/dashboard', name: 'Dashboard' },
            { path: '/', name: 'Rentals' },
            { path: '/palitan', name: 'Equipment' }
        ]);
    };

    function renderContent() {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        backgroundColor: "#273168",
                        color: "white",
                        width: {width},
                        boxSizing: "border-box"
                    }
                }}
                >
                <List>
                    {routes.map((route, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton
                                component={NavLink} to={route.path} style={navStyle}
                            >
                                <ListItemText primary={route.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }


    return (
        <>
            {renderContent()}
        </>
    );
};

export default Navbar;