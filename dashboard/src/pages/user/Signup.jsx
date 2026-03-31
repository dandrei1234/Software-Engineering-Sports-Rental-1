import React, { useState } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

import {
  Box, Card, CardContent,
  Typography, FormControl, InputLabel,
  OutlinedInput, InputAdornment, IconButton,
  Button }
from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./styles";
import DisplayMessage from "./DisplayMessage";

export default function Signup({setUser}) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const registerUser = async () => {
        if (formData.name === "" || formData.email === "" || formData.password === "") {
            alert("Fields must not be empty")
            return;
        }

        alert("Trying");
        try {
            const response = await axios.post('http://localhost:1337/users/signup', formData);
            setUsername('');
            setPassword('');

            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message || "Signup failed");
        }
    };
    
    return (
        <>
        <DisplayMessage
            open={showDialog} setOpen={setShowDialog}
            message={dialogMessage} />

        <Box sx={styles.container}>
            <Button onClick={() => setShowDialog(true)}>Test</Button>

        <Card sx={styles.card}>
        <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
                Signup
            </Typography>

            <FormControl fullWidth margin="normal">
                <InputLabel>Full Name</InputLabel>
                <OutlinedInput id="name" label="Full Name" type="text"
                    value={formData.name}
                    onChange={handleChange} />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Email</InputLabel>
                <OutlinedInput id="email" label="Email" type="email"
                    value={formData.email}
                    onChange={handleChange}  />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"

                    value={formData.password}
                    onChange={handleChange}

                    endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                />
            </FormControl>


            <Button
                variant="contained"
                fullWidth
                sx={styles.button}
                onClick={registerUser}
            >
                Sign up
            </Button>
        </CardContent>
        </Card>
        </Box>
        </>
        
    );
};