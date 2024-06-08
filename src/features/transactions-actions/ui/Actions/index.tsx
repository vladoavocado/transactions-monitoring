import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stack, StackProps } from '@mui/system';
import { useStore } from 'src/app/providers';
import { ResetStatuses } from '../ResetStatuses';
import { DelegateToEmployees } from '../DelegateToEmployees';
import { ResetEmployees } from '../ResetEmployees';

export function BaseActions(props: StackProps) {
  const { account } = useStore();

  if (!account?.isAdmin) {
    return null;
  }

  return (
    <Stack {...props}>
      <DelegateToEmployees />
      <ResetEmployees />
      <ResetStatuses />
    </Stack>
  );
}

export const Actions = observer(BaseActions);
