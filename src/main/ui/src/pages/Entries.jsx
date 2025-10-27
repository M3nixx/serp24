import React from 'react';
import EntriesTable from "../components/tables/EntiresTable";
import {Typography} from "@mui/material";

const Entries = () => {
    return (
        <div>
            <Typography variant="h2">Entries</Typography>
            <EntriesTable/>
        </div>
    );
};

export default Entries;