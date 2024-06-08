import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useByIssuerRows } from 'src/entities/transactions/hooks/use-by-issuer-rows';

export function BaseListByIssuer() {
  const columns = useMemo<GridColDef<any>[]>(
    () => [
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
        width: 350,
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
        field: 'receiverName',
        headerName: 'Получатель',
        type: 'string',
        width: 500,
        sortable: true,
      },
    ],
    [],
  );

  const rows = useByIssuerRows();

  if (!rows) {
    return null;
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={30}
      disableColumnSorting={false}
      hideFooterPagination
      disableRowSelectionOnClick
      disableColumnResize
      sortModel={[
        {
          field: 'requestNumber', // The field to sort by
          sort: 'asc', // Sort direction: 'asc' for ascending, 'desc' for descending
        },
      ]}
    />
  );
}

export const ListByIssuer = observer(BaseListByIssuer);
