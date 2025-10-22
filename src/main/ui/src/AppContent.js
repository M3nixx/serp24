import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AppBarCustom from "./components/appBar/AppBarCustom";

import HomePage from "./pages/Home";
import CustomersPage from "./pages/Customers";
import ConsultantsPage from "./pages/Consultants";
import ProjectsPage from "./pages/Projects";
import EntriesPage from "./pages/Entries";
import UserMappingsPage from "./pages/UserMapping";

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // window.location.href = "http://localhost:8080/login/oauth2/code/azure";
    window.location.href = "http://localhost:8080/oauth2/authorization/azure";
    return <p>Redirecting to login...</p>;
  }

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <>
      <AppBarCustom userName={user.name} onLogout={handleLogout} />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/consultants" element={<ConsultantsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/entries" element={<EntriesPage />} />
        <Route path="/user-mapping" element={<UserMappingsPage />} />
      </Routes>
    </>
  );
};

export default AppContent;
