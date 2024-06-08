import React, { useCallback } from 'react';
import { Models } from 'src/shared';
import { Stack, TextField } from '@mui/material';
import {
  useAnalysisFormInputs,
  useAnalysisFormRules,
} from 'src/entities/transactions/hooks/use-risk-analysis-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { CardItemData } from 'src/shared/ui/CardItemData';
import { LoadingButton } from '@mui/lab';
import { useAPI, useStore } from 'src/app/providers';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import IUser = Models.IUser;
import IOrganization = Models.IOrganization;
import { precisionRound } from 'src/shared/utils/precision-round';

interface IProps {
  issuer?: IUser | IOrganization;
}

export function BaseRiskAnalysisForm({ issuer }: IProps) {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();
  const { active } = transactions || {};
  const inputs = useAnalysisFormInputs();
  const rules = useAnalysisFormRules();

  const { control, handleSubmit, formState, watch } = useForm({
    resolver: yupResolver(rules),
    defaultValues: transactions?.active?.risks,
  });

  const riskProbability = watch('riskProbability');
  const riskConsequence = watch('riskConsequence');

  const onSubmit = useCallback(
    async (data: any) => {
      const { title, riskConsequence, riskProbability } = data;

      try {
        toast.remove();

        await transactionsApi?.createOrUpdate(
          {
            risks: {
              title,
              risk_consequence: riskConsequence,
              risk_probability: riskProbability,
            },
          },
          active?.id,
        );

        toast.success('Сохранено!', { duration: 5000 });
      } catch (err) {
        console.log({ err });
        toast.error(
          'Не удалось сохранить данные. Пожалуйста, попробуйте снова',
          { duration: 5000 },
        );
      }
    },
    [active?.id],
  );

  if (!issuer) {
    return null;
  }

  return (
    <form
      style={{ width: '100%' }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        alignItems='flexStart'
        justifyContent='center'
        flexDirection='column'
        width='100%'
        gap={3}
      >
        {Object.values(inputs).map(({ name, type, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <CardItemData
                title={label ?? ''}
                value={
                  <TextField
                    {...field}
                    type={type}
                    inputProps={
                      type === 'number'
                        ? { min: 0, max: 1, step: 0.1 }
                        : undefined
                    }
                  />
                }
                sx={{ width: '100%' }}
              />
            )}
          />
        ))}
        <CardItemData
          title='Степень тяжести риска'
          value={
            <TextField
              disabled
              type='number'
              value={precisionRound(riskProbability * riskConsequence, 2)}
            />
          }
          sx={{ width: '100%' }}
        />
        <LoadingButton
          loading={transactionsApi?.isUpdating}
          type='submit'
          size='large'
          color='primary'
          variant='outlined'
          sx={{ mr: 'auto' }}
          disabled={!formState.isDirty}
        >
          Сохранить
        </LoadingButton>
      </Stack>
    </form>
  );
}

export const RiskAnalysisForm = observer(BaseRiskAnalysisForm);
