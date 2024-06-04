import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SIGN_IN_PATH } from 'src/app/routes';
import { AuthorizationForm } from 'src/widgets/authorization-form';
import { Logotype } from 'src/shared/ui/Logotype';

const useSubheaderText = () => {
  const { pathname } = useLocation();
  const isSignInPage = pathname === SIGN_IN_PATH;
  return isSignInPage
    ? 'Вход в модуль финансового мониторинга банковских операций'
    : 'Регистрация в системе мониторинга финансовых транзакций';
};

export function AuthPage() {
  const subheaderText = useSubheaderText();

  return (
    <Card
      sx={{
        maxWidth: '400px',
        width: '100%',
        p: 2,
        borderRadius: 5,
        boxShadow: '0 0 5em 1em rgba(0, 0, 0, .1)',
      }}
    >
      <CardHeader
        title={<Logotype />}
        subheader={
          <Typography mt={1} variant='body1'>
            {subheaderText}
          </Typography>
        }
      />
      <CardContent>
        <AuthorizationForm />
      </CardContent>
    </Card>
  );
}
