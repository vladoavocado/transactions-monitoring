import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/providers';
import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { HOME_PATH, ROOT_PATH, SIGN_IN_PATH } from 'src/app/routes';
import { Fallback } from 'src/shared/ui/Fallback';

export function BaseGatekeeper() {
  const { ui } = useStore();
  const isRootPage = useMatch(ROOT_PATH);
  const { auth } = useStore();

  if (ui.isFallbackVisible) {
    return <Fallback />;
  }

  if (auth?.hasToken) {
    return (
      <>
        <Navigate replace to={HOME_PATH} />
        <Outlet />
      </>
    );
  }

  if (isRootPage) {
    return (
      <>
        <Navigate replace to={SIGN_IN_PATH} />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Navigate replace to={SIGN_IN_PATH} />
      <Outlet />
    </>
  );
}

export const Gatekeeper = observer(BaseGatekeeper);
