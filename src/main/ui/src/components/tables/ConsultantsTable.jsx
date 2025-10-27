import React, {useState, useEffect} from 'react';
import apiClient from '../api/apiClient';
import GenericTable from "./GenericTable"
import ConsultantDialog from "../dialogs/ConsultantDialog";
import InnerTable from "./InnerTable";


const ConsultantsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editConsultant, setEditConsultant] = useState(null);

    // Fetch consultants from backend
    useEffect(() => {
        const fetchConsultants = async () => {
            setLoading(true);
            try {
                // add shallow parameter
                const res = await apiClient.get("/consultants?shallow=false");
                console.log("GET Response from backend:", res.data);

                const normalized = res.data.map(c => ({
                    id: c.id,
                    name: c.name,
                    projects: c.bookedProjects || []
                }));
                console.log("Normalized consultants:", normalized);
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching consultants", e);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultants();
    }, []);

    // Unified save handler for both add (POST) and update (PUT)
    const handleSaveConsultant = async (consultant) => {
        try {
            const payload = { name: consultant.name };
            console.log("Sending payload:", payload);

            let response;
            if (consultant.id && consultant.id > 0) {
                // Update existing consultant
                response = await apiClient.put(
                    `/consultants/${consultant.id}`,
                    payload
                );
            } else {
                // Add new consultant
                response = await apiClient.post(
                    "/consultants",
                    payload
                );
            }

            console.log("POST/PUT Response:", response.data);

            const normalized = {
                id: response.data.id,
                name: response.data.name,
                projects: response.data.bookedProjects || []
            };

            console.log("Normalized new consultant:", normalized);

            setRows(prev => {
                const exists = prev.find(r => r.id === normalized.id);
                if (exists) {
                    // Update row
                    return prev.map(r => r.id === normalized.id ? normalized : r);
                } else {
                    // Add new row
                    return [...prev, normalized];
                }
            });
        } catch (error) {
            console.error("Error saving consultant", error);
            console.error("Error response:", error.response?.data);
        } finally {
            setOpenDialog(false);
            setEditConsultant(null);
        }
    };

    const handleEditConsultant = (consultant) => {
        setEditConsultant(consultant);
        setOpenDialog(true);
    };

    const handleDeleteConsultant = async (id) => {
        try {
            await apiClient.delete(`/consultants/${id}`);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting consultant", error);
        }
    };

    return (
        <>
            <GenericTable
                rows={rows}
                columns={[
                    { field: "id", headerName: "ID", width: 70 },
                    { field: "name", headerName: "Name", width: 200 },
                    {
                        field: "projects",
                        headerName: "Projects",
                        width: 400,
                        renderCell: (params) => <InnerTable data={params.value} />  // NEU: renderCell
                    }
                ]}
                loading={loading}
                onAddNew={() => { setEditConsultant(null); setOpenDialog(true); }}
                onEdit={handleEditConsultant}
                onDelete={handleDeleteConsultant}
                entityName="Consultant"
            />

            <ConsultantDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveConsultant}
                initialData={editConsultant}
            />
        </>
    );
};

export default ConsultantsTable
