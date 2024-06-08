import React, { ReactNode } from 'react';
import { Stack, StackProps } from '@mui/system';
import { Box, Typography } from '@mui/material';

interface IProps {
  title: string;
  value?: string | ReactNode;
}

export function CardItemData({
  title,
  value,
  sx,
  ...stackProps
}: IProps & StackProps) {
  return (
    <Stack sx={{ ...sx, pr: 4, gap: 1 }} {...stackProps}>
      <Typography variant='body1' color='grey.600'>
        {title}
      </Typography>
      <Stack gap={2}>
        {typeof value === 'string' ? (
          <Typography variant='h6'>{value}</Typography>
        ) : (
          value
        )}
      </Stack>
    </Stack>
  );
}
