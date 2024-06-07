import { useMemo } from 'react';
import {
  Calculate,
  ChatBubble,
  FolderShared,
  Info,
  List as ListIcon,
  TextSnippet,
} from '@mui/icons-material';
import {
  HOME_PATH,
  TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS,
  TRANSACTIONS_WIZARD_CHAT,
  TRANSACTIONS_WIZARD_INFO,
  TRANSACTIONS_WIZARD_REPORT,
  TRANSACTIONS_WIZARD_RISK_ANALYSIS,
} from 'src/app/routes';
import { generatePath } from 'react-router-dom';

export const useNavigationLinks = () =>
  useMemo(
    () => [
      {
        title: 'Список транзакций',
        Icon: ListIcon,
        to: HOME_PATH,
      },
      {
        title: 'Информация о транзакции',
        Icon: Info,
        to: generatePath(`${HOME_PATH}/${TRANSACTIONS_WIZARD_INFO}`, {
          transactionId: '12345678',
        }),
      },
      {
        title: 'Анализ текущего счёта клиента',
        Icon: FolderShared,
        to: generatePath(
          `${HOME_PATH}/${TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS}`,
          {
            transactionId: '12345678',
          },
        ),
      },
      {
        title: 'Риск анализ',
        Icon: Calculate,
        to: generatePath(`${HOME_PATH}/${TRANSACTIONS_WIZARD_RISK_ANALYSIS}`, {
          transactionId: '12345678',
        }),
      },
      {
        title: 'Отчётность по транзакциям',
        Icon: TextSnippet,
        to: generatePath(`${HOME_PATH}/${TRANSACTIONS_WIZARD_REPORT}`, {
          transactionId: '12345678',
        }),
      },
      {
        title: 'Связь с клиентом',
        Icon: ChatBubble,
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_CHAT}`,
      },
    ],
    [],
  );
