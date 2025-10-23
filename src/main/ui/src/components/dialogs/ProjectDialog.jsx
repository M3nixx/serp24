import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
} from "@mui/material";

const ProjectDialog = ({ open, onClose, onSave, initialData, customers, consultants }) => {
    const [form, setForm] = useState({
        id: null,
        name: "",
        start: "",
        end: "",
        status: "",
        customerId: "",
        staffIds: [],
    });

useEffect(() => {
    if (initialData) {
        setForm({
            id: initialData.id,
            name: initialData.name,
            start: initialData.start ? new Date(initialData.start).toISOString().substring(0, 10) : "",
            end: initialData.end ? new Date(initialData.end).toISOString().substring(0, 10) : "",
            status: initialData.status || "",
            customerId: initialData.customer?.customerId || "",
            staffIds: initialData.projectStaff?.map((s) => s.consultantId) || [],
        });
    } else {
        setForm({
            id: null,
            name: "",
            start: "",
            end: "",
            status: "",
            customerId: "",
            staffIds: [],
        });
    }
}, [initialData]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleStaffChange = (e) => {
        setForm((prev) => ({ ...prev, staffIds: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{form.id ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    name="name"
                    label="Project Name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    name="start"
                    label="Start Date"
                    type="date"
                    value={form.start}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="end"
                    label="End Date"
                    type="date"
                    value={form.end}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="status"
                    label="Status"
                    value={form.status}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                    name="customerId"
                    value={form.customerId ?? ""}
                    onChange={handleChange}
                    label="Customer"
                    renderValue={(selected) => {
                    const customer = customers.find((c) => c.customerId === selected);
                    return customer ? customer.name : "";
                    }}
                >
                    {customers.map((c) => (
                    <MenuItem key={c.customerId} value={c.customerId}>
                        {c.name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Consultants</InputLabel>
                    <Select
                        multiple
                        value={form.staffIds}
                        onChange={handleStaffChange}
                        renderValue={(selected) =>
                            consultants
                                .filter((c) => selected.includes(c.id))
                                .map((c) => c.name)
                                .join(", ")
                        }
                    >
                        {consultants.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                <Checkbox checked={form.staffIds.includes(c.id)} />
                                <ListItemText primary={c.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDialog;
