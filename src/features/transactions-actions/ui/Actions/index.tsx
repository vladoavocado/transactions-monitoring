import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stack, StackProps } from '@mui/system';
import { useStore } from 'src/app/providers';
import { DelegateToEmployees } from '../DelegateToEmployees';
import { ResetTransactions } from '../ResetTransactions';

export function BaseActions(props: StackProps) {
  const { account } = useStore();

  if (!account?.isAdmin) {
    return null;
  }

  return (
    <Stack {...props}>
      <DelegateToEmployees />
      <ResetTransactions />
    </Stack>
  );
}

export const Actions = observer(BaseActions);
