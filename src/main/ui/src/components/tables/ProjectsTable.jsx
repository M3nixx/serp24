import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericTable from "./GenericTable";
import GenericDropdown from "../dropdown/GenericDropdown";
import InnerTable from "./InnerTable";
import ProjectDialog from "../dialogs/ProjectDialog";

const ProjectsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedConsultants, setSelectedConsultants] = useState([]);

    useEffect(() => {
            fetchProjects();
            fetchCustomers();
            fetchConsultants();
    }, []);


    const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/api/v1/projects");
                const normalized = res.data.map((p) => ({
                    id: p.id,
                    name: p.name,
                    start: new Date(p.start),
                    end: new Date(p.end),
                    status: p.status,
                    customer: Array.isArray(p.customer) ? p.customer : [p.customer],
                    staff: Array.isArray(p.projectStaff) ? p.projectStaff : [p.projectStaff],
                }));
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching projects", e);
            } finally {
                setLoading(false);
            }
    };


    const fetchCustomers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/customers");
                setCustomers(res.data.map((c) => ({ id: c.id, name: c.name })));
            } catch (e) {
                console.error("Error fetching customers", e);
            }
        };

  
    const fetchConsultants = async () => {
    try {
        // Wichtig: Query-Param shallow=true hinzufügen
        const res = await axios.get("http://localhost:8080/api/v1/consultants?shallow=true");
        setConsultants(
        res.data.map((c) => ({
            id: c.id,
            name: c.name,
        }))
        );
    } catch (e) {
        console.error("Error fetching consultants", e.response?.data || e.message);
    }
    };


    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/projects/${id}`);
            setRows((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error("Error deleting project", error);
        }
    };

     const handleEditProject = (project) => {
        setEditProject(project);
        setOpenDialog(true);
    };

const handleSaveProject = async (project) => {
    try {
        // Build payload according to OpenAPI
        const payload = {
            name: project.name,
            start: new Date(project.start).toISOString(),
            end: new Date(project.end).toISOString(),
            status: project.status,
            customer: customers.find(c => c.customerId === project.customerId) || null,
            projectStaff: consultants
                .filter(c => project.staffIds.includes(c.consultantId))
                .map(c => ({ consultantId: c.consultantId, name: c.name })),
        };

        let response;
        if (project.id) {
            response = await axios.put(`http://localhost:8080/api/v1/projects/${project.id}`, payload);
        } else {
            response = await axios.post(`http://localhost:8080/api/v1/projects`, payload);
        }

        // Normalize response
        const normalized = {
            id: response.data.id,
            name: response.data.name,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
            status: response.data.status,
            customer: response.data.customer,
            staff: response.data.projectStaff || [],
        };

        setRows(prev => {
            const exists = prev.find(r => r.id === normalized.id);
            if (exists) {
                return prev.map(r => r.id === normalized.id ? normalized : r);
            } else {
                return [...prev, normalized];
            }
        });

    } catch (error) {
        console.error("Error saving project", error);
    } finally {
        setOpenDialog(false);
        setEditProject(null);
    }
};


    const columns = [
        { field: "id", type: "number", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "start", type: "date", headerName: "Start", width: 200 },
        { field: "end", type: "date", headerName: "End", width: 200 },
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
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
    ];

    const customerOptions = customers.map((c) => `${c.id} - ${c.name}`);
    const consultantOptions = consultants.map((c) => `${c.id} - ${c.name}`);

    return (
        <div>
            <GenericTable
                rows={rows}
                columns={columns}
                loading={loading}
                onAddNew={() => { setEditProject(null); setOpenDialog(true); }}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}

                
                // OptDropdown={
                //     <>
                //         <GenericDropdown
                //             label="Consultants"
                //             options={consultantOptions}
                //             selectedValues={selectedConsultants}
                //             onChange={setSelectedConsultants}
                //         />
                //         <GenericDropdown
                //             label="Customers"
                //             options={customerOptions}
                //             selectedValues={selectedCustomers}
                //             onChange={setSelectedCustomers}
                //         />
                //     </>
                // }
            />
            <ProjectDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveProject}
                initialData={editProject}
                customers={customers || []}
                consultants={consultants || []}
            />
        </div>
    );
};

export default ProjectsTable;
