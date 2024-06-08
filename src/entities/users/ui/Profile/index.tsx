import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Models, Nullable } from 'src/shared';
import { ProfileItemData } from 'src/shared/ui/ProfileItemData';
import IUser = Models.IUser;

interface IProps {
  issuer?: IUser;
}

interface ProfileItemDataProp {
  title: string;
  value?: string;
  externalLink?: string;
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
        externalLink: issuer.jobLink ?? '',
      },
    };
  }, [issuer]);

  if (!data) {
    return null;
  }

  return (
    <>
      {Object.values(data).map(({ title, value, externalLink, fullWidth }) => (
        <ProfileItemData
          title={title}
          text={value}
          externalLink={externalLink}
          sx={{ width: fullWidth ? '100%' : null }}
        />
      ))}
    </>
  );
}
