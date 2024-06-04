import React from 'react';
import { IChildren } from 'src/shared/types';
import { Grid } from '@mui/material';
import { logger } from 'src/shared/utils';
import { Stack } from '@mui/system';
import { NavigationBar } from 'src/widgets/navigation-bar';

interface IProps extends IChildren {}

export function ProtectedLayout({ children }: IProps) {
  logger.info('PROTECTED_LAYOUT', children);

  return (
    <Grid container>
      <NavigationBar />
      <Grid container>
        <Stack
          sx={{ background: 'primary.white' }}
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
        >
          {/* <Logo /> */}
          {/* <Avatar /> */}
        </Stack>
      </Grid>
      <Grid container>
        {/* Aside Navigation */}
        <Grid />
        {/* Content */}
        <Grid />
      </Grid>
    </Grid>
  );
}
