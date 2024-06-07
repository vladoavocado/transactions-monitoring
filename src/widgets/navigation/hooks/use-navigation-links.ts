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
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_INFO}`,
      },
      {
        title: 'Анализ текущего счёта клиента',
        Icon: FolderShared,
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS}`,
      },
      {
        title: 'Риск анализ',
        Icon: Calculate,
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_RISK_ANALYSIS}`,
      },
      {
        title: 'Отчётность по транзакциям',
        Icon: TextSnippet,
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_REPORT}`,
      },
      {
        title: 'Связь с клиентом',
        Icon: ChatBubble,
        to: `${HOME_PATH}/${TRANSACTIONS_WIZARD_CHAT}`,
      },
    ],
    [],
  );
