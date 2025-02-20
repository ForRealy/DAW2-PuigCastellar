import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
  // Add other routes as needed...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
