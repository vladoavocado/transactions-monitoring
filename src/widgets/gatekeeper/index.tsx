import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAPI, useStore } from 'src/app/providers';
import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { HOME_PATH, ROOT_PATH, SIGN_IN_PATH } from 'src/app/routes';
import { Fallback } from 'src/shared/ui/Fallback';
import { Box, BoxProps, styled } from '@mui/material';

const RootContainer = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  background: theme.palette.grey[200],
}));

export function BaseGatekeeper() {
  const { users: usersApi } = useAPI();
  const { ui } = useStore();
  const isRootPage = useMatch(ROOT_PATH);
  const { auth } = useStore();

  useEffect(() => {
    if (auth?.hasToken) {
      usersApi?.fetch();
    }
  }, [auth?.hasToken]);

  if (ui.isFallbackVisible) {
    return <Fallback />;
  }

  if (auth?.hasToken) {
    return (
      <RootContainer>
        <Navigate replace to={HOME_PATH} />
        <Outlet />
      </RootContainer>
    );
  }

  if (isRootPage) {
    return (
      <RootContainer>
        <Navigate replace to={SIGN_IN_PATH} />
        <Outlet />
      </RootContainer>
    );
  }

  return (
    <RootContainer>
      <Navigate replace to={SIGN_IN_PATH} />
      <Outlet />
    </RootContainer>
  );
}

export const Gatekeeper = observer(BaseGatekeeper);
