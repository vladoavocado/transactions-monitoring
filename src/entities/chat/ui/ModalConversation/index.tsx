import React from 'react';
import { Stack } from '@mui/system';
import { Chip, InputAdornment, Typography } from '@mui/material';
import { useAPI, useStore } from 'src/app/providers';
import { useIssuerData } from 'src/entities/transactions/hooks';
import { Models } from 'src/shared';
import { observer } from 'mobx-react-lite';
import { FormInput } from 'src/shared/ui/FormInput';
import { Timestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { logger } from 'src/shared/utils';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { Send } from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import IUser = Models.IUser;
import IOrganization = Models.IOrganization;

const rules = yup.object().shape({
  message: yup
    .string()
    .min(1, 'Минимум 1 символ')
    .max(4096, 'Максимум 4096 символов')
    .required(),
});

export function BaseModalConversation() {
  const { chats, messages } = useStore();
  const { messages: messagesApi } = useAPI();
  const { active } = chats || {};
  const getIssuerData = useIssuerData();
  const { data: customer, type } = getIssuerData(active?.customer);
  const { data: employee } = getIssuerData(active?.employee);
  const isCustomerAnOrganization = type === 'organizations';
  const customerName = isCustomerAnOrganization
    ? (customer as IOrganization)?.name
    : (customer as IUser).fullName;
  const { visible } = messages || {};
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(rules),
  });

  const onSubmit = async ({ message }: any) => {
    try {
      reset();

      await messagesApi?.createOrUpdate(
        {
          author: `users/${employee?.id}`,
          chat_id: active?.id,
          text: message,
          created_at: Timestamp.fromMillis(Date.now()),
        },
        nanoid(),
      );
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  if (!active) {
    return (
      <Typography color='error'>Чат с клиентом временно недоступен.</Typography>
    );
  }

  return (
    <Stack gap={2}>
      <Stack gap={0.5}>
        <Typography variant='body1'>
          Тема:{' '}
          <Typography component='span' fontWeight='bold' variant='body1'>
            {active?.title}
          </Typography>
        </Typography>
        <Typography variant='body1'>
          Кому:{' '}
          <Typography component='span' fontWeight='bold' variant='body1'>
            {customerName}
          </Typography>
        </Typography>
      </Stack>
      <Stack>
        <Stack
          sx={theme => ({
            border: `1px solid ${theme.palette.grey['200']}`,
            borderRadius: 2,
            borderBottom: 'none',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            p: 3,
            gap: 2,
          })}
        >
          {Array.isArray(visible) &&
            visible
              .sort((a, b) =>
                dayjs(a.createdAt.seconds * 1000).isAfter(
                  dayjs(b.createdAt.seconds * 1000),
                )
                  ? 1
                  : -1,
              )
              .map(message => {
                const isAuthorEmployee =
                  message.author === `users/${employee?.id}`;

                return (
                  <Chip
                    key={message.id}
                    variant='filled'
                    color={isAuthorEmployee ? 'primary' : 'default'}
                    sx={{
                      py: 1,
                      px: 2,
                      justifyContent: 'flex-start',
                      ml: isAuthorEmployee ? 'auto' : '0',
                      mr: !isAuthorEmployee ? 'auto' : '0',

                      '& > span': {
                        p: 0,
                      },
                    }}
                    label={message.text}
                  />
                );
              })}
        </Stack>
        <FormInput
          placeholder='Ваше сообщение тут...'
          name='message'
          type='text'
          required
          fullWidth
          control={control}
          sx={theme => ({
            m: 0,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: `1px solid ${theme.palette.grey['200']}`,
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                m: 0,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.grey['400'], // Border color on hover
              },
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Send
                  onClick={handleSubmit(onSubmit)}
                  sx={{ cursor: 'pointer' }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}

export const ModalConversation = observer(BaseModalConversation);
