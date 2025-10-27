import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import axios from 'axios';

const ProjectDialog = ({ open, onClose, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState(null);
    const [staff, setStaff] = useState([]);

    const [customers, setCustomers] = useState([]);
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        setName(initialData?.name || "");
        setStart(initialData?.start ? initialData.start.toISOString().split("T")[0] : "");
        setEnd(initialData?.end ? initialData.end.toISOString().split("T")[0] : "");
        setStatus(initialData?.status || "");
        setCustomer(initialData?.customer && initialData.customer.length > 0 ? initialData.customer[0] : null);
        setStaff(initialData?.staff || []);
    }, [initialData, open]);

    // Fetch customers and consultants for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const custResponse = await axios.get("http://localhost:8080/api/v1/customers?shallow=true");
                console.log("Customers loaded:", custResponse.data);
                setCustomers(custResponse.data);

                const consResponse = await axios.get("http://localhost:8080/api/v1/consultants?shallow=true");
                console.log("Consultants loaded:", consResponse.data);
                setConsultants(consResponse.data);
            } catch (e) {
                console.error("Error loading customers or consultants", e);
            }
        };
        if (open) {
            fetchData();
        }
    }, [open]);

    const handleSave = () => {
        const project = {
            id: initialData?.id,
            name,
            start: start ? new Date(start) : null,
            end: end ? new Date(end) : null,
            status,
            customer: customer ? [{ customerId: customer.customerId || customer.id, name: customer.name }] : [],
            staff: staff.map(s => ({
                consultantId: s.consultantId || s.id,
                name: s.name
            }))
        };
        onSave(project);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? "Edit Project" : "Add New Project"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 1 }}>
                <TextField
                    margin="dense"
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Start"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="End"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Status"
                    fullWidth
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Customer</InputLabel>
                    <Select
                        value={customer ? (customer.id || customer.customerId) : ""}
                        label="Customer"
                        onChange={(e) => {
                            const selected = customers.find(c => (c.id || c.customerId) === e.target.value);
                            setCustomer(selected);
                        }}
                    >
                        {customers.map(c => (
                            <MenuItem key={c.id || c.customerId} value={c.id || c.customerId}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Consultants</InputLabel>
                    <Select
                        multiple
                        value={staff.map(s => s.consultantId || s.id)}
                        onChange={(e) => {
                            const selectedConsultants = consultants.filter(c =>
                                e.target.value.includes(c.id || c.consultantId)
                            );
                            console.log("Selected consultants:", selectedConsultants);
                            setStaff(selectedConsultants);
                        }}
                        input={<OutlinedInput label="Consultants" />}
                        renderValue={(selected) => {
                            return selected.map(id => {
                                const c = consultants.find(c => (c.id || c.consultantId) === id);
                                return c ? c.name : "";
                            }).join(", ");
                        }}
                    >
                        {consultants.map(c => (
                            <MenuItem key={c.id || c.consultantId} value={c.id || c.consultantId}>
                                <Checkbox checked={staff.some(s => (s.consultantId || s.id) === (c.id || c.consultantId))} />
                                <ListItemText primary={c.name} />
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

export default ProjectDialog;