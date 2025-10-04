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
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
    },
});

export default themeTemplate;