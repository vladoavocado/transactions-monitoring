import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { RootModel } from 'src/app/models';
import { IChildren, ReactiveApi } from 'src/shared/types';
import IRootApi = ReactiveApi.IRootApi;

interface IProps extends IChildren {
  api: IRootApi;
  store: RootModel;
}

interface IResult extends Omit<IProps, 'children'> {}

const ReactiveContext = createContext({} as IResult);
ReactiveContext.displayName = 'ReactiveProvider';

export const useStore = (): RootModel => {
  const { store } = useContext(ReactiveContext);
  return store;
};

export const useAPI = (): IRootApi => {
  const { api } = useContext(ReactiveContext);

  return api;
};

export const withReactivity = (Component: (props: any) => ReactNode) =>
  function ReactiveProvider(props: IProps) {
    const { children, api, store } = props || {};
    const reactiveProps = useMemo(() => ({ api, store }), [props]);

    return (
      <ReactiveContext.Provider value={reactiveProps}>
        <Component {...props}>{children}</Component>
      </ReactiveContext.Provider>
    );
  };
