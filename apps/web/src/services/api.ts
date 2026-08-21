import type { DashboardMetrics, Transaction, TransactionStatus } from '../types';
import { createLedgerDemo } from '../demo/ledgerDemo';

const demo = createLedgerDemo();
const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!response.ok) {
    const problem = await response.json().catch(() => ({ title: 'Request failed' }));
    throw new Error(problem.detail ?? problem.title ?? `HTTP ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export const api = demoMode
  ? demo
  : {
      metrics: () => request<DashboardMetrics>('/api/dashboard/metrics'),
      transactions: (status?: TransactionStatus, query?: string) => {
        const params = new URLSearchParams();
        if (status) params.set('status', status);
        if (query) params.set('query', query);
        return request<Transaction[]>(`/api/transactions?${params}`);
      },
      reconcile: (id: string) => request<Transaction>(`/api/transactions/${id}/reconcile`, { method: 'POST' })
    };
