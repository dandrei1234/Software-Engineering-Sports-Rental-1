import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddEquipmentPopup from './Popup';

function Test() {
    
    const [open, setOpen] = useState(false);
    return (
        <>
            <AddEquipmentPopup open={open} setOpen={setOpen} />
            
            <Button variant="contained" onClick={() => setOpen(true)}>
                Open Popup
            </Button>
        </>
    );
}

export default Test;