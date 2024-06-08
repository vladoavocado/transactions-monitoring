import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Models, Nullable } from 'src/shared';
import IOrganization = Models.IOrganization;
import { ProfileItemData } from 'src/shared/ui/ProfileItemData';

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
        <ProfileItemData
          title={title}
          text={value}
          sx={{ width: fullWidth ? '100%' : null }}
        />
      ))}
    </>
  );
}
