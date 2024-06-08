import { FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  readonly?: boolean;
  field: any;
}

export function ToggleBox({ readonly, field }: IProps) {
  const { ref, ...restFieldProps } = field;
  return (
    <Stack flexDirection='row' gap={2} alignItems='center'>
      <Typography variant='h6'>Нет</Typography>
      <FormControlLabel
        label=''
        control={
          <Switch
            {...restFieldProps}
            readOnly={readonly}
            disabled={readonly}
            inputRef={ref}
            checked={!!field.value}
            color='primary'
            sx={{ mr: 0 }}
          />
        }
        sx={{ mr: 0 }}
      />
      <Typography variant='h6'>Да</Typography>
    </Stack>
  );
}
