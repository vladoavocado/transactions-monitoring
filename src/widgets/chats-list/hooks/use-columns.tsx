import React, { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { IconButton } from '@mui/material';
import { DoDisturb, OpenInNew, PriceCheck } from '@mui/icons-material';
import dayjs from 'dayjs';

export const useColumns = () =>
  useMemo<GridColDef<any>[]>(
    () => [
      {
        field: 'chatNumber',
        headerName: '№ чата',
        type: 'string',
        align: 'center',
        width: 125,
        sortable: true,
      },
      {
        field: 'title',
        headerName: 'Тема сообщения',
        type: 'string',
        width: 350,
        sortable: true,
      },
      {
        field: 'createdAt',
        headerName: 'Дата создания',
        type: 'string',
        width: 125,
        sortable: true,
        renderCell: params => dayjs(params.value).format('DD.MM.YYYY'),
      },
      {
        field: 'customer',
        headerName: 'Клиент',
        type: 'number',
        width: 200,
        sortable: true,
      },
      {
        field: 'employee',
        headerName: 'ФИО Сотрудника',
        type: 'string',
        width: 150,
        sortable: true,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: true,
        renderCell: params => {
          const { actions } = params.row;
          const { onOpen } = actions;

          return (
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              sx={{ position: 'sticky', right: 0 }}
            >
              <IconButton
                size='small'
                sx={{ height: '1.5em', width: '1.5em', mr: 'auto' }}
                color='primary'
                onClick={onOpen}
              >
                <OpenInNew />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [],
  );
