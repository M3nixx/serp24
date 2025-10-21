import React, { useState, useEffect } from "react";
import GenericTable from "./GenericTable";

const userMappingsData = [
    { id: 1, externalId: "1@test.com", consultantId: 1 },
    { id: 2, externalId: "2@test.com", consultantId: 2 },
    { id: 3, externalId: "3@test.com", consultantId: 3 },
];

const UserMappingsTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRows(userMappingsData);
        setLoading(false);
    }, []);

    const columns = [
        { field: "id", type: "number", headerName: "ID", width: 70 },
        { field: "externalId", type: "string", headerName: "External ID", width: 250 },
        { field: "consultantId", type: "number", headerName: "Consultant ID", width: 150 },
    ];

    return <GenericTable rows={rows} columns={columns} loading={loading} />;
};

export default UserMappingsTable;