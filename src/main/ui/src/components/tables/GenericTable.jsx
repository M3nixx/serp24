import React from "react";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import {Button} from "@mui/material";
import GenericButton from "../button/GenericButton";

const GenericTable = ({rows, columns, loading = false, pageSize = 10, OptDropdown}) => {
    const baseHeight = 120;
    const rowHeight = 52;
    const totalHeight = rows.length * rowHeight + baseHeight;

    const columnsWithActions = [
        ...columns,
        {
            field: "edit",
            type: "actions",
            headerName: "edit",
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Bearbeiten"
                    onClick={() => {
                        console.log("Platzhalter Edit:", params.row);
                    }}
                    showInMenu={false}
                />,
            ],
        },
    ];

    return (
        <div style={{width: "100%", margin: "20px 0", height: totalHeight}}>
            <DataGrid
                rows={rows}
                columns={columnsWithActions}
                pageSize={pageSize}
                loading={loading}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 20, 30, 50]}
                initialState={{
                    pagination: {paginationModel: {pageSize}},
                }}
            />
            <div style={{marginLeft: "auto", display: "flex", gap: 8, alignItems: "center"}}>
                <GenericButton
                    label="New"
                    color="primary"
                    onClick={() => console.log("Platzhalter New")}
                />
                <GenericButton
                    label="Delete"
                    color="secondary"
                    onClick={() => console.log("Platzhalter Delete")}
                />
                {OptDropdown && OptDropdown}
            </div>
        </div>

    );
};

export default GenericTable