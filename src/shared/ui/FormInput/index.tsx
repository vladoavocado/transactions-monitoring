import { Control, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export function FormInput({
  name,
  control,
  label,
  type = 'text',
  ...rest
}: TextFieldProps & { name: string; control: Control<any> }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error } }) => {
        const { ref, ...restFieldProps } = field;

        return (
          <TextField
            {...restFieldProps}
            {...rest}
            inputRef={ref}
            label={label}
            type={type}
            variant='outlined'
            error={!!error}
            helperText={error ? error.message : ''}
            fullWidth
            margin='normal'
          />
        );
      }}
    />
  );
}
