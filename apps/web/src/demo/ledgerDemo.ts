import type { DashboardMetrics, Transaction, TransactionStatus } from '../types';

const seed: Transaction[] = [
  { id: 'txn-1001', reference: 'SET-2026-0819-001', account: 'ACCT-4102', amount: 18425.32, currency: 'CAD', bookedAt: '2026-08-19T13:20:00Z', status: 'Matched' },
  { id: 'txn-1002', reference: 'SET-2026-0819-002', account: 'ACCT-9928', amount: 7820.10, currency: 'CAD', bookedAt: '2026-08-19T13:31:00Z', status: 'Exception', reason: 'Counterparty reference mismatch' },
  { id: 'txn-1003', reference: 'SET-2026-0819-003', account: 'ACCT-4102', amount: 24610.00, currency: 'CAD', bookedAt: '2026-08-19T14:04:00Z', status: 'Matched' },
  { id: 'txn-1004', reference: 'SET-2026-0819-004', account: 'ACCT-7215', amount: 4930.75, currency: 'CAD', bookedAt: '2026-08-19T14:22:00Z', status: 'Pending', reason: 'Awaiting settlement file' },
  { id: 'txn-1005', reference: 'SET-2026-0819-005', account: 'ACCT-3371', amount: 13250.50, currency: 'CAD', bookedAt: '2026-08-19T15:05:00Z', status: 'Matched' },
  { id: 'txn-1006', reference: 'SET-2026-0819-006', account: 'ACCT-5524', amount: 9150.00, currency: 'CAD', bookedAt: '2026-08-19T15:18:00Z', status: 'Exception', reason: 'Amount differs from settlement instruction' },
  { id: 'txn-1007', reference: 'SET-2026-0819-007', account: 'ACCT-7215', amount: 30125.90, currency: 'CAD', bookedAt: '2026-08-19T15:42:00Z', status: 'Matched' },
  { id: 'txn-1008', reference: 'SET-2026-0819-008', account: 'ACCT-8840', amount: 6412.65, currency: 'CAD', bookedAt: '2026-08-19T16:01:00Z', status: 'Matched' }
];

export function createLedgerDemo() {
  let transactions = seed.map((item) => ({ ...item }));

  const metrics = async (): Promise<DashboardMetrics> => {
    const matched = transactions.filter((item) => item.status === 'Matched').length;
    return {
      transactionCount: transactions.length,
      settlementTotal: transactions.reduce((sum, item) => sum + item.amount, 0),
      exceptionCount: transactions.filter((item) => item.status === 'Exception').length,
      reconciliationRate: transactions.length ? (matched / transactions.length) * 100 : 0
    };
  };

  const list = async (status?: TransactionStatus, query?: string): Promise<Transaction[]> => {
    const normalized = query?.trim().toLowerCase();
    return transactions
      .filter((item) => !status || item.status === status)
      .filter((item) => !normalized || `${item.reference} ${item.account}`.toLowerCase().includes(normalized))
      .map((item) => ({ ...item }));
  };

  const reconcile = async (id: string): Promise<Transaction> => {
    const index = transactions.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Transaction not found');
    transactions[index] = { ...transactions[index], status: 'Matched', reason: 'Resolved in portfolio demo' };
    return { ...transactions[index] };
  };

  return { metrics, transactions: list, reconcile };
}
