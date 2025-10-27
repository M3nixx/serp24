import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem, FormControl
} from "@mui/material";

const UserMappingDialog = ({ open, onClose, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [consultantID, setConsultantID] = useState("");
    const [externalID, setExternalID] = useState("");


    useEffect(() => {
        setName(initialData?.name || "");
        setConsultantID(initialData?.consultantID || "");
        setExternalID(initialData?.externalID || "");
    }, [initialData, open]);

    const handleSave = () => {
        const user = {
            id: initialData?.id,
            name,
            consultantID,
            externalID,
        };
        onSave(user);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? "Edit User" : "Add New User"}</DialogTitle>
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
                    label="Consultant ID"
                    fullWidth
                    value={consultantID}
                    onChange={(e) => setConsultantID(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="External ID"
                    fullWidth
                    value={externalID}
                    onChange={(e) => setExternalID(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserMappingDialog;
