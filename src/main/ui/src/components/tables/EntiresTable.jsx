import React, { useState, useEffect } from "react";
import GenericTable from "./GenericTable";
import GenericDropdown from "../dropdown/GenericDropdown";
import InnerTable from "./InnerTable";
import { Button } from "@mui/material";

const EntriesTable = () => {
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState([]);
    const [selectedConsultant, setSelectedConsultant] = useState([]);

    const projects = [
        { id: 1, name: "P1" },
        { id: 2, name: "P2" },
    ];

    const consultants = [
        { id: 1, name: "con1" },
        { id: 2, name: "con2" },
    ];

    const entries = [
        {
            id: 1,
            date: new Date("2025-02-20T13:12:13"),
            hours: 4,
            projectId: 1,
            consultantId: 1,
        },
        {
            id: 2,
            date: new Date("2025-02-20T12:13:12"),
            hours: 3,
            projectId: 2,
            consultantId: 2,
        },
    ];

    const rows = entries.map((e) => ({
        ...e,
        project: projects.filter((p) => p.id === e.projectId),
        consultant: consultants.filter((c) => c.id === e.consultantId),
    }));

    const columns = [
        { field: "id", headerName: "ID", type: "number", width: 70 },
        { field: "date", headerName: "Date", type: "dateTime", width: 250 },
        { field: "hours", headerName: "Hours", type: "number", width: 100 },
        {
            field: "project",
            headerName: "Project",
            type: "object",
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
        {
            field: "consultant",
            headerName: "Consultant",
            type: "object",
            width: 300,
            renderCell: (params) => <InnerTable data={params.value} />,
        },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    return (
        <div>
            <GenericTable
                rows={rows}
                columns={columns}
                loading={loading}
                OptDropdown={
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Button variant="contained" color="primary">
                            New
                        </Button>
                        <GenericDropdown
                            label="Select a Project"
                            options={projects.map((p) => p.name)}
                            selectedValues={selectedProject}
                            onChange={setSelectedProject}
                        />
                        <GenericDropdown
                            label="Select a Consultant"
                            options={consultants.map((c) => c.name)}
                            selectedValues={selectedConsultant}
                            onChange={setSelectedConsultant}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default EntriesTable;