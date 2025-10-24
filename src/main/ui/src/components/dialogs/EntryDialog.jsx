import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const EntryDialog = ({ open, onClose, onSave, initialData }) => {
    const [date, setDate] = useState("");
    const [hours, setHours] = useState(0);
    const [project, setProject] = useState(null);
    const [consultant, setConsultant] = useState(null);

    const [projects, setProjects] = useState([]);
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        setDate(initialData?.date ? initialData.date.toISOString().split("T")[0] : "");
        setHours(initialData?.hours || 0);
        setProject(initialData?.project && initialData.project.length > 0 ? initialData.project[0] : null);
        setConsultant(initialData?.consultant && initialData.consultant.length > 0 ? initialData.consultant[0] : null);
    }, [initialData, open]);

    // Fetch projects and consultants for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const projResponse = await axios.get("http://localhost:8080/api/v1/projects?shallow=true");
                console.log("Projects loaded:", projResponse.data);
                setProjects(projResponse.data);

                const consResponse = await axios.get("http://localhost:8080/api/v1/consultants?shallow=true");
                console.log("Consultants loaded:", consResponse.data);
                setConsultants(consResponse.data);
            } catch (e) {
                console.error("Error loading projects or consultants", e);
            }
        };
        if (open) {
            fetchData();
        }
    }, [open]);

    const handleSave = () => {
        const entry = {
            id: initialData?.id,
            date: date ? new Date(date) : null,
            hours: Number(hours),
            project: project ? [{ id: project.id || project.projectId, name: project.name }] : [],
            consultant: consultant ? [{ id: consultant.id || consultant.consultantId, name: consultant.name }] : []
        };
        onSave(entry);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData?.id ? "Edit Entry" : "Add New Entry"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 1 }}>
                <TextField
                    margin="dense"
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Hours"
                    type="number"
                    fullWidth
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Project</InputLabel>
                    <Select
                        value={project ? (project.id || project.projectId) : ""}
                        label="Project"
                        onChange={(e) => {
                            const selected = projects.find(p => (p.id || p.projectId) === e.target.value);
                            setProject(selected);
                        }}
                    >
                        {projects.map(p => (
                            <MenuItem key={p.id || p.projectId} value={p.id || p.projectId}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Consultant</InputLabel>
                    <Select
                        value={consultant ? (consultant.id || consultant.consultantId) : ""}
                        label="Consultant"
                        onChange={(e) => {
                            const selected = consultants.find(c => (c.id || c.consultantId) === e.target.value);
                            setConsultant(selected);
                        }}
                    >
                        {consultants.map(c => (
                            <MenuItem key={c.id || c.consultantId} value={c.id || c.consultantId}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EntryDialog;