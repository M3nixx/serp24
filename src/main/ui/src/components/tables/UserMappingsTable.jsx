import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericTable from "./GenericTable";
import UserMappingDialog from "../dialogs/UserMappingDialog";

const UserMappingsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/api/v1/users");
                const normalized = res.data.map(u => ({
                    id: u.id,
                    name: u.name,
                    consultantID: u.consultantID,
                    externalID: u.externalID,
                }));
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching users", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSaveUser = async (user) => {
        try {
            let response;
            if (user.id) {
                // update
                response = await axios.put(
                    `http://localhost:8080/api/v1/users/${user.id}`,
                    {
                        name: user.name,
                        consultantID: user.consultantID,
                        externalID: user.externalID,
                    }
                );
            } else {
                // create
                response = await axios.post(
                    "http://localhost:8080/api/v1/users",
                    {
                        name: user.name,
                        consultantID: user.consultantID,
                        externalID: user.externalID,
                    }
                );
            }

            const normalized = {
                id: response.data.id,
                name: response.data.name,
                consultantID: response.data.consultantID,
                externalID: response.data.externalID,
            };

            setRows(prev => {
                const exists = prev.find(r => r.id === normalized.id);
                if (exists) {
                    return prev.map(r => (r.id === normalized.id ? normalized : r));
                } else {
                    return [...prev, normalized];
                }
            });
        } catch (error) {
            console.error("Error saving user", error);
        } finally {
            setOpenDialog(false);
            setEditUser(null);
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setOpenDialog(true);
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <>
            <GenericTable
                rows={rows}
                columns={[
                    { field: "id", headerName: "ID", width: 70 },
                    { field: "name", headerName: "Name", width: 200 },
                    { field: "consultantID", headerName: "Consultant ID", width: 150 },
                    { field: "externalID", headerName: "External ID", width: 400 },
                ]}
                loading={loading}
                onAddNew={() => { setEditUser(null); setOpenDialog(true); }}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                entityName="User Mapping"
            />

            <UserMappingDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveUser}
                initialData={editUser}
            />
        </>
    );
};

export default UserMappingsTable;
