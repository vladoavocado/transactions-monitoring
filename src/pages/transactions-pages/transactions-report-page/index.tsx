import React from 'react';
import { Typography } from '@mui/material';

interface IProps {}

export function TransactionsReportPage(props: IProps) {
  return (
    <Typography variant='h4' fontWeight='bold'>
      Отчётность по транзакциям
    </Typography>
  );
}
