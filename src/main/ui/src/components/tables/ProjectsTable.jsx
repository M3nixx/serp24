import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericTable from "./GenericTable"

import {randomCreatedDate} from '@mui/x-data-grid-generator'
import GenericDropdown from "../dropdown/GenericDropdown";

const ProjectsTable = () => {
    //const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedConsultants, setSelectedConsultants] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    //todo: vorerst platzhalter
    const customers = ["C1", "C2", "C3"]
    const consultants = ["con1", "con2", "con3"]

    const columns = [
        {field: "id", type: "number", headerName: "ID", width: 70},
        {field: "name", headerName: "Name", width: 200},
        {field: "start", type: "date", headerName: "Start", width: 250},
        {field: "end", type: "date", headerName: "End", width: 250},
        {field: "status", headerName: "Status", width: 250},
        {field: "customer", headerName: "Customer", width: 250},
        {field: "staff", headerName: "Project Staff", width: 250},
    ];

    useEffect(() => {
        // axios.get("https://api.example/")
        //   .then(res => setRows(res.data))
        //   .finally(() => setLoading(false));

        setLoading(false);
    }, []);

    const rows = [
        {
            id: 1,
            name: "Auftrag 1",
            start: new Date("2025-01-20"),
            end: new Date("2025-01-20"),
            status: "running",
            customer: "?-table",
            staff: "?-table"
        },
    ];

    return (
        <div>
            <GenericTable rows={rows} columns={columns} loading={loading} OptDropdown={
                <>
                    <GenericDropdown
                        label="Consultants"
                        options={consultants}
                        selectedValues={selectedConsultants}
                        onChange={setSelectedConsultants}
                    />
                    <GenericDropdown
                        label="Customers"
                        options={customers}
                        selectedValues={selectedCustomers}
                        onChange={setSelectedCustomers}
                    />
                </>
            }/>

            {/*<div style={{ display: "flex", gap: 8, marginTop: 48 }}>*/}
            {/*    <GenericDropdown*/}
            {/*        label="Consultants"*/}
            {/*        options={consultants}*/}
            {/*        selectedValues={selectedConsultants}*/}
            {/*        onChange={setSelectedConsultants}*/}
            {/*    />*/}
            {/*    <GenericDropdown*/}
            {/*        label="Customers"*/}
            {/*        options={customers}*/}
            {/*        selectedValues={selectedCustomers}*/}
            {/*        onChange={setSelectedCustomers}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};

export default ProjectsTable;