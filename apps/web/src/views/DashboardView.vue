<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MetricCard from '../components/MetricCard.vue';
import { api } from '../services/api';
import type { DashboardMetrics } from '../types';

const metrics = ref<DashboardMetrics>({
  transactionCount: 0,
  settlementTotal: 0,
  exceptionCount: 0,
  reconciliationRate: 0,
});

onMounted(async () => {
  try {
    metrics.value = await api.metrics();
  } catch {
    // Keep the dashboard shell available while the API is unavailable.
  }
});
</script>

<template>
  <header class="page-header">
    <div>
      <p class="eyebrow">FINANCIAL OPERATIONS</p>
      <h1>Settlement overview</h1>
      <p>Monitor reconciliation health and exceptions that need attention.</p>
    </div>
  </header>
  <section class="metrics">
    <MetricCard label="Transactions" :value="metrics.transactionCount.toLocaleString()" hint="current processing window" />
    <MetricCard label="Settlement value" :value="`$${metrics.settlementTotal.toLocaleString()}`" hint="CAD equivalent" />
    <MetricCard label="Exceptions" :value="String(metrics.exceptionCount)" hint="requires review" />
    <MetricCard label="Reconciliation" :value="`${metrics.reconciliationRate.toFixed(1)}%`" hint="automatically matched" />
  </section>
  <section class="panel">
    <h2>Operational status</h2>
    <p>API, database and reconciliation services are represented as independently monitored dependencies.</p>
  </section>
</template>
