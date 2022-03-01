import React, { useState } from 'react';

import Fab from "@mui/material/Fab";

const FloatingActionButton = ({ children }) => {

    return (
        <>
            <Fab
                sx={{ position: "fixed", bottom: 100, right: 30 }}
                color="primary"
            // variant="extended"
            >
                {children}
            </Fab>
        </>
    )
}

export default FloatingActionButton;