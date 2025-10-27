import React from 'react';
import ConsultantsTable from "../components/tables/ConsultantsTable";
import {Typography} from "@mui/material";

const ConsultantsPage = () => {
    return (
        <div>
            <Typography variant="h2">Consultants</Typography>
            <ConsultantsTable/>
        </div>
    );
};

export default ConsultantsPage;