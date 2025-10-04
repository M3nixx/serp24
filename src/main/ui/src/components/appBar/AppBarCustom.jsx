import React from 'react';
import {AppBar, Toolbar, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import GenericButton from "../button/GenericButton";

const UserButtons = ({userName, onLogout}) => (
    <div style={{marginLeft: "auto", display: "flex", gap: 8}}>
        <GenericButton label={userName} disabled/>
        <GenericButton label="Logout" onClick={onLogout} color="secondary"/>
    </div>
);

const AppBarCustom = ({userName, onLogout}) => {
    const links = [
        {name: "Home", path: "/home"},
        {name: "Customers", path: "/customers"},
        {name: "Consultants", path: "/consultants"},
        {name: "Projects", path: "/projects"},
        {name: "Entries", path: "/entries"},
        {name: "User Mapping", path: "/user-mapping"}
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                {links.map(link => (
                    <Button
                        key={link.name}
                        color="inherit"
                        component={Link}
                        to={link.path}
                    >
                        {link.name}
                    </Button>
                ))}
                <UserButtons userName={userName} onLogout={onLogout}/>

                {/* todo: erstes einbinden der buttons // kann raus wenn generic funktioniert*/}
                {/*    <div style={{ marginLeft: "auto" }}>*/}
                {/*    <Button variant="contained" color="secondary" disabled="1">{userName}</Button>*/}
                {/*    <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>*/}
                {/*    </div>*/}

            </Toolbar>
        </AppBar>
    );
};

export default AppBarCustom;