import React from 'react';
import UserMappingsTable from "../components/tables/UserMappingsTable";

const UserMapping = () => {
    return (
        <div style={{margin: "20px"}}>
            <h2>User Mapping</h2>
            <UserMappingsTable/>
        </div>
    );
};

export default UserMapping;