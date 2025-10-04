import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericTable from "./GenericTable"
import {GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

const ConsultantsTable = () => {
    //const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {field: "id", type: "number", headerName: "ID", width: 70},
        {field: "name", headerName: "Name", width: 200},
        {field: "projects", headerName: "Projects", width: 250},

        //todo: edit einbindung pro table // kann raus wenn generic funktioniert
        // { field: "edit", type: "actions",headerName: "edit", width: 100,
        // getActions: (params) => [
        //     <GridActionsCellItem
        //         icon={<EditIcon />}
        //         label="Bearbeiten"
        //         onClick={() => {
        //             console.log("Platzhalter für Edit:", params.row);
        //         }}
        //         showInMenu={false}
        //     />,
        // ],
        // },
    ];

    useEffect(() => {
        // axios.get("https://api.example/")
        //   .then(res => setRows(res.data))
        //   .finally(() => setLoading(false));

        setLoading(false);
    }, []);

    const rows = [
        {id: 1, name: "Gustav", projects: "?-table"},
        {id: 2, name: "Mrk", projects: "?-table"}
    ];

    return <GenericTable rows={rows} columns={columns} loading={loading}/>;
};

export default ConsultantsTable;