import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ChatsList } from 'src/widgets/chats-list';
import { useAPI } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/lab';

interface IProps {
  readonly?: boolean;
  title?: string;
}

export function BaseChats({ readonly, title }: IProps) {
  const { messages: messagesApi, chats: chatsApi } = useAPI();

  useEffect(() => {
    const getChatsAndMessages = async () => {
      await Promise.all([messagesApi?.fetch(), chatsApi?.fetch()]);
    };

    getChatsAndMessages();
  }, []);

  return (
    <Stack
      sx={{
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateRows: 'repeat(2, min-content)',
        gridTemplateColumns: '1fr',
        maxWidth: '70em',
        justifyContent: 'stretch',
        gap: 2.5,
      }}
    >
      <Stack gap={1}>
        {messagesApi?.isFetching || chatsApi?.isFetching ? (
          <Skeleton height='5.5em' width='70em' />
        ) : (
          <Typography fontWeight='bold' variant='h4'>
            {title || `Связь с клиентом`}
          </Typography>
        )}
      </Stack>

      <ChatsList />
    </Stack>
  );
}

export const ChatsPage = observer(BaseChats);
