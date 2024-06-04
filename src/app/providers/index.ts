import compose from 'lodash/fp/compose';
import { withTheme } from './with-theme';
import { withReactivity, useStore, useAPI } from './with-reactivity';
import { withModal } from './with-modal';
import { withToaster } from './with-toaster';

export const withProviders = compose(
  withReactivity,
  withTheme,
  withToaster,
  withModal,
);

export { useStore, useAPI };
