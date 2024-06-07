import React, { ElementType, useEffect } from 'react';
import { useAPI } from 'src/app/providers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import { FormInput } from 'src/shared/ui/FormInput';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { SIGN_IN_PATH } from 'src/app/routes';
import { observer } from 'mobx-react-lite';
import { rules } from './validations';
import { useAction, useInputs } from './hooks';

interface ICellProps {
  name?: string;
  type?: string;
  label?: string;
  required?: boolean;
  control: any;
  Icon?: ElementType;
}

function Cell({ name, type, label, required, control, Icon }: ICellProps) {
  if (!name || !type || !label) {
    return null;
  }

  return (
    <FormInput
      name={name}
      type={type}
      label={label}
      required={required}
      fullWidth
      control={control}
      InputProps={
        Icon
          ? {
              endAdornment: (
                <InputAdornment position='start' sx={{ pointerEvents: 'none' }}>
                  <Icon />
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}

export function BaseSignUp() {
  const signUp = useAction();
  const inputs = useInputs();
  const { auth: authApi } = useAPI();
  const { isPending } = authApi || { isPending: false };

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(rules),
  });

  useEffect(
    () => () => {
      reset();
    },
    [],
  );

  return (
    <form noValidate onSubmit={handleSubmit(signUp)}>
      <Grid container spacing={4}>
        <Grid item container>
          {inputs.map(inputOrGroup => {
            if ('inputs' in inputOrGroup) {
              const { inputs: groupInputs, id } = inputOrGroup;
              const groupItemsPerRow = Math.trunc(
                12 / (groupInputs.length || 1),
              );

              return (
                <Grid key={id} item container spacing={2} xs={12}>
                  {groupInputs.map(
                    ({ id: inputId, optional, ...restInput }) => (
                      <Grid key={inputId} item xs={groupItemsPerRow}>
                        <Cell
                          {...restInput}
                          required={!optional}
                          control={control}
                        />
                      </Grid>
                    ),
                  )}
                </Grid>
              );
            }

            return (
              <Grid key={inputOrGroup.id} item xs={12}>
                <Cell
                  {...inputOrGroup}
                  required={!inputOrGroup.optional}
                  control={control}
                />
              </Grid>
            );
          })}
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
              Зарегистрироваться
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Divider textAlign='center'>
              <Typography variant='body1' fontWeight='100' color='grey.700'>
                Уже есть аккаунт?
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={SIGN_IN_PATH}
              size='large'
              fullWidth
              disabled={isPending}
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export const SignUp = observer(BaseSignUp);
