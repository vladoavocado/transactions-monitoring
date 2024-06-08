import React from 'react';
import { Card, CardContent, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/providers';
import { useIssuerData } from 'src/entities/transactions/hooks';
import { RiskAnalysisForm } from '../RiskAnalysisForm';

export function BaseRiskAnalysis() {
  const { transactions } = useStore();
  const { active } = transactions || {};
  const getIssuer = useIssuerData();
  const { data: issuer } = getIssuer(active?.issuer ?? '');

  return (
    <Card sx={{ p: 2, borderRadius: 2, maxWidth: '65em' }}>
      <CardContent
        sx={{
          minHeight: '5em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {!issuer ? (
          <CircularProgress
            sx={{ mx: 'auto' }}
            size={48}
            color='primary'
            thickness={3}
          />
        ) : (
          <RiskAnalysisForm issuer={issuer} />
        )}
      </CardContent>
    </Card>
  );
}

export const RiskAnalysis = observer(BaseRiskAnalysis);
