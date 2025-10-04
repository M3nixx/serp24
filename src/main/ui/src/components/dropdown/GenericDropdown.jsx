import React from "react";
import {Autocomplete, TextField} from "@mui/material";

const GenericDropdown = ({label, options, selectedValues, onChange}) => {
    return (
        <Autocomplete
            renderInput={(params) => <TextField {...params} label={label} variant="outlined"/>}
            options={options}
            value={selectedValues}
            onChange={(event, newValue) => onChange(newValue)}
            style={{minWidth: 200}}
        />
    );
};

export default GenericDropdown;