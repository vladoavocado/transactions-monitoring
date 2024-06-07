import { useAPI } from 'src/app/providers';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

interface IUserCredentials {
  email: string;
  password: string;
}

export const useAction = () => {
  const { auth } = useAPI();

  return useCallback(
    async ({
      email,
      password,
    }: Pick<IUserCredentials, 'email' | 'password'>) => {
      if (!auth) {
        throw new TypeError(
          'No auth API initialisation... Please, check auth model in RootApi.',
        );
      }

      try {
        await auth.loginWithEmailAndPassword(email, password);
      } catch (err) {
        toast.error(
          'Неверный пароль или пользователя с таким e-mail не существует.',
          {
            duration: 10000,
          },
        );
      }
    },
    [auth],
  );
};
