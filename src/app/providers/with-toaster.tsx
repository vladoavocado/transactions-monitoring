import React, { ReactNode } from 'react';
import { IChildren } from 'src/shared/types';

// ** Third-Party Tools
import { Toaster } from 'react-hot-toast';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

export const withToaster = (Component: (props: any) => ReactNode) =>
  function ToasterProvider(props: IChildren): JSX.Element {
    const fullWidth = useMediaQuery(({ breakpoints }: Theme) =>
      breakpoints.down('sm'),
    );

    return (
      <>
        <Component {...props} />
        <Toaster
          position='bottom-right'
          toastOptions={{
            className: 'react-hot-toast',
            style: {
              maxWidth: '500px',
              width: fullWidth ? '100%' : undefined,
            },
          }}
        />
      </>
    );
  };
