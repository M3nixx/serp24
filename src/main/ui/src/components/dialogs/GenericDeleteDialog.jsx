import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

const GenericDeleteDialog = ({ open, onClose, entityName = "Item", onDelete }) => {
    const [id, setId] = useState("");

    const handleDelete = () => {
        if (!id) return;
        onDelete(Number(id)); // call the callback passed from parent
        setId(""); // clear input
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete {entityName}</DialogTitle>
            <DialogContent>
                <TextField
                    label={`${entityName} ID`}
                    type="number"
                    fullWidth
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GenericDeleteDialog;
