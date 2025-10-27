import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const CustomerDialog = ({ open, onClose, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        setName(initialData?.name || "");
        setCity(initialData?.city || "");
    }, [initialData, open]);

    const handleSave = () => {
        const customer = {
            id: initialData?.id, // undefined if adding new
            name,
            city
        };
        onSave(customer);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? "Edit Customer" : "Add New Customer"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="City"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDialog;