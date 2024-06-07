import React, { useCallback, useState, MouseEvent } from 'react';
import { Theme } from '@mui/material/styles';
import {
  Box,
  Fade,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Logotype } from 'src/shared/ui/Logotype';
import { Logout } from '@mui/icons-material';
import { useAPI } from 'src/app/providers';
import { Nullable } from 'src/shared';
import { AccountProfileBadge } from 'src/entities/account/ui/AccountProfileBadge';

export function TopBar() {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const isVisible = Boolean(anchorEl);
  const { auth: authApi } = useAPI();

  const openContextMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeContextMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const logout = useCallback(async () => {
    await authApi?.logout?.();
    setAnchorEl(null);
  }, [authApi]);

  return (
    <Box
      sx={({ palette }: Theme) => ({
        background: palette.common.white,
        height: '48px',
        borderRadius: 4,
        p: 2,
        px: {
          xs: 2,
          md: 4,
        },
      })}
    >
      <Stack alignItems='center' direction='row'>
        <Logotype variant='h4' sx={{ mr: 'auto' }} />
        <Typography
          variant='body1'
          sx={{
            alignSelf: 'center',
            mr: 'auto',
            textTransform: 'capitalize',
            display: { md: 'inline', xs: 'none' },
          }}
        >
          Финансовый мониторинг банковских операций
        </Typography>
        <AccountProfileBadge onClick={openContextMenu} />
        <Menu
          sx={{ mt: 0.5 }}
          id='fade-menu'
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          open={isVisible}
          anchorEl={anchorEl}
          onClose={closeContextMenu}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}
