import { GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { DoDisturb, OpenInNew, PriceCheck } from '@mui/icons-material';
import React from 'react';

export const columns: GridColDef<any>[] = [
  {
    field: 'requestNumber',
    headerName: '№ запроса',
    type: 'string',
    align: 'center',
    width: 125,
    sortable: true,
  },
  {
    field: 'issuerName',
    headerName: 'Организация / ФИО',
    type: 'string',
    width: 250,
    sortable: true,
  },
  {
    field: 'inn',
    headerName: 'ИНН',
    type: 'string',
    width: 125,
    sortable: true,
  },
  {
    field: 'checkCode',
    headerName: '№ проверки',
    type: 'string',
    width: 125,
    sortable: true,
  },
  {
    field: 'transferAmount',
    headerName: 'Сумма перевода (руб.)',
    type: 'number',
    width: 200,
    sortable: true,
  },
  {
    field: 'employeeName',
    headerName: 'Сотрудник',
    type: 'string',
    width: 150,
    sortable: true,
  },
  {
    field: 'status',
    headerName: 'Статус',
    type: 'string',
    width: 150,
    sortable: true,
    renderCell: params => {
      const isPassed = params.value > 0;

      return (
        <Chip
          size='small'
          variant='filled'
          color={isPassed ? 'success' : 'error'}
          label={isPassed ? 'Проведено' : 'Отказ'}
        />
      );
    },
  },
  {
    field: 'comment',
    headerName: 'Комментарий',
    type: 'string',
    width: 350,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: true,
    renderCell: params => {
      const { actions } = params.row;
      const { onStatusChange, onOpen } = actions;

      return (
        <Stack flexDirection='row' sx={{ position: 'sticky', right: 0 }}>
          {onStatusChange && (
            <IconButton
              sx={{ height: '1.5em', width: '1.5em' }}
              size='small'
              color='success'
              onClick={() => {
                onStatusChange(true);
              }}
            >
              <PriceCheck />
            </IconButton>
          )}
          {onStatusChange && (
            <IconButton
              sx={{ height: '1.5em', width: '1.5em' }}
              size='small'
              color='error'
              onClick={() => {
                onStatusChange(false);
              }}
            >
              <DoDisturb />
            </IconButton>
          )}
          <IconButton
            size='small'
            sx={{ height: '1.5em', width: '1.5em', ml: 'auto' }}
            color='primary'
            onClick={onOpen}
          >
            <OpenInNew />
          </IconButton>
        </Stack>
      );
    },
  },
];
