<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransactionsStore } from '../stores/transactions';

const store = useTransactionsStore();
onMounted(() => store.load());
</script>

<template>
  <header class="page-header">
    <div>
      <p class="eyebrow">RECONCILIATION</p>
      <h1>Transactions</h1>
      <p>Review matches and resolve exceptions with a recorded audit trail.</p>
    </div>
  </header>
  <section class="panel">
    <div class="toolbar">
      <input v-model="store.query" @keyup.enter="store.load" placeholder="Search reference or account" />
      <select v-model="store.status" @change="store.load">
        <option :value="undefined">All statuses</option>
        <option value="Matched">Matched</option>
        <option value="Exception">Exception</option>
        <option value="Pending">Pending</option>
      </select>
      <button @click="store.load">Refresh</button>
    </div>
    <p v-if="store.error" class="error">{{ store.error }}</p>
    <table>
      <thead><tr><th>Reference</th><th>Account</th><th>Amount</th><th>Status</th><th>Booked</th><th></th></tr></thead>
      <tbody>
        <tr v-for="t in store.items" :key="t.id">
          <td><strong>{{ t.reference }}</strong></td>
          <td>{{ t.account }}</td>
          <td>{{ t.currency }} {{ t.amount.toLocaleString() }}</td>
          <td>{{ t.status }}</td>
          <td>{{ new Date(t.bookedAt).toLocaleDateString() }}</td>
          <td><button v-if="t.status !== 'Matched'" @click="store.reconcile(t.id)">Reconcile</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
