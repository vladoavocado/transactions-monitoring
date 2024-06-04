import { IChildren } from 'src/shared/types';

import { withProviders } from './providers';

interface IProps extends IChildren {}

export function PureApp({ children }: IProps) {
  return children;
}

export const App = withProviders(PureApp);
