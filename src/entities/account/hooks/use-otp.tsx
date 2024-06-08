import React, { useEffect, useRef, useState } from 'react';
import { useModal } from 'src/app/providers/with-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'src/shared/ui/FormInput';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as yup from 'yup';
import Button from '@mui/material/Button';

interface IProps {
  onClick(): void;
}

const VALID_CODES = ['432343', '544311', '765654'];

const rules = yup.object().shape({
  otp: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .max(6, 'Максимум 6 символов')
    .required()
    .test('is-valid-otp', 'Неверный код', value =>
      VALID_CODES.some(code => value === code),
    ),
});

function Timer() {
  // eslint-disable-next-line no-undef
  const intervalId = useRef<NodeJS.Timer>();
  const [count, setCount] = useState(60);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount(prevState =>
        prevState === 0 ? 60 : Math.max(prevState - 1, 0),
      );
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      }
    };
  }, []);

  return (
    <Typography variant='body1' color='grey.500'>
      Новый код будет отправлен через 00:{count}
    </Typography>
  );
}

export const useOTP = ({ onClick }: IProps) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(rules),
  });

  const onSubmit = () => {
    onClose();
    onClick();
    reset();
  };

  const { onShow, onClose } = useModal({
    maxWidth: 'sm',
    fullWidth: true,
  });

  const showModal = onShow({
    title: 'Введите код, чтобы войти в систему',
    subtitle: 'Мы отправили код на указанный почтовый адрес.',
    children: (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack flexDirection='column' gap={4}>
          <Box>
            <FormInput
              placeholder='Введите код'
              name='otp'
              type='text'
              required
              fullWidth
              control={control}
            />
            <Timer />
          </Box>
          <Stack alignItems='center' flexDirection='row'>
            <Button variant='contained' type='submit' fullWidth>
              Войти
            </Button>
            <Button onClick={onClose} fullWidth>
              Отмена
            </Button>
          </Stack>
        </Stack>
      </form>
    ),
    actions: <></>,
  });

  return { showModal };
};
