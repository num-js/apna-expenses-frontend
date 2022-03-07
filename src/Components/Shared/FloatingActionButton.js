import React, { useState } from 'react';

import Fab from "@mui/material/Fab";

const FloatingActionButton = ({ children, positions = { bottom: 100, right: 30 }, color = 'primary' }) => {

    return (
        <>
            <Fab
                sx={{ position: "fixed", ...positions }}
                color={color}
            // variant="extended"
            >
                {children}
            </Fab>
        </>
    )
}

export default FloatingActionButton;