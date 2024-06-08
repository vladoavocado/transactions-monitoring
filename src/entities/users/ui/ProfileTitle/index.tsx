import React from 'react';
import { CardHeader } from '@mui/material';
import { Models } from 'src/shared';
import IUser = Models.IUser;

interface IProps {
  issuer?: IUser;
}

export function ProfileTitle({ issuer }: IProps) {
  const title = issuer
    ? `${issuer.lastName} ${issuer.firstName} ${issuer.patronymic}`
    : null;

  if (!title) {
    return null;
  }

  return <CardHeader title={title} />;
}
