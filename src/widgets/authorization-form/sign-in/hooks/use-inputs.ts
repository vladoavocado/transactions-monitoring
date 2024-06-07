import { useMemo } from 'react';
import { AlternateEmail, Https as HttpsIcon } from '@mui/icons-material';
import { nanoid } from 'nanoid';

export const useInputs = () =>
  useMemo(
    () => [
      {
        id: nanoid(),
        name: 'email',
        type: 'text',
        label: 'Email',
        Icon: AlternateEmail,
      },
      {
        id: nanoid(),
        name: 'password',
        type: 'password',
        label: 'Пароль',
        icon: HttpsIcon,
      },
    ],
    [],
  );
