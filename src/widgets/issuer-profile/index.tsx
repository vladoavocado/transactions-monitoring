import React, { useMemo } from 'react';
import { Card, CardContent, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAPI, useStore } from 'src/app/providers';
import {
  OrganizationProfile,
  OrganizationTitle,
} from 'src/entities/organizations';
import { UserProfile, UserTitle } from 'src/entities/users';
import { Models } from 'src/shared';
import IOrganization = Models.IOrganization;
import IUser = Models.IUser;

export function BaseIssuerProfile() {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();
  const { users, organizations } = useStore();
  const { active } = transactions || {};
  const [type, issuerId] = active?.issuer?.split('/') ?? [];
  const isOrganization = type === 'organizations';
  const issuer = useMemo(() => {
    if (transactionsApi?.isFetching) {
      return null;
    }

    if (isOrganization) {
      return organizations?.find(issuerId);
    }

    return users?.find(issuerId);
  }, [issuerId, isOrganization, transactionsApi?.isFetching]);

  const hasIssuer = issuer;
  const shouldDisplayOrganization = hasIssuer && isOrganization;
  const shouldDisplayUser = hasIssuer && !isOrganization;

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      {shouldDisplayUser && <UserTitle issuer={issuer as IUser} />}
      {shouldDisplayOrganization && (
        <OrganizationTitle issuer={issuer as IOrganization} />
      )}
      <CardContent
        sx={{
          minHeight: '5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: 5,
        }}
      >
        {!hasIssuer && (
          <CircularProgress
            sx={{ mx: 'auto' }}
            size={48}
            color='primary'
            thickness={3}
          />
        )}

        {shouldDisplayOrganization && (
          <OrganizationProfile issuer={issuer as IOrganization} />
        )}

        {shouldDisplayUser && <UserProfile issuer={issuer as IUser} />}
      </CardContent>
    </Card>
  );
}

export const IssuerProfile = observer(BaseIssuerProfile);
