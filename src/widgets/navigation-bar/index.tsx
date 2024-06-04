import React, { useCallback, useRef, useState, MouseEvent } from 'react';
import { Theme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Fade,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Logotype } from 'src/shared/ui/Logotype';
import { Logout, Person } from '@mui/icons-material';
import { useAPI } from 'src/app/providers';
import { Nullable } from 'src/shared';

interface IProps {}

export function NavigationBar(props: IProps) {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const { auth: authApi } = useAPI();
  const [isVisible, setIsVisible] = useState(false);

  const openContextMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setIsVisible(true);
    setAnchorEl(event.currentTarget);
  }, []);

  const closeContextMenu = useCallback(() => {
    setIsVisible(false);
    setAnchorEl(null);
  }, []);

  const logout = useCallback(async () => {
    await authApi?.logout?.();

    setIsVisible(false);
    setAnchorEl(null);
  }, [authApi]);

  return (
    <Box
      sx={({ palette }: Theme) => ({
        background: palette.common.white,
        height: '48px',
        p: 2,
        px: {
          xs: 2,
          md: 4,
        },
        width: '100%',
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
        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
          sx={{ cursor: 'pointer' }}
          onClick={openContextMenu}
        >
          <Avatar variant='circular' color='grey.400' onClick={openContextMenu}>
            <Person />
          </Avatar>
          <Stack alignItems='flex-start'>
            <Typography variant='body1'>Иванов И. И.</Typography>
            <Typography variant='body2' color='grey.500'>
              Руководитель отдела
            </Typography>
          </Stack>
          <Menu
            sx={{ mt: 0.5 }}
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={isVisible}
            onClose={closeContextMenu}
            onClick={closeContextMenu}
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
      </Stack>
    </Box>
  );
}
