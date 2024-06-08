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
      inputProps?: Record<string, any>;
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
        inputProps: {
          min: 0,
          max: 1,
          step: 0.1,
        },
      },
      {
        id: nanoid(),
        name: 'riskConsequence',
        type: 'number',
        label: 'Степень последствия возникновения риска',
        inputProps: {
          min: 0,
          max: 10,
          step: 1,
        },
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
