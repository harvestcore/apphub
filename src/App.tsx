import React from 'react';

import { Box } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import Canvas from './components/canvas/Canvas';

export default function Home() {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}
        >
            <Sidebar />
            <Canvas />
        </Box>
    );
}
