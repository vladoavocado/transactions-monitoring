import * as yup from 'yup';

export const SPEC = {
  email: yup
    .string()
    .matches(
      /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Неправильный формат e-mail. \n (Пример test@domain.com)',
    )
    .max(148, 'E-mail имеет больше символов, чем мы поддерживаем.')
    .required('Е-mail обязателен'),
  password: yup
    .string()
    .max(148, 'Пароль имеет больше символов, чем мы поддерживаем')
    .required('Пароль обязателен'),
};

export const rules = yup.object(SPEC).required();
