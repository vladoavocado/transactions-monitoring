import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  TRANSACTIONS_WIZARD_CHAT,
  TRANSACTIONS_WIZARD_ACCOUNT_ANALYSIS,
  TRANSACTIONS_WIZARD_RISK_ANALYSIS,
  TRANSACTIONS_WIZARD_INFO,
  TRANSACTIONS_WIZARD_REPORT,
} from 'src/app/routes';
import { ChatWithClientPage } from 'src/pages/chat-with-client-page';
import { AnalysisRiskPage } from './analysis-risk-page';
import { AnalysisCurrentAccountPage } from './analysis-current-account-page';
import { TransactionsList } from './transactions-list';
import { TransactionsReportPage } from './transactions-report-page';
import { TransactionInfoPage } from './transaction-info-page';

export function TransactionsPages() {
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
        element={<TransactionsReportPage />}
      />
      <Route path={TRANSACTIONS_WIZARD_CHAT} element={<ChatWithClientPage />} />
    </Routes>
  );
}
