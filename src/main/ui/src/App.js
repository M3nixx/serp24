import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import themeTemplate from "./components/themeTemplate/themeTemplate";
import AppBarCustom from "./components/appBar/AppBarCustom";

import HomePage from "./pages/Home";
import CustomersPage from "./pages/Customers";
import ConsultantsPage from "./pages/Consultants";
import ProjectsPage from "./pages/Projects";
import EntriesPage from "./pages/Entries";
import UserMappingsPage from "./pages/UserMapping";

function App() {
  const [user, setUser] = useState(null);
  const [checkedLogin, setCheckedLogin] = useState(false); 
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setCheckedLogin(true);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (checkedLogin && !user) {
      window.location.href = "http://localhost:8080/oauth2/authorization/azure";
    }
  }, [checkedLogin, user]);

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  if (!checkedLogin) {
    return <h2>Lade User-Daten...</h2>; 
  }

  // User ist eingeloggt
  return (
    <Router>
      <ThemeProvider theme={themeTemplate}>
        <AppBarCustom userName={user?.name} onLogout={handleLogout} />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/user-mapping" element={<UserMappingsPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
