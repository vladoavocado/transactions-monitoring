import { useAPI } from 'src/app/providers';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useMatch } from 'react-router-dom';
import { SIGN_IN_PATH } from 'src/app/routes';
import { logger } from 'src/shared/utils';

interface IUserCredentials {
  email: string;
  password: string;
}

export const useSignUp = () => {
  const { auth } = useAPI();

  return useCallback(
    async ({ email, password }: IUserCredentials) => {
      if (!auth) {
        throw new TypeError(
          'No auth API initialisation... Please, check auth model in RootApi.',
        );
      }

      try {
        await auth.registerWithEmailAndPassword(email, password);
      } catch (err) {
        toast.error(
          'Не удалось создать учётную запись. Пожалуйста, обратитесь к нам в поддержку.',
          {
            duration: 5000,
          },
        );
      }
    },
    [auth],
  );
};

export const useSignIn = () => {
  const { auth } = useAPI();

  return useCallback(
    async ({ email, password }: IUserCredentials) => {
      if (!auth) {
        throw new TypeError(
          'No auth API initialisation... Please, check auth model in RootApi.',
        );
      }

      try {
        await auth.loginWithEmailAndPassword(email, password);
      } catch (err) {
        logger.info(334234);
        toast.error(
          'Неверный пароль или пользователя с таким e-mail не существует.',
          {
            duration: 5000,
          },
        );
      }
    },
    [auth],
  );
};

export const useAuthorize = () => {
  const isSignInPage = useMatch(SIGN_IN_PATH);
  const signIn = useSignIn();
  const signUp = useSignUp();

  return isSignInPage ? signIn : signUp;
};
