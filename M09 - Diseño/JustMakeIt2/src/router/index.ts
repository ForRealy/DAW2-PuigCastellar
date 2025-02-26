import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import SettingsaPage from '@/views/SettingsaPage.vue';
import SplashScreen from '@/views/SplashScreen.vue';
import LobbyPage from '@/views/LobbyPage.vue';
import HostPage from '@/views/HostPage.vue';
import GamePage from '@/views/GamePage.vue';
import PasswordPage from '@/views/PasswordPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: SplashScreen
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsaPage
  }, {
    path: '/lobby',
    name: 'Lobby',
    component: LobbyPage
  },{
    path: '/host',
    name: 'Host',
    component: HostPage
  },{
    path: '/game',
    name: 'Game',
    component: GamePage
  },{
    path: '/recover-password',
    name: 'recover-password',
    component: PasswordPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;