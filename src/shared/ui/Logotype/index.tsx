import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface IProps extends TypographyProps {}

export function Logotype({ variant, ...restProps }: IProps) {
  return (
    <Typography
      {...restProps}
      variant={variant || 'h3'}
      fontFamily='Merriweather, Roboto, Sans Serif'
      fontWeight='bold'
    >
      <span style={{ color: '#ef3124', marginRight: '0.2em' }}>Альфа</span>
      Банк
    </Typography>
  );
}
