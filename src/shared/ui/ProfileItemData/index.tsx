import React from 'react';
import { Stack, StackProps } from '@mui/system';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Nullable } from 'src/shared';

interface IProps {
  title: string;
  text?: string;
  externalLink?: string;
}

export function ProfileItemData({
  title,
  text,
  externalLink,
  sx,
  ...stackProps
}: IProps & StackProps) {
  return (
    <Stack sx={{ ...sx, pr: 4 }} {...stackProps}>
      <Typography variant='body1' color='grey.600'>
        {title}
      </Typography>
      <Stack gap={2}>
        <Typography variant='h6'>{text}</Typography>
        {externalLink && (
          <Button
            variant='outlined'
            component='a'
            target='_blank'
            href={externalLink}
          >
            Открыть Сайт
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
