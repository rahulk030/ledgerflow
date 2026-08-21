import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import DashboardView from './views/DashboardView.vue';
import TransactionsView from './views/TransactionsView.vue';
import './styles.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashboardView },
    { path: '/transactions', component: TransactionsView }
  ]
});

createApp(App).use(createPinia()).use(router).mount('#app');
