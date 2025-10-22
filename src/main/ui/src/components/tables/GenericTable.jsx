import React, {useState} from "react";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import GenericButton from "../button/GenericButton";
import GenericDeleteDialog from "../dialogs/GenericDeleteDialog";

const GenericTable = ({rows, columns, loading = false, pageSize = 10, OptDropdown, onAddNew, onEdit, onDelete, entityName}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => onEdit && onEdit(params.row)}
                    showInMenu={false}
                />,
            ],
        },
    ];

    return (
        <div style={{width: "100%", margin: "20px 0", height: totalHeight}}>
            <DataGrid
                autoHeight
                autoPageSize={false}
                disableColumnMenu
                rows={rows}
                columns={columnsWithActions}
                getRowId={(row) => row.id}
                pageSize={pageSize}
                loading={loading}
                getRowHeight={() => 'auto'}
                sx={{
                    '& .MuiDataGrid-cell': {
                        alignItems: 'start',
                        paddingTop: 1,
                        paddingBottom: 1,
                    }}}
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
                    onClick={onAddNew}
                />
                <GenericButton
                    label="Delete"
                    color="secondary"
                    onClick={() => setOpenDeleteDialog(true)}
                />
                {OptDropdown && OptDropdown}
            </div>

            {/* Generic Delete Dialog */}
            {onDelete && (
                <GenericDeleteDialog
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    onDelete={onDelete}
                    entityName={entityName || "Item"}
                />
            )}
        </div>

    );
};

export default GenericTable