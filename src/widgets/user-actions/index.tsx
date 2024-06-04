import React from 'react';
import { IChildren } from 'src/shared/types';

interface IProps extends IChildren {}

export function UserActions({ children }: IProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
