
import { useState, useEffect, use } from 'react';
import {
    TextField, Button,
    Dialog, DialogTitle,
    DialogContent, DialogActions,

    InputAdornment, IconButton, Table, TableHead,
    TableBody, TableCell, TableRow 
} from '@mui/material';

import AddEquipment from './AddEquipment';

export function Popup({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <Dialog open={open} onClose={handleClose}>

        {/* <AddEquipment close={handleClose}/> */}
    </Dialog>
    );
}

export default function AddEquipmentPopup({ open, setOpen }) {
    const [secondaryOpen, setSecondaryOpen] = useState(false);
    const [secondaryMessage, setSecondaryMessage] = useState('');
    const [secondaryTitle, setSecondaryTitle] = useState('');
    const [dialogError, setDialogError] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function displayMessage(title, message, isError = true) {
        setSecondaryMessage(message);
        setSecondaryTitle(title);
        if (isError) { setDialogError(true); }
        else { setDialogError(false); }

        setSecondaryOpen(true);
    }

    function displaySuccessMessage(title, message) {
        displayMessage(title, message, false);
    }

    function displayErrorMessage(title, message) {
        displayMessage(title, message, true);
    }

    return (
      <>
      <Dialog open={open} onClose={() => setOpen(false)}>
          <AddEquipment
            close={handleClose}
            displaySuccessMessage={displaySuccessMessage}
            displayErrorMessage={displayErrorMessage}
            displayMessage={displayMessage}/>
      </Dialog>

      <Dialog
          open={secondaryOpen}
          onClose={() => setSecondaryOpen(false)}
          >
          <DialogTitle align="center">{secondaryTitle}</DialogTitle>
          <DialogContent align="center">
            <p>{secondaryMessage}</p>
              <Button
                onClick={() => {
                    setSecondaryOpen(false);
                    if (!dialogError) {
                      handleClose();
                    }
                  }
                }>
                {dialogError ? "Back" : "Okay"}
              </Button>
          </DialogContent>
      </Dialog>
      </>
    );
}