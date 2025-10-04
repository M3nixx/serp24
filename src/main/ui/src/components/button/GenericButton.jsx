import React from "react";
import {Button, useTheme} from "@mui/material";

const GenericButton = ({label, onClick, disabled = false, color = "primary"}) => {
    const theme = useTheme();
    return (
        <Button variant="contained" color={color} onClick={onClick} disabled={disabled}>
            {label}
        </Button>
    );
};

export default GenericButton