import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useStore } from 'src/app/providers';
import * as yup from 'yup';
import { useIssuerData } from './use-issuer-data';

export type AnalysisFormInputs =
  | 'personInfoValid'
  | 'originDocsValid'
  | 'financialOpsMatch'
  | 'suspiciousCounterparties'
  | 'comment';

export const useAnalysisFormInputs = () => {
  const { transactions } = useStore();
  const getIssuer = useIssuerData();
  const { active } = transactions || {};

  const texts = useMemo(() => {
    const { type } = getIssuer(active?.issuer ?? '');
    switch (type) {
      case 'organizations':
        return {
          personInfoValid:
            'Информация о юридическом лице соответствует заявленной?',
          originDocsValid: 'Документы о происхождении денежных средств верны?',
          financialOpsMatch:
            'Финансовые операции на счете клиента соответствуют с его заключенным договором?',
          suspiciousCounterparties:
            'Были замечены подозрительные контрагенты, которые связаны с транзакцией?',
          transactionComment: 'Комментарий о транзакции',
        };
      case 'users':
        return {
          personInfoValid:
            'Информация о физическом лице соответствует заявленной?\n',
          originDocsValid:
            'Документы о происхождении денежных средств верны?\n',
          financialOpsMatch:
            'Финансовые операции на счете клиента соответствуют его выписке о происхождении средств?',
          suspiciousCounterparties:
            'Были замечены подозрительные контрагенты, которые связаны с транзакцией?',
          transactionComment: 'Комментарий о транзакции',
        };
      default:
        return null;
    }
  }, [transactions?.active]);

  return useMemo<
    {
      id: string;
      name: AnalysisFormInputs;
      type: string;
      label?: string;
    }[]
  >(
    () => [
      {
        id: nanoid(),
        name: 'personInfoValid',
        type: 'checkbox',
        label: texts?.personInfoValid,
      },
      {
        id: nanoid(),
        name: 'originDocsValid',
        type: 'checkbox',
        label: texts?.originDocsValid,
      },
      {
        id: nanoid(),
        name: 'financialOpsMatch',
        type: 'checkbox',
        label: texts?.financialOpsMatch,
      },
      {
        id: nanoid(),
        name: 'suspiciousCounterparties',
        type: 'checkbox',
        label: texts?.suspiciousCounterparties,
      },
      {
        id: nanoid(),
        name: 'comment',
        type: 'textarea',
        label: texts?.transactionComment,
      },
    ],
    [],
  );
};

export const useAnalysisFormRules = () =>
  useMemo(
    () =>
      yup.object().shape({
        personInfoValid: yup.boolean().optional(),
        originDocsValid: yup.boolean().optional(),
        financialOpsMatch: yup.boolean().optional(),
        suspiciousCounterparties: yup.boolean().optional(),
        comment: yup.string().optional(),
      }),
    [],
  );
