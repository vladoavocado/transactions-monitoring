import React, { useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import { FormInput } from 'src/shared/ui/FormInput';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useAPI } from 'src/app/providers';
import { useForm } from 'react-hook-form';
import { SIGN_UP_PATH } from 'src/app/routes';
import { observer } from 'mobx-react-lite';
import { useOTP } from 'src/entities/account/hooks/use-otp';
import { useInputs, useAction } from './hooks';
import { rules } from './validations';

export function BaseSignIn() {
  const signIn = useAction();
  const { auth: authApi } = useAPI();
  const { isPending } = authApi || { isPending: false };
  const inputs = useInputs();
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(rules),
  });
  const email = watch('email');

  const { showModal } = useOTP({
    onClick: handleSubmit(signIn),
  });

  useEffect(
    () => () => {
      reset();
    },
    [],
  );

  return (
    <form>
      <Grid container spacing={4}>
        <Grid item container>
          {inputs.map(({ id, name, type, label, Icon }) => (
            <Grid item xs={12} key={id}>
              <FormInput
                name={name}
                type={type}
                label={label}
                required
                fullWidth
                control={control}
                InputProps={
                  Icon
                    ? {
                        endAdornment: (
                          <InputAdornment
                            position='start'
                            sx={{ pointerEvents: 'none' }}
                          >
                            <Icon />
                          </InputAdornment>
                        ),
                      }
                    : undefined
                }
              />
            </Grid>
          ))}
        </Grid>
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <LoadingButton
              onClick={showModal}
              size='large'
              fullWidth
              variant='contained'
              loading={isPending}
              disabled={!email}
            >
              Войти
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Divider textAlign='center'>
              <Typography variant='body1' fontWeight='100' color='grey.700'>
                Нет аккаунта?
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={SIGN_UP_PATH}
              size='large'
              fullWidth
              disabled={isPending}
            >
              Зарегистрироваться
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export const SignIn = observer(BaseSignIn);
