import { ElementType, useMemo } from 'react';
import { AlternateEmail, Https as HttpsIcon } from '@mui/icons-material';
import { nanoid } from 'nanoid';

interface IInput {
  id: string;
  name: string;
  type: string;
  label: string;
  optional?: boolean;
  Icon?: ElementType;
}

interface IInputGroup extends Pick<IInput, 'id'> {
  inputs: IInput[];
}

type InputOrGroup = IInput | IInputGroup;

export const useInputs = () =>
  useMemo<InputOrGroup[]>(
    () => [
      {
        id: nanoid(),
        inputs: [
          {
            id: nanoid(),
            name: 'firstName',
            type: 'text',
            label: 'Ваше имя',
          },
          {
            id: nanoid(),
            name: 'lastName',
            type: 'text',
            label: 'Ваша фамилия',
          },
        ],
      },
      {
        id: nanoid(),
        name: 'patronymic',
        type: 'text',
        label: 'Ваше отчество (опционально)',
        optional: true,
      },
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
        Icon: HttpsIcon,
      },
      {
        id: nanoid(),
        name: 'confirmPassword',
        type: 'password',
        label: 'Подтердите пароль',
        Icon: HttpsIcon,
      },
    ],
    [],
  );
