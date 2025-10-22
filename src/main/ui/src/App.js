import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import themeTemplate from "./components/themeTemplate/themeTemplate";
import { AuthProvider } from "./AuthContext";
import AppContent from "./AppContent";

function App() {
  return (
    <Router>
      <ThemeProvider theme={themeTemplate}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
