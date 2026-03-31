import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button }
from "@mui/material";

export default function DisplayMessage({open, setOpen, message}) {
    function handleClose() {
        setOpen(false);
    };

    return (
        <>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Hello</DialogTitle>

    <DialogContent>
        <DialogContentText>
            {message}
        </DialogContentText>
    </DialogContent>

    <DialogActions>
        <Button onClick={handleClose} autoFocus>
            Okay
        </Button>
    </DialogActions>
    </Dialog>
        </>
    );
}