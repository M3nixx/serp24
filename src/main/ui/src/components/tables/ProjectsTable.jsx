import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import GenericTable from "./GenericTable";
import ProjectDialog from "../dialogs/ProjectDialog";
import InnerTable from "./InnerTable";

const ProjectsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editProject, setEditProject] = useState(null);

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get("/projects?shallow=false");
                console.log("GET Projects Response:", res.data);

                // Normalize backend response to table rows
                const normalized = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    start: p.start ? new Date(p.start) : null,
                    end: p.end ? new Date(p.end) : null,
                    status: p.status,
                    customer: p.customer ? [p.customer] : [],
                    staff: p.projectStaff || [],
                }));
                console.log("Normalized projects:", normalized);
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching projects", e);
                console.error("Error details:", e.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Unified save handler for both add (POST) and update (PUT)
    const handleSaveProject = async (project) => {
        try {
            console.log("=== BACKEND SAVE START ===");
            console.log("Received project from dialog:", project);

            const payload = {
                name: project.name,
                start: project.start ? project.start.toISOString() : null,
                end: project.end ? project.end.toISOString() : null,
                status: project.status,
                customer: project.customer && project.customer.length > 0
                    ? { customerId: project.customer[0].customerId || project.customer[0].id }
                    : null,
                // projectStaff: project.staff ? project.staff.map(c => ({ consultantId: c.consultantId || c.id })) : []
                projectStaff: project.staff ?
                    project.staff.map(s => ({
                        consultantId: s.consultantId || s.id,
                        name: s.name
                    })) : []
            };

            console.log("Payload to send to backend:", payload);

            let response;
            if (project.id) {
                // Update existing project
                response = await apiClient.put(
                    `/projects/${project.id}`,
                    payload
                );
            } else {
                // Add new project
                response = await apiClient.post(
                    "/projects",
                    payload
                );
            }

            console.log("Backend response:", response.data);

            const normalized = {
                id: response.data.id,
                name: response.data.name,
                start: response.data.start ? new Date(response.data.start) : null,
                end: response.data.end ? new Date(response.data.end) : null,
                status: response.data.status,
                customer: response.data.customer ? [response.data.customer] : [],
                staff: response.data.projectStaff || [],
            };

            console.log("Normalized project:", normalized);
            console.log("Customer in normalized:", normalized.customer);
            console.log("Staff in normalized:", normalized.staff);

            setRows(prev => {
                const exists = prev.find(r => r.id === normalized.id);
                if (exists) {
                    return prev.map(r => r.id === normalized.id ? normalized : r);
                } else {
                    return [...prev, normalized];
                }
            });
            setOpenDialog(false);
            setEditProject(null);
        } catch (error) {
            console.error("Error saving project", error);
            console.error("Error response:", error.response?.data);
        }
    };

    const handleEditProject = (project) => {
        setEditProject(project);
        setOpenDialog(true);
    };

    const handleDeleteProject = async (id) => {
        try {
            await apiClient.delete(`/projects/${id}`);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting project", error);
        }
    };

    const handleAddNew = () => {
        setEditProject({
            name: "",
            start: null,
            end: null,
            status: "",
            customer: [],
            staff: []
        });
        setOpenDialog(true);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "start", headerName: "Start", width: 150, type: "date" },
        { field: "end", headerName: "End", width: 150, type: "date" },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "customer",
            headerName: "Customer",
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
        {
            field: "staff",
            headerName: "Project Staff",
            width: 400,
            renderCell: (params) => <InnerTable data={params.value} />,
        }
    ];

    return (
        <div>
            <GenericTable
                rows={rows}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                onAddNew={handleAddNew}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                entityName="Project"
            />

            <ProjectDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveProject}
                initialData={editProject}
            />
        </div>
    );
};

export default ProjectsTable;