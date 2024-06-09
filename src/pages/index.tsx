// ** React Router
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
  Route,
} from 'react-router-dom';

// ** Routes
import {
  NOT_FOUND_PATH,
  SIGN_IN_PATH,
  ROOT_PATH,
  SIGN_UP_PATH,
  TRANSACTIONS_WIZARD_PATH,
  CHATS_PATH,
} from 'src/app/routes';

// ** Layouts
import { ProtectedLayout, PublicLayout } from 'src/widgets/layout';
import { Gatekeeper } from 'src/widgets/gatekeeper';
import { AuthPage } from 'src/pages/auth-page';
import { Error404Page } from 'src/pages/error-404-page';
import { TransactionsPages } from 'src/pages/transactions-pages';
import { ChatsPage } from 'src/pages/chats-page';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Gatekeeper />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: TRANSACTIONS_WIZARD_PATH,
            element: <TransactionsPages />,
          },
          {
            path: CHATS_PATH,
            element: <ChatsPage />,
          },
        ],
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: SIGN_IN_PATH,
            element: <AuthPage />,
          },
          {
            path: SIGN_UP_PATH,
            element: <AuthPage />,
          },
          {
            path: '*',
            element: <Navigate replace to={SIGN_IN_PATH} />,
          },
        ],
      },
      { path: NOT_FOUND_PATH, element: <Error404Page /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
