import React, { useCallback, useEffect } from 'react';
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
import { precisionRound } from 'src/shared/utils/precision-round';
import IUser = Models.IUser;
import IOrganization = Models.IOrganization;

interface IProps {
  issuer?: IUser | IOrganization;
  readonly?: boolean;
}

export function BaseRiskAnalysisForm({ issuer, readonly }: IProps) {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();
  const { active } = transactions || {};
  const inputs = useAnalysisFormInputs();
  const rules = useAnalysisFormRules();

  const { control, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(rules),
    defaultValues: {
      riskConsequence: active?.risks?.riskConsequence || 0,
      riskProbability: active?.risks?.riskProbability || 0,
      title: active?.risks?.title || '',
    },
  });

  const riskProbability = watch('riskProbability');
  const riskConsequence = watch('riskConsequence');

  const onSubmit = useCallback(
    async (data: any) => {
      const {
        title,
        riskConsequence: dataRiskConsequence,
        riskProbability: dataRiskProbability,
      } = data;

      try {
        toast.remove();

        await transactionsApi?.createOrUpdate(
          {
            risks: {
              title,
              risk_consequence: dataRiskConsequence,
              risk_probability: dataRiskProbability,
            },
          },
          active?.id,
        );

        toast.success('Сохранено!', { duration: 5000 });
      } catch (err) {
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
        {Object.values(inputs).map(({ name, type, label, inputProps }) => (
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
                    disabled={readonly}
                    value={field.value ?? active?.risks?.[name]}
                    type={type}
                    inputProps={inputProps || undefined}
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
        {!readonly && (
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
        )}
      </Stack>
    </form>
  );
}

export const RiskAnalysisForm = observer(BaseRiskAnalysisForm);
