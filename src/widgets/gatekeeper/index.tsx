import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAPI, useStore } from 'src/app/providers';
import { Navigate, Outlet } from 'react-router-dom';
import { HOME_PATH, SIGN_IN_PATH } from 'src/app/routes';
import { Fallback } from 'src/shared/ui/Fallback';
import { Box, BoxProps, styled } from '@mui/material';

const RootContainer = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  background: theme.palette.grey[100],
}));

const getRedirectUrl = () => {
  const { auth } = useStore();

  if (auth?.hasToken) {
    return HOME_PATH;
  }

  return SIGN_IN_PATH;
};

export function BaseGatekeeper() {
  const { users: usersApi } = useAPI();
  const { ui } = useStore();
  const redirectUrl = getRedirectUrl();
  const { auth } = useStore();

  useEffect(() => {
    if (auth?.hasToken) {
      usersApi?.fetch();
    }
  }, [auth?.hasToken]);

  if (ui.isFallbackVisible) {
    return <Fallback />;
  }

  return (
    <RootContainer>
      <Navigate replace to={redirectUrl} />
      <Outlet />
    </RootContainer>
  );
}

export const Gatekeeper = observer(BaseGatekeeper);
