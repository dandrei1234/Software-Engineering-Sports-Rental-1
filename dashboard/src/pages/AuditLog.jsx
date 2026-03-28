import { useState } from 'react';
import { CardContent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { CardTitle, MinorText, StyledCard, MyButton } from '../Styles';

const AuditLog = () => {
    const [logs, setLogs] = useState([
        { logID: 1, date: '2023-10-01', time: '10:00 AM', userID: '1', action_type: 'Test', action_details: 'User logged in' }
    ]);
    
    const [users, setUsers] = useState([
        { userID: '0', fullname: 'N/A' },
        { userID: '1', fullname: 'John Doe' }
    ]);

    return (
        <StyledCard sx={{minWidth: '600px'}}>
            <CardTitle title="Audit Log" />
            <CardContent>
                <Table stickyHeader sx={{backgroundColor: "white"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {logs.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell><MinorText>{log.logID}</MinorText></TableCell>
                                <TableCell>
                                    {log.date}<br/>
                                    <MinorText small>{log.time}</MinorText>
                                </TableCell>
                                <TableCell>{log.userID}</TableCell>
                                <TableCell>{log.action_type}</TableCell>
                                <TableCell>{log.action_details}</TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </StyledCard>
    );
};

export default AuditLog;