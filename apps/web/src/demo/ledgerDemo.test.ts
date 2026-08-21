import { describe, expect, it } from 'vitest';
import { createLedgerDemo } from './ledgerDemo';

describe('LedgerFlow portfolio demo', () => {
  it('filters transactions and recalculates metrics after reconciliation', async () => {
    const demo = createLedgerDemo();

    const exceptions = await demo.transactions('Exception');
    expect(exceptions.length).toBeGreaterThan(0);

    const target = exceptions[0];
    const before = await demo.metrics();
    const updated = await demo.reconcile(target.id);
    const after = await demo.metrics();

    expect(updated.status).toBe('Matched');
    expect(after.exceptionCount).toBe(before.exceptionCount - 1);
    expect(after.reconciliationRate).toBeGreaterThan(before.reconciliationRate);
  });

  it('supports recruiter-friendly search by reference or account', async () => {
    const demo = createLedgerDemo();
    const results = await demo.transactions(undefined, 'ACCT-4102');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => `${item.reference} ${item.account}`.includes('ACCT-4102'))).toBe(true);
  });
});
