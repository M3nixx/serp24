import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericTable from "./GenericTable";
import GenericDropdown from "../dropdown/GenericDropdown";
import InnerTable from "./InnerTable";
import EntryDialog from "../dialogs/EntryDialog";

const EntriesTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editEntry, setEditEntry] = useState(null);
    const [selectedProject, setSelectedProject] = useState([]);
    const [selectedConsultant, setSelectedConsultant] = useState([]);


    // Fetch entries from backend
    useEffect(() => {
        const fetchEntries = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/api/v1/time/entries");
                console.log("GET Entries Response:", res.data);

                // dummies data
                // const dummyData = [
                //     {
                //         id: 1,
                //         date: "2025-02-20T13:12:13",
                //         hours: 4,
                //         project: { id: 1, name: "P1" },
                //         consultant: { id: 1, name: "con1" }
                //     },
                //     {
                //         id: 2,
                //         date: "2025-02-20T12:13:12",
                //         hours: 3,
                //         project: { id: 2, name: "P2" },
                //         consultant: { id: 2, name: "con2" }
                //     }
                // ];

                // Normalize backend response to table rows
                const normalized = res.data.map(e => ({
                    id: e.entryId,  // WICHTIG: entryId im DTO!
                    date: e.date ? new Date(e.date) : null,
                    hours: e.hours,
                    project: e.project ? [e.project] : [],
                    consultant: e.consultant ? [e.consultant] : [],
                }));
                console.log("Normalized entries:", normalized);
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching entries", e);
                console.error("Error details:", e.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    // Filtere Rows through Dropdown
    const getFilteredRows = () => {
        let filtered = rows;

        // by Project
        if (selectedProject && selectedProject.length > 0) {
            filtered = filtered.filter(row =>
                row.project && row.project.length > 0 &&
                row.project[0].name === selectedProject
            );
        }

        // by Consultant
        if (selectedConsultant && selectedConsultant.length > 0) {
            filtered = filtered.filter(row =>
                row.consultant && row.consultant.length > 0 &&
                row.consultant[0].name === selectedConsultant
            );
        }

        return filtered;
    };


    // Unified save handler for both add (POST) and update (PUT)
    const handleSaveEntry = async (entry) => {
        try {
            console.log("Saving entry:", entry);

            // Validation
            if (!entry.consultant || entry.consultant.length === 0) {
                alert("Please select a consultant!");
                return;
            }
            if (!entry.project || entry.project.length === 0) {
                alert("Please select a project!");
                return;
            }

            // Payload with IDs
            const payload = {
                date: entry.date ? entry.date.toISOString() : null,
                hours: Number(entry.hours),
                projectId: entry.project[0].projectId || entry.project[0].id,
                consultantId: entry.consultant[0].consultantId || entry.consultant[0].id,
            };

            console.log("Payload to send:", payload);

            // Consultant ID für URL
            const consultantId = entry.consultant[0].consultantId || entry.consultant[0].id;

            let response;
            if (entry.id) {
                // Update: PUT /time/entries/{consultantId}/{entryId}
                response = await axios.put(
                    `http://localhost:8080/api/v1/time/entries/${consultantId}/${entry.id}`,
                    payload
                );
            } else {
                // Create: POST /time/entries/{consultantId}
                response = await axios.post(
                    `http://localhost:8080/api/v1/time/entries/${consultantId}`,
                    payload
                );
            }

            console.log("Backend response:", response.data);

            const normalized = {
                id: response.data.entryId,
                date: response.data.date ? new Date(response.data.date) : null,
                hours: response.data.hours,
                project: response.data.project ? [response.data.project] : [],
                consultant: response.data.consultant ? [response.data.consultant] : [],
            };

            setRows(prev => {
                const exists = prev.find(r => r.id === normalized.id);
                if (exists) {
                    return prev.map(r => r.id === normalized.id ? normalized : r);
                } else {
                    return [...prev, normalized];
                }
            });
            setOpenDialog(false);
            setEditEntry(null);
        } catch (error) {
            console.error("Error saving entry", error);
            console.error("Error response:", error.response?.data);
            alert("Error saving entry: " + (error.response?.data?.message || error.message));
        }
    };

    const handleEditEntry = (entry) => {
        setEditEntry(entry);
        setOpenDialog(true);
    };

    const handleDeleteEntry = async (id) => {
        try {
            const entry = rows.find(r => r.id === id);
            if (!entry) {
                console.error("Entry not found");
                return;
            }

            const consultantId = entry.consultant[0].consultantId || entry.consultant[0].id;

            await axios.delete(`http://localhost:8080/api/v1/time/entries/${consultantId}/${id}`);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting entry", error);
            alert("Error deleting entry. The DELETE endpoint may not be implemented in the backend.");
        }
    };

    const handleAddNew = () => {
        setEditEntry({
            date: null,
            hours: 0,
            project: [],
            consultant: []
        });
        setOpenDialog(true);
    };

    const columns = [
        { field: "id", headerName: "ID", type: "number", width: 70 },
        { field: "date", headerName: "Date", type: "dateTime", width: 250 },
        { field: "hours", headerName: "Hours", type: "number", width: 100 },
        {
            field: "project",
            headerName: "Project",
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
        {
            field: "consultant",
            headerName: "Consultant",
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
    ];

    return (
        <div>
            <GenericTable
                rows={getFilteredRows()}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                onAddNew={handleAddNew}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
                entityName="Entry"
                OptDropdown={
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <GenericDropdown
                            label="Select a Project"
                            options={[...new Set(rows.map(r => r.project[0]?.name).filter(Boolean))]}
                            selectedValues={selectedProject}
                            onChange={setSelectedProject}
                        />
                        <GenericDropdown
                            label="Select a Consultant"
                            options={[...new Set(rows.map(r => r.consultant[0]?.name).filter(Boolean))]}
                            selectedValues={selectedConsultant}
                            onChange={setSelectedConsultant}
                        />
                    </div>
                }
            />

            <EntryDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveEntry}
                initialData={editEntry}
            />
        </div>
    );
};

export default EntriesTable;