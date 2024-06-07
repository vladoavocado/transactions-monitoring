import { Avatar, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Stack } from '@mui/system';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/providers';

interface IProps {
  onClick?: (...args: any[]) => void;
}

export function BaseAccountProfileBadge({ onClick }: IProps) {
  const { account } = useStore();

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Avatar variant='circular' color='grey.400'>
        <Person />
      </Avatar>
      <Stack alignItems='flex-start'>
        <Typography variant='body1'>{account?.displayName}</Typography>
        <Typography variant='body2' color='grey.500'>
          {account?.role}
        </Typography>
      </Stack>
    </Stack>
  );
}

export const AccountProfileBadge = observer(BaseAccountProfileBadge);
