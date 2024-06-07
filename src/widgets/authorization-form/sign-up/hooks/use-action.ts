import { useAPI, useStore } from 'src/app/providers';
import { useCallback } from 'react';
import { createInitials } from 'src/shared/utils/create-initials';
import toast from 'react-hot-toast';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;

interface IUserCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
}

const getErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email занят. Пожалуйста используйте другой почтовый ящик.';
    default:
      return 'Что-то пошло не так. Пожалуйста, обратитесь к нам в поддержку.';
  }
};

export const useAction = () => {
  const { account } = useStore();
  const { auth, users } = useAPI();

  return useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      patronymic,
    }: IUserCredentials) => {
      if (!auth) {
        throw new TypeError(
          'No auth API initialisation... Please, check auth model in RootApi.',
        );
      }

      try {
        await auth.registerWithEmailAndPassword(email, password);
        await users?.createOrUpdate(
          {
            email,
            first_name: firstName,
            last_name: lastName,
            patronymic: patronymic ?? null,
            initials: createInitials({ firstName, lastName, patronymic }),
            inn: null,
            job_title: null,
            job_link: null,
            passport_info: null,
            role: 2,
          },
          account?.id ?? '',
        );
      } catch (err: any) {
        const message = getErrorMessage(err);
        toast.remove();
        toast.error(message, {
          duration: 5000,
        });
      }
    },
    [auth],
  );
};
