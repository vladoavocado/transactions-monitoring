import React from 'react';
import { Grid } from '@mui/material';
import { TopBar } from 'src/widgets/top-bar';
import { Navigation } from 'src/widgets/navigation';
import { Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  return (
    <Grid container>
      <Grid item container xs={12}>
        <TopBar />
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={2}>
          <Navigation />
        </Grid>
        <Grid item xs={1} />
        <Grid item container xs={8} sx={{ mt: 5 }} alignItems='flex-start'>
          <Outlet />
        </Grid>
        <Grid item xs={1} />
        <Grid />
      </Grid>
    </Grid>
  );
}
