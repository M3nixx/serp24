import {AppBar,Toolbar, Button, Typography} from "@mui/material";
import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import {ThemeProvider} from '@mui/material/styles'

import themeTemplate from "./components/themeTemplate/themeTemplate";
import AppBarCustom from "./components/appBar/AppBarCustom";

import HomePage from "./pages/Home";
import CustomersPage from "./pages/Customers";
import ConsultantsPage from "./pages/Consultants";
import ProjectsPage from "./pages/Projects";
import EntriesPage from "./pages/Entries";
import UserMappingsPage from "./pages/UserMapping";

function App() {
    const handleLogout = () => {
        console.log("Logout");
    };

    return (
        <Router>
            <ThemeProvider theme={themeTemplate}>
                <AppBarCustom userName="Test User" onLogout={handleLogout} />

                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/consultants" element={<ConsultantsPage/>}/>
                    <Route path="/projects" element={<ProjectsPage/>}/>
                    <Route path="/entries" element={<EntriesPage/>}/>
                    <Route path="/user-mapping" element={<UserMappingsPage/>}/>
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;