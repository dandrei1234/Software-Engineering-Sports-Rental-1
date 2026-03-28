import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardContent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { CardTitle, StyledCard, MyButton } from '../Styles';

const Rentals = () => {
    const [rentals, setRentals] = useState([]);

    const [equipment, setEquipment] = useState([
        { equipmentID: 0, equipment_name: 'N/A' },
        { equipmentID: 1, equipment_name: 'Basketball (Spalding)' },
        { equipmentID: 2, equipment_name: 'Volleyball (Mikasa)' },
    ]);

    useEffect(() => {
        viewRentals();
    }, []);

    async function viewRentals() {
        axios
            .get("http://localhost:1337/rentals/view")
            .then((response) => {
                setRentals(response.data);
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <StyledCard sx={{minWidth: '600px'}}>
            <CardTitle title="Rentals" />
            <CardContent>
                <Table stickyHeader sx={{backgroundColor: "white"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Dates</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rentals.map((rental, index) => (
                            <TableRow key={index}>
                                <TableCell>{rental.rentalID}</TableCell>
                                <TableCell>{equipment[rental.equipmentID]?.equipment_name || 'N/A'}</TableCell>
                                <TableCell sx={{fontSize: '12px', minWidth: '150px'}}>
                                    Due: {rental.due_date}<br/>
                                    Return: {rental.return_date}<br/>
                                    Request: {rental.request_date}
                                </TableCell>
                                <TableCell>{rental.status}</TableCell>
                                <TableCell>
                                    <MyButton
                                        sx={{
                                            fontSize: '12px',
                                            width: '80px'
                                        }}>Approve</MyButton>

                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </StyledCard>
    );
};

export default Rentals;