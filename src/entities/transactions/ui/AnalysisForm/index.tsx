import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Models } from 'src/shared';
import { Chip, FormControlLabel, Stack, TextField } from '@mui/material';
import {
  AnalysisFormInputs,
  useAnalysisFormInputs,
  useAnalysisFormRules,
} from 'src/entities/transactions/hooks/use-analysis-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { CardItemData } from 'src/shared/ui/CardItemData';
import { ToggleBox } from 'src/shared/ui/ToggleBox';
import Button from '@mui/material/Button';
import { AttachFile, FileUpload } from '@mui/icons-material';
import { HiddenInput } from 'src/shared/ui/HiddenInput';
import IOrganization = Models.IOrganization;
import IUser = Models.IUser;
import { LoadingButton } from '@mui/lab';
import { useAPI, useStore } from 'src/app/providers';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';

interface IProps {
  issuer?: IUser | IOrganization;
  readonly?: boolean;
}

export function BaseAnalysisForm({ readonly, issuer }: IProps) {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();
  const { active } = transactions || {};
  const inputs = useAnalysisFormInputs();
  const rules = useAnalysisFormRules();

  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [files, setFiles] = useState<{ [key in AnalysisFormInputs]: string }>(
    inputs.reduce(
      (acc, cur) =>
        Object.assign(acc, {
          [cur.name]: (transactions?.active?.files as any)[cur.name],
        }),
      {} as { [key in AnalysisFormInputs]: string },
    ),
  );

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(rules),
    defaultValues: {
      ...(active?.checks ?? {
        personInfoValid: false,
        originDocsValid: false,
        financialOpsMatch: false,
        suspiciousCounterparties: false,
      }),
      comment: active?.comment ?? '',
    },
  });

  useEffect(() => {
    reset({
      ...(active?.checks ?? {
        personInfoValid: false,
        originDocsValid: false,
        financialOpsMatch: false,
        suspiciousCounterparties: false,
      }),
      comment: active?.comment ?? '',
    });
  }, [active?.checks, active?.comment]);

  const onAddFile = (name: string, fileName: string) => {
    setFiles(prevState => ({ ...prevState, [name]: fileName }));

    if (!isTouched) {
      setIsTouched(true);
    }
  };

  const onSubmit = useCallback(
    async (data: any) => {
      const { comment, ...checks } = data;

      try {
        setIsLoading(true);
        await transactionsApi?.createOrUpdate(
          {
            comment,
            checks: {
              person_info_valid: checks.personInfoValid ?? false,
              origin_docs_valid: checks.originDocsValid ?? false,
              financial_ops_match: checks.financialOpsMatch ?? false,
              suspicious_counterparties:
                checks.suspiciousCounterparties ?? false,
            },
            files: {
              person_info_valid: files.personInfoValid ?? '',
              origin_docs_valid: files.originDocsValid ?? '',
              financial_ops_match: files.financialOpsMatch ?? '',
              suspicious_counterparties: files.suspiciousCounterparties ?? '',
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
      } finally {
        setIsLoading(false);
      }
    },
    [files, active?.id],
  );

  if (!issuer) {
    return null;
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack
        alignItems='flexStart'
        justifyContent='center'
        flexDirection='column'
        gap={5}
      >
        {Object.values(inputs).map(({ name, type, label }) => {
          switch (type) {
            case 'checkbox':
              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <CardItemData
                      title={label ?? ''}
                      value={
                        <Stack
                          alignItems='center'
                          gap={4}
                          sx={{
                            alignItems: { xs: 'flex-start', lg: 'center' },
                            flexDirection: { xs: 'column', lg: 'row' },
                          }}
                        >
                          <ToggleBox readonly={readonly} field={field} />
                          <Stack flexDirection='row' gap={2}>
                            {!readonly && (
                              <Button
                                size='small'
                                component='label'
                                role={undefined}
                                tabIndex={-1}
                                variant='outlined'
                                startIcon={<FileUpload />}
                              >
                                Прикрепить документ
                                <HiddenInput
                                  type='file'
                                  data-name={name}
                                  onChange={e => {
                                    const file = e?.target?.files?.[0];

                                    if (file) {
                                      onAddFile(name, file.name);
                                    }
                                  }}
                                />
                              </Button>
                            )}
                            {files[name] && (
                              <Chip
                                label={files[name]}
                                sx={{
                                  borderRadius: 2,
                                  p: 0.5,
                                  maxWidth: '20em',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                                icon={<AttachFile sx={{ fontSize: '1.2em' }} />}
                              />
                            )}
                          </Stack>
                        </Stack>
                      }
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              );
            case 'textarea':
              return (
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
                          fullWidth
                          multiline
                          rows={4}
                        />
                      }
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              );
            default:
              return null;
          }
        })}
        {!readonly && (
          <LoadingButton
            loading={isLoading}
            type='submit'
            size='large'
            color='primary'
            variant='outlined'
            sx={{ mr: 'auto' }}
            disabled={!isTouched && !formState.isDirty}
          >
            Сохранить
          </LoadingButton>
        )}
      </Stack>
    </form>
  );
}

export const AnalysisForm = observer(BaseAnalysisForm);
