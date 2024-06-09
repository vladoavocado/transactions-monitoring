import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';

export function ReportModal() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => () => {
      setIsLoading(false);
    },
    [],
  );

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }}>
      {isLoading && (
        <CircularProgress size='48px' color='inherit' thickness={3} />
      )}
      <img
        src='https://firebasestorage.googleapis.com/v0/b/bank-transactions-monito-9cc4f.appspot.com/o/report.jpg?alt=media&token=b0467710-2c2d-4b47-bb20-83f2298e2389'
        alt='Отчёт к вырузке'
        loading='lazy'
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </Stack>
  );
}
