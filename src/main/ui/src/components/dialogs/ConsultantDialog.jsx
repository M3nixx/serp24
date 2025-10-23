import React, {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ConsultantDialog = ({ open, onClose, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [projects, setProjects] = useState("");

    useEffect(() => {
        setName(initialData?.name || "");
        setProjects(initialData?.projects || "");
    }, [initialData, open]);

    const handleSave = () => {
        if (!name || name.trim() === "") {
            console.error("Name is required");
            return;
        }

        const consultant = {
            id: initialData?.id,
            name: name.trim(),
        };
        console.log("Saving consultant:", consultant);
        onSave(consultant);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? "Edit Consultant" : "Add New Consultant"}</DialogTitle>
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
                    label="Projects"
                    fullWidth
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConsultantDialog;