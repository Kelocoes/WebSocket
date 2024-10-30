import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Header() {
    const nav = useNavigate();

    const navigate = (path) => {
        nav(path);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <BottomNavigation
                showLabels
                sx={{ backgroundColor: 'gray', width: '50%', borderRadius: '5px' }}
            >
                <BottomNavigationAction label="Inicio" onClick={() => navigate('/')}/>
                <BottomNavigationAction label="Crear usuario" onClick={() => navigate('user')}/>
                <BottomNavigationAction label="Chat" onClick={() => navigate('chat')}/>
            </BottomNavigation>
            <Outlet />
        </div>
    )
}
