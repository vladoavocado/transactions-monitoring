import React from 'react';
import { Stack } from '@mui/system';
import { CircularProgress, Typography, styled } from '@mui/material';

const FlickeringText = styled(Typography)({
  '@keyframes pulsate': {
    from: {
      opacity: 1,
      transform: 'scale(1)',
    },
    to: {
      opacity: 0,
      transform: 'scale(1.1)',
    },
  },
  animation: 'pulsate 1s infinite alternate',
});

export function Fallback() {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        spacing={2}
        color='primary.light'
      >
        <CircularProgress size='48px' color='inherit' thickness={3} />
        <FlickeringText
          variant='caption'
          color='common.black'
          fontWeight='bold'
        >
          Загружаем приложеньку...
        </FlickeringText>
      </Stack>
    </Stack>
  );
}
