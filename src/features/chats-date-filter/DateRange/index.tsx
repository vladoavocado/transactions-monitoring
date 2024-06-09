import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { Dayjs } from 'dayjs';
import { useStore } from 'src/app/providers';

export function BaseDateRange() {
  const [showFrom, setShowFrom] = useState<Dayjs | null>(null);
  const [showTo, setShowTo] = useState<Dayjs | null>(null);
  const { chats } = useStore();

  const onFromChange = useCallback<(date: Dayjs | null) => void>(value => {
    setShowFrom(value?.startOf('day') ?? null);
  }, []);

  const onToChange = useCallback<(date: Dayjs | null) => void>(value => {
    setShowTo(value?.startOf('day') ?? null);
  }, []);

  const applyVisibleDates = useCallback(() => {
    chats?.setVisibleRange({
      showFrom,
      showTo,
    });
  }, [showFrom, showTo]);

  const resetVisibleDates = useCallback(() => {
    setShowFrom(null);
    setShowTo(null);

    chats?.setVisibleRange({ showFrom: null, showTo: null });
  }, [showFrom, showTo]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack flexDirection='row' gap={2} alignItems='center'>
        <Stack gap={1}>
          <Typography>Дата с</Typography>
          <DatePicker value={showFrom} onChange={onFromChange} />
        </Stack>
        <Stack gap={1}>
          <Typography>Дата до</Typography>
          <DatePicker value={showTo} onChange={onToChange} />
        </Stack>
        <Stack gap={1}>
          <Typography>&nbsp;</Typography>
          <Button size='large' variant='outlined' onClick={applyVisibleDates}>
            Применить
          </Button>
        </Stack>
        <Stack gap={1}>
          <Typography>&nbsp;</Typography>
          <Button
            size='large'
            variant='outlined'
            color='error'
            onClick={resetVisibleDates}
          >
            Сбросить
          </Button>
        </Stack>
        <Stack gap={1} sx={{ ml: 'auto' }}>
          <Typography>&nbsp;</Typography>
          <Button
            variant='outlined'
            size='large'
            onClick={() => {
              window.alert('Этот функционал находится в разработке');
            }}
            color='inherit'
          >
            Создать
          </Button>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}

export const DateRange = observer(BaseDateRange);
