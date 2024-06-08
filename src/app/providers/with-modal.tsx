import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  ReactElement,
  useCallback,
} from 'react';
import { IChildren, Nullable } from 'src/shared/types';
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material';
import { logger } from 'src/shared/utils';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { isFunction } from 'lodash';
import toast from 'react-hot-toast';

export interface IModalActionsProps {
  onSubmit?: () => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export interface IModalChildrenProps {
  isVisible: boolean;
  onClose: () => void;
  loading?: boolean;
}

interface IModalContent {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: Nullable<ReactElement>;
  children?: Nullable<ReactElement<IModalChildrenProps>>;
  actions?: Nullable<ReactElement<IModalActionsProps>>;
  onSubmit?: (...args: any[]) => Promise<void>;
}

interface IModalOptions extends Omit<DialogProps, 'open'> {
  onSubmit?: () => Promise<void>;
}

interface IModalResult {
  isVisible: boolean;

  setOptions(options: IModalOptions): void;

  setContent(content: IModalContent): void;

  setBlur(flag?: boolean): void;

  onShow(): void;

  onClose(): void;
}

const COMPONENT_OUTSIDE_PROVIDER_CALL =
  'I hope you know what you are doing. Provider is not initialized yet. Please, be sure your component is "inside" <ModalProvider> component;';

const ModalContext = createContext({
  setOptions(options: IModalOptions) {
    logger.warn(
      `${COMPONENT_OUTSIDE_PROVIDER_CALL} Passed arguments: ${options.toString()}`,
    );
  },
  setContent(content: IModalContent) {
    logger.warn(
      `${COMPONENT_OUTSIDE_PROVIDER_CALL} Passed arguments: ${content.toString()}`,
    );
  },
  setBlur(flag?: boolean) {
    logger.warn(
      `${COMPONENT_OUTSIDE_PROVIDER_CALL} Passed arguments: ${flag?.toString()}`,
    );
  },
  onShow() {
    logger.warn(COMPONENT_OUTSIDE_PROVIDER_CALL);
  },
  onClose() {
    logger.warn(COMPONENT_OUTSIDE_PROVIDER_CALL);
  },
} as IModalResult);

ModalContext.displayName = 'ModalProvider';

export const useModal = <TSubmitArgs extends any>(options?: IModalOptions) => {
  const { setContent, setOptions, onClose, onShow, isVisible, setBlur } =
    useContext(ModalContext);
  const onShowContent = useCallback(
    ({ title, subtitle, icon, children, actions, onSubmit }: IModalContent) =>
      (...args: TSubmitArgs[]) => {
        if (options) {
          setOptions(options);
        }

        setContent({
          icon,
          title,
          actions,
          children,
          subtitle,
          onSubmit: async () => {
            if (typeof onSubmit === 'function') {
              onSubmit(...args);
            }
          },
        });
        onShow();
      },
    [],
  );

  return {
    isVisible,
    onShow: onShowContent,
    onClose,
    setBlur,
  };
};

function DialogDefaultButtons({
  onCancel,
  onSubmit,
  loading,
}: IModalActionsProps) {
  return (
    <>
      <Button
        sx={{ flex: 1 }}
        fullWidth
        variant='outlined'
        size='large'
        onClick={onCancel}
      >
        Отменить
      </Button>
      <LoadingButton
        sx={{ flex: 1, margin: 0 }}
        fullWidth
        size='large'
        variant='contained'
        color='primary'
        loading={loading}
        onClick={onSubmit}
      >
        Подтвердить
      </LoadingButton>
    </>
  );
}

export const withModal = (Component: (props: any) => ReactNode) =>
  function ModalProvider(props: IChildren): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [blur, setBlur] = useState(false);
    const [options, setOptions] = useState<IModalOptions>({} as IModalOptions);
    const [content, setContent] = useState<IModalContent>();
    const [isVisible, setIsVisible] = useState(false);
    const createVisibilityToggler = (flag: boolean) => () => setIsVisible(flag);
    const onShow = createVisibilityToggler(true);
    const onClose = createVisibilityToggler(false);
    const onSubmit = async () => {
      if (!content || !isFunction(content.onSubmit)) {
        return;
      }

      try {
        setLoading(true);
        await content.onSubmit();
      } catch (err: any) {
        toast.error(err.message, { duration: 2000 });
      } finally {
        setLoading(false);
      }
    };

    const actionProps = useMemo(
      () => ({
        onCancel: onClose,
        onSubmit,
        loading,
      }),
      [],
    );

    const value = useMemo(
      () => ({
        isVisible,
        setBlur: (flag: boolean) => setBlur(flag),
        setContent,
        setOptions,
        onShow,
        onClose,
      }),
      [content, blur, isVisible],
    );

    return (
      <ModalContext.Provider value={value}>
        <Component {...props} />
        <Dialog
          maxWidth='xs'
          fullWidth
          {...options}
          open={isVisible}
          onClose={blur ? undefined : onClose}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 4,
            },
          }}
        >
          <Stack sx={{ p: 4 }} gap={4}>
            <Stack gap={4}>
              {content?.icon && (
                <Stack alignItems='flex-start' sx={{ fontSize: '1.5em' }}>
                  {content.icon}
                </Stack>
              )}
              <Stack gap={2}>
                <Stack gap={1}>
                  {content?.title && (
                    <DialogTitle
                      variant='h5'
                      fontWeight='bold'
                      sx={{ m: 0, p: 0 }}
                    >
                      {content.title}
                    </DialogTitle>
                  )}
                  {content?.subtitle && (
                    <Typography variant='body1' sx={{ opacity: 0.8 }}>
                      {content.subtitle}
                    </Typography>
                  )}
                </Stack>
                <DialogContent sx={{ m: 0, p: 0 }}>
                  {content?.children &&
                    React.cloneElement(content.children, {
                      isVisible,
                      onClose,
                      loading,
                    })}
                </DialogContent>
              </Stack>
            </Stack>
            <DialogActions
              disableSpacing
              sx={({ breakpoints }) => ({
                p: 0,
                flexDirection: 'column',
                gap: 4,
                [breakpoints.up('md')]: {
                  flexDirection: 'row',
                },
              })}
            >
              {content?.actions ? (
                React.cloneElement(content?.actions, actionProps)
              ) : (
                <DialogDefaultButtons {...actionProps} />
              )}
            </DialogActions>
          </Stack>
        </Dialog>
      </ModalContext.Provider>
    );
  };
