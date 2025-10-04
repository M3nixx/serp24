import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericTable from "./GenericTable"

const CustomersTable = () => {
    //const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {field: "id", type: "number", headerName: "ID", width: 70},
        {field: "name", headerName: "Name", width: 200},
        {field: "city", headerName: "City", width: 250},
    ];

    useEffect(() => {
        //todo: ggf. api calls über axios?
        // axios.get("https://api.example/")
        //   .then(res => setRows(res.data))
        //   .finally(() => setLoading(false));

        setLoading(false);
    }, []);

    const rows = [
        {id: 1, name: "Siemens", city: "Braunschweig"},
        {id: 2, name: "VW", city: "Wolfsburg"}
    ];

    return <GenericTable rows={rows} columns={columns} loading={loading}/>;
};

export default CustomersTable;