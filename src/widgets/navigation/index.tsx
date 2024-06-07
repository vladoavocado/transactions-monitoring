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
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigationLinks } from './hooks';

export function Navigation() {
  const theme = useTheme();
  const links = useNavigationLinks();

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
          },
        }}
      >
        <List
          sx={{
            mt: 5,
            p: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: 'column',
          }}
        >
          {links.map(({ title, Icon, to }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                component={NavLink}
                end
                to={to}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: '1em',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  mx: {
                    xs: 1,
                    xl: 3,
                  },
                  '&.active': {
                    background: theme.palette.primary.main,
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
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
