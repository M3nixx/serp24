import React from "react";
import {Autocomplete, TextField} from "@mui/material";

const GenericDropdown = ({label, options, selectedValues, onChange}) => {
    return (
        <Autocomplete
            renderInput={(params) => <TextField {...params} label={label} variant="outlined"/>}
            options={options || []}  // Fallback empty Array
            value={selectedValues}
            onChange={(event, newValue) => onChange(newValue)}
            getOptionLabel={(option) => {
                // Handle different types options
                if (typeof option === 'string') return option;
                if (option && option.name) return option.name;
                return String(option || '');
            }}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === 'string' && typeof value === 'string') {
                    return option === value;
                }
                return option?.id === value?.id || option?.name === value?.name;
            }}
            style={{minWidth: 200}}
        />
    );
};

export default GenericDropdown;