import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Models, Nullable } from 'src/shared';
import { CardItemData } from 'src/shared/ui/CardItemData';
import IOrganization = Models.IOrganization;

interface IProps {
  issuer?: IOrganization;
}

interface ProfileItemDataProp {
  title: string;
  value: string;
  fullWidth?: boolean;
}

interface IProfileData {
  [key: string]: ProfileItemDataProp;
}

export function Profile({ issuer }: IProps) {
  const data = useMemo<Nullable<IProfileData>>(() => {
    if (!issuer) {
      return null;
    }

    return {
      type: {
        title: 'Тип клиента',
        value: issuer.type ?? '',
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
      okved: {
        title: 'ОКВЭД',
        value: issuer.okved,
      },
      countryOfRegistration: {
        title: 'Страна регистрации',
        value: issuer.countryOfRegistration,
      },
      branch: {
        title: 'Филиал',
        value: issuer.branch,
        fullWidth: true,
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
      <img
        style={{ width: '100%' }}
        src='https://firebasestorage.googleapis.com/v0/b/bank-transactions-monito-9cc4f.appspot.com/o/company-ltd.png?alt=media&token=e4885196-7e1d-42e2-82a1-bb41b62c81b1'
        alt='Процентные доходы'
      />
    </>
  );
}
