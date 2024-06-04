import React from 'react';

import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={({ palette }) => ({
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: palette.grey[200],
      })}
    >
      <Outlet />
    </Stack>
  );
}
