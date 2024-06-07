import React from 'react';
import { Box } from '@mui/material';
import { TopBar } from 'src/widgets/top-bar';
import { Navigation } from 'src/widgets/navigation';
import { Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'min-content 1fr',
        gap: 5,
        px: {
          xs: 3.75,
          xl: 15,
        },
        pt: {
          xs: 3.75,
          xl: 7.5,
        },
      }}
    >
      <TopBar />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'min-content 1fr',
          gap: 4,
        }}
      >
        <Navigation />
        <Outlet />
      </Box>
    </Box>
  );
}
