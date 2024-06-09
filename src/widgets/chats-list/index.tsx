import React from 'react';
import { Card, CardContent, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAPI } from 'src/app/providers';
import { DataGrid } from '@mui/x-data-grid';
import { useChatRows, useChatColumns } from 'src/widgets/chats-list/hooks';
import { ChatsDateFilter } from 'src/features/chats-date-filter';
import { Stack } from '@mui/system';

export function BaseChatsList() {
  const { messages: messagesApi, chats: chatsApi } = useAPI();
  const rows = useChatRows();
  const columns = useChatColumns();

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      <CardContent
        sx={{
          minHeight: '5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {messagesApi?.isFetching || chatsApi?.isFetching ? (
          <CircularProgress size={48} color='primary' thickness={3} />
        ) : (
          <Stack flexDirection='column' gap={2}>
            <ChatsDateFilter />
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
                  field: 'createdAt', // The field to sort by
                  sort: 'asc', // Sort direction: 'asc' for ascending, 'desc' for descending
                },
              ]}
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export const ChatsList = observer(BaseChatsList);
