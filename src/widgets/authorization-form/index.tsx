import React from 'react';
import { useMatch } from 'react-router-dom';
import { SIGN_IN_PATH } from 'src/app/routes';
import { SignUp } from './sign-up';
import { SignIn } from './sign-in';

export function AuthorizationForm() {
  const isSignInPage = useMatch(SIGN_IN_PATH);

  return isSignInPage ? <SignIn /> : <SignUp />;
}
