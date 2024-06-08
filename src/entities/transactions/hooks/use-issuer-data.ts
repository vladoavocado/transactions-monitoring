import { useCallback, useMemo } from 'react';
import { useStore } from 'src/app/providers';
import { Models } from 'src/shared';
import IUser = Models.IUser;
import IOrganization = Models.IOrganization;

const extractIdFromPath = (path?: string): string[] => path?.split('/') ?? [];

type ResultEntity = {
  data: IUser | IOrganization | null;
  type: 'users' | 'organizations' | 'unknown';
};

export function useIssuerData(): (entityPath?: string) => ResultEntity {
  const { users, organizations } = useStore();

  return useCallback(
    (entityPath?: string): ResultEntity => {
      const [type, issuerId] = extractIdFromPath(entityPath);

      switch (type) {
        case 'users':
          return { data: users?.find(issuerId) as IUser, type };
        case 'organizations':
          console.log(issuerId, organizations?.values);
          return { data: organizations?.find(issuerId) as IOrganization, type };
        default:
          return { data: null, type: 'unknown' };
      }
    },
    [users, organizations],
  );
}
