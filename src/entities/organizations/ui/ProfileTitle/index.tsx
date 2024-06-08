import React from 'react';
import { CardHeader, Typography } from '@mui/material';
import { Models } from 'src/shared';
import IOrganization = Models.IOrganization;

interface IProps {
  issuer: IOrganization;
}

export function ProfileTitle({ issuer }: IProps) {
  const title = issuer ? issuer.name : null;

  if (!title) {
    return null;
  }

  return (
    <CardHeader
      title={
        <Typography variant='h4' fontWeight='bold'>
          {title}
        </Typography>
      }
    />
  );
}
