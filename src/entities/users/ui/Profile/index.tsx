import React, { ElementType, ReactNode, useMemo } from 'react';
import dayjs from 'dayjs';
import { Models, Nullable } from 'src/shared';
import { CardItemData } from 'src/shared/ui/CardItemData';
import IUser = Models.IUser;
import Button from '@mui/material/Button';

interface IProps {
  issuer?: IUser;
}

interface ProfileItemDataProp {
  title: string;
  value?: string | ReactNode;
  fullWidth?: boolean;
}

interface ProfileData {
  [key: string]: ProfileItemDataProp;
}

export function Profile({ issuer }: IProps) {
  const data = useMemo<ProfileData | null>(() => {
    if (!issuer) {
      return null;
    }

    return {
      type: {
        title: 'Тип клиента',
        value: issuer.type,
      },
      inn: {
        title: 'ИНН',
        value: issuer.inn ?? '',
      },
      openingDate: {
        title: 'Дата открытия счёта',
        value: dayjs((issuer.accountOpeningDate?.seconds || 0) * 1000).format(
          'DD.MM.YYYY',
        ),
      },
      passportInfo: {
        title: 'Паспортные данные клиента',
        value: issuer.passportInfo ?? '',
      },
      countryOfRegistration: {
        title: 'Должностная позиция',
        value: issuer.jobTitle ?? '',
        fullWidth: true,
      },
      jobLink: {
        title: 'Сайт компании',
        value: issuer.jobLink ? (
          <Button
            variant='outlined'
            component='a'
            target='_blank'
            href={issuer.jobLink ?? ''}
          >
            Открыть Сайт
          </Button>
        ) : null,
      },
    };
  }, [issuer]);

  if (!data) {
    return null;
  }

  return (
    <>
      {Object.values(data).map(({ title, value, fullWidth }) => (
        <CardItemData
          title={title}
          value={value}
          sx={{ width: fullWidth ? '100%' : null }}
        />
      ))}
    </>
  );
}
