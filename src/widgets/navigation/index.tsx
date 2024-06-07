import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useTheme,
  Typography,
  alpha,
} from '@mui/material';
import { generatePath, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/providers';
import { HOME_PATH } from 'src/app/routes';
import { useNavigationLinks } from './hooks';

export function BaseNavigation() {
  const theme = useTheme();
  const links = useNavigationLinks();
  const { transactions } = useStore();

  return (
    <Box>
      <Drawer
        variant='permanent'
        open
        sx={{
          '& .MuiPaper-root': {
            position: 'static !important',
            height: 'calc(100vh - 80px) !important',
            background: 'transparent !important',
            border: 'none',
          },
        }}
      >
        <List
          sx={{
            p: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: 'column',
          }}
        >
          {links.map(({ title, Icon, to }) => {
            const disabled = to !== HOME_PATH ? !transactions?.active : false;
            const nextUrl =
              to !== HOME_PATH && transactions?.active?.id
                ? generatePath(to, {
                    transactionId: transactions?.active?.id,
                  })
                : to;

            return (
              <ListItem key={title} disablePadding>
                <ListItemButton
                  component={NavLink}
                  end
                  to={nextUrl}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: 2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    mx: {
                      xs: 1,
                      xl: 3,
                    },
                    pointerEvents: disabled ? 'none' : 'all',
                    opacity: disabled ? '0.3' : '1',
                    '&.active': {
                      background: alpha(theme.palette.common.black, 1),
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main,
                      ),
                    },
                  }}
                >
                  <Icon />
                  <ListItemText
                    primary={
                      <Typography
                        variant='body2'
                        sx={{
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}

export const Navigation = observer(BaseNavigation);
