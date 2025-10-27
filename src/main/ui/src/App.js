// import { BrowserRouter as Router } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";

// import themeTemplate from "./components/themeTemplate/themeTemplate";

// // function App() {
// //   return (
// //     <Router>
// //       <ThemeProvider theme={themeTemplate}>
// //         <AuthProvider>
// //           <AppContent />
// //         </AuthProvider>
// //       </ThemeProvider>
// //     </Router>
// //   );
// // }

// // export default App;

// // src/App.js
// import React, { useEffect, useState } from "react";
// import AppContent from "./AppContent";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//       fetch("http://localhost:8080/api/v1/user", {
//         method: "GET",
//         credentials: "include", // <-- sehr wichtig
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       .then((res) => {
//         if (res.status === 200) return res.json();
//         else throw new Error("Not logged in");
//       })
//       .then(setUser)
//       .catch(() => setUser(null));
//   }, []);

//   const handleLogin = () => {
//     window.location.href = "http://localhost:8080/oauth2/authorization/azure";
//   };

//   const handleLogout = () => {
//     window.location.href = "http://localhost:8080/logout";
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "5rem" }}>
//       {user ? (
//             <Router>
//               <ThemeProvider theme={themeTemplate}>
//                   <AppContent />
//               </ThemeProvider>
//             </Router>
//       ) : (
//         <>
//           <h2>Du bist nicht eingeloggt</h2>
//           <button onClick={handleLogin}>Login mit Azure</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import {AppBar,Toolbar, Button, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: "include", // <-- sehr wichtig
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          if (res.status === 200) return res.json();
          else throw new Error("Not logged in");
        })
        .then(setUser)
        .catch(() => setUser(null));
    }, []);

    const handleLogin = () => {
      window.location.href = "http://localhost:8080/oauth2/authorization/azure";
    };

    const handleLogout = () => {
      window.location.href = "http://localhost:8080/logout";
    };

    

  return user ? (
      <Router>
          <ThemeProvider theme={themeTemplate}>
              <AppBarCustom userName={user.name} onLogout={handleLogout} />

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
  ) : (
      <>
          <h2>Du bist nicht eingeloggt</h2>
          <button onClick={handleLogin}>Login mit Azure</button>
      </>
  );

}

export default App;
