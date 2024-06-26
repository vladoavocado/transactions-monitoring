import React, { ReactNode } from 'react';
import { RootModel } from 'src/app/models';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import { IChildren, ReactiveApi } from 'src/shared/types';
import IRootApi = ReactiveApi.IRootApi;

interface IProps extends IChildren {
  api: IRootApi;
  store: RootModel;
}

const theme = createTheme();

export const withTheme = (Component: (props: any) => ReactNode) =>
  function ThemeProvider(props: IProps) {
    return (
      <MUIThemeProvider theme={theme}>
        <Component {...props} />
      </MUIThemeProvider>
    );
  };
