import React from 'react';
import UserMappingsTable from "../components/tables/UserMappingsTable";
import {Typography} from "@mui/material";

const UserMapping = () => {
    return (
        <div>
            <Typography variant="h2">User Mapping</Typography>
            <UserMappingsTable/>
        </div>
    );
};

export default UserMapping;