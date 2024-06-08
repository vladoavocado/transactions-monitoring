import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';

export type RiskAnalysisFormInputs =
  | 'title'
  | 'riskProbability'
  | 'riskConsequence';

export const useAnalysisFormInputs = () =>
  useMemo<
    {
      id: string;
      name: RiskAnalysisFormInputs;
      type: string;
      label?: string;
    }[]
  >(
    () => [
      {
        id: nanoid(),
        name: 'title',
        type: 'text',
        label: 'Название риска',
      },
      {
        id: nanoid(),
        name: 'riskProbability',
        type: 'number',
        label: 'Вероятность возникновения риска',
      },
      {
        id: nanoid(),
        name: 'riskConsequence',
        type: 'number',
        label: 'Степень последствия возникновения риска',
      },
    ],
    [],
  );

export const useAnalysisFormRules = () =>
  useMemo(
    () =>
      yup.object().shape({
        title: yup.string().required(),
        riskProbability: yup.number().required(),
        riskConsequence: yup.number().required(),
      }),
    [],
  );
