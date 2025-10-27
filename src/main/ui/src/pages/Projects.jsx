import React from 'react';
import ProjectsTable from "../components/tables/ProjectsTable";
import {Typography} from "@mui/material";

const ProjectsPage = () => {
    return (
        <div>
            <Typography variant="h2">Projects</Typography>
            <ProjectsTable/>
        </div>
    );
};

export default ProjectsPage;