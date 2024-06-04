import * as yup from 'yup';

const SIGN_IN_SPEC = {
  email: yup
    .string()
    .matches(
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Неправильный формат e-mail. \n (Пример test@domain.com)',
    )
    .required('Е-mail обязателен')
    .max(
      2048,
      'E-mail имеет больше символов, чем мы поддерживаем. Пожалуйста, используйте другой e-mail.',
    ),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен иметь как минимум из 6 символов')
    .max(128, 'Пароль не должен превышать 128 символов'),
};

const SIGN_UP_SPEC = {
  ...SIGN_IN_SPEC,
  confirmPassword: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен иметь как минимум из 6 символов')
    .max(128, 'Пароль не должен превышать 128 символов')
    .oneOf([yup.ref('password')], 'Пароли не совпадают.'),
};

export const getValidationByType = (isSignIn: boolean) =>
  yup.object(isSignIn ? SIGN_IN_SPEC : SIGN_UP_SPEC).required();
