import {createTheme} from "@mui/material/styles";

const themeTemplate = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'
        },
        secondary: {
            main: '#3e4fae'
        },
        error: {
            main: '#E53935'
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h2: {
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '22px 18px 18px',
        },
    },
    components: {
        // GenericButton
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    maxHeight: '42px',
                    padding: '6px 16px',
                    fontSize: '14px',
                },
            },
        },
        // GenericDropdown
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    minWidth: '210px',
                    '& .MuiOutlinedInput-root': {
                        maxHeight: '42px',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiInputLabel-root': {
                        top: '50%',
                        transform: 'translate(14px, -50%)',
                        '&.MuiInputLabel-shrink': {
                            top: '0',
                            transform: 'translate(14px, -50%) scale(0.75)',
                        },
                    },
                },
            },
        },
        // AppBarCustom
        MuiAppBar: {
            styleOverrides: {
                root: {
                    '& .MuiButton-root': {
                        fontSize: '15.5px',
                        '&.active': {
                            fontWeight: 'bold',
                        },
                    },
                },
            },
        },
        // InnerTable (mui stan table)
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 'bold',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    '&:last-child': {
                        borderRight: 'none',
                    },
                },
                body: {
                    fontSize: '14px',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                    '&:last-child': {
                        borderRight: 'none',
                    },
                },
            },
        },
        // InnerTable (mui stan table)
        MuiTable: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderCollapse: 'collapse',
                    marginLeft: 0,
                    marginRight: 0,
                },
            },
        },
        // GenericTable (mui Datagrid)
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: 4,
                    marginLeft: '16px',
                    marginRight: '16px',
                    width: 'fit-content',
                    maxWidth: 'calc(100vw - 32px)',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                        fontSize: '15px',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderRight: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(0, 0, 0, 0.3)',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        overflow: 'auto',
                    },
                },
            },
        },
    },
});

export default themeTemplate;