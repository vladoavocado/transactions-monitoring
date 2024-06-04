import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Divider,
  Grid,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useMatch } from 'react-router-dom';
import { SIGN_IN_PATH, SIGN_UP_PATH } from 'src/app/routes';
import { observer } from 'mobx-react-lite';
import { FormInput } from 'src/shared/ui/FormInput';
import { AlternateEmail, Https as HttpsIcon } from '@mui/icons-material';
import { useAPI } from 'src/app/providers';
import { useAuthorize } from 'src/widgets/authorization-form/hooks/use-authorize';
import { getValidationByType } from './validations';

const useTexts = () => {
  const isSignInPage = useMatch(SIGN_IN_PATH);
  const buttonText = isSignInPage ? 'Войти' : 'Зарегистрироваться';
  const tipText = isSignInPage ? 'Нет аккаунта?' : 'Уже есть аккаунт?';
  const switchButtonText = isSignInPage ? 'Зарегистрироваться' : 'Войти';

  return {
    buttonText,
    tipText,
    switchButtonText,
  };
};

export function BaseAuthorizationForm() {
  const isSignInPage = useMatch(SIGN_IN_PATH);
  const { auth: authApi } = useAPI();
  const redirectPath = isSignInPage ? SIGN_UP_PATH : SIGN_IN_PATH;
  const authorize = useAuthorize();
  const { isPending } = authApi || { isPending: false };

  const { buttonText, tipText, switchButtonText } = useTexts();

  const schema = useMemo(
    () => getValidationByType(Boolean(isSignInPage)),
    [isSignInPage],
  );

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [isSignInPage]);

  return (
    <form onSubmit={handleSubmit(authorize)}>
      <Grid container spacing={4}>
        <Grid item container>
          <Grid item xs={12}>
            <FormInput
              name='email'
              type='text'
              required
              fullWidth
              label='Email'
              control={control}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='start'
                    sx={{ pointerEvents: 'none' }}
                  >
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name='password'
              type='password'
              required
              fullWidth
              label='Пароль'
              control={control}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='start'
                    sx={{ pointerEvents: 'none' }}
                  >
                    <HttpsIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {!isSignInPage && (
            <Grid item xs={12}>
              <FormInput
                name='confirmPassword'
                type='password'
                required
                fullWidth
                label='Подтвердите пароль'
                control={control}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position='start'
                      sx={{ pointerEvents: 'none' }}
                    >
                      <HttpsIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
        </Grid>
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <LoadingButton
              type='submit'
              size='large'
              fullWidth
              variant='contained'
              loading={isPending}
            >
              {buttonText}
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Divider textAlign='center'>
              <Typography variant='body1' fontWeight='100' color='grey.700'>
                {tipText}
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={redirectPath}
              size='large'
              fullWidth
              disabled={isPending}
            >
              {switchButtonText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export const AuthorizationForm = observer(BaseAuthorizationForm);
