import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  CHATS_PATH,
  TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS,
  TRANSACTIONS_WIZARD_RISK_ANALYSIS,
  TRANSACTIONS_WIZARD_INFO,
  TRANSACTIONS_WIZARD_REPORT,
} from 'src/app/routes';
import { useAPI } from 'src/app/providers';
import { ChatsPage } from 'src/pages/chats-page';
import { AnalysisRiskPage } from './analysis-risk-page';
import { AnalysisCurrentAccountPage } from './analysis-current-account-page';
import { TransactionsList } from './transactions-list';
import { TransactionReportPage } from './transaction-report-page';
import { TransactionInfoPage } from './transaction-info-page';

export function TransactionsPages() {
  const { transactions: transactionsApi, organizations: organizationsApi } =
    useAPI();

  useEffect(() => {
    const getAllRequiredData = async () => {
      await Promise.all([transactionsApi?.fetch(), organizationsApi?.fetch()]);
    };

    getAllRequiredData();
  }, []);

  return (
    <Routes>
      <Route index element={<TransactionsList />} />
      <Route
        path={TRANSACTIONS_WIZARD_INFO}
        element={<TransactionInfoPage />}
      />
      <Route
        path={TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS}
        element={<AnalysisCurrentAccountPage />}
      />
      <Route
        path={TRANSACTIONS_WIZARD_RISK_ANALYSIS}
        element={<AnalysisRiskPage />}
      />
      <Route
        path={TRANSACTIONS_WIZARD_REPORT}
        element={<TransactionReportPage />}
      />
    </Routes>
  );
}
