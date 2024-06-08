import React, { useMemo } from 'react';
import { CardHeader } from '@mui/material';
import { useStore } from 'src/app/providers';
import { Models } from 'src/shared';
import IUser = Models.IUser;

interface IProps {
  issuer?: IUser;
}

export function ProfileTitle({ issuer }: IProps) {
  const title = useMemo(
    () =>
      issuer
        ? `${issuer.lastName} ${issuer.firstName} ${issuer.patronymic}`
        : null,
    [issuer],
  );

  if (!title) {
    return null;
  }

  return <CardHeader title={title} />;
}
