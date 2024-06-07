import React from 'react';
import { Typography } from '@mui/material';

interface IProps {}

export function TransactionInfoPage(props: IProps) {
  return (
    <Typography variant='h4' fontWeight='bold'>
      Информация о транзакции
    </Typography>
  );
}
