import React from 'react';
import CustomersTable from '../components/tables/CustomersTable';
import {Typography} from "@mui/material";

const CustomersPage = () => {
    return (
        <div>
            <Typography variant="h2">Customers</Typography>
            <CustomersTable/>
        </div>
    );
};

export default CustomersPage;