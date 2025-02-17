import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';

// Importa tus componentes/páginas
import HomePage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';

/* Core CSS de Ionic */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Utilidades CSS opcionales */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Modo oscuro */
import '@ionic/vue/css/palettes/dark.system.css';

/* Variables de tema */
import './theme/variables.css';

// Configura el router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
  ],
});

// Crea la aplicación
const app = createApp(App)
  .use(IonicVue, { router })  // Pasa el router a IonicVue
  .use(router);

// Espera a que el router esté listo
router.isReady().then(() => {
  app.mount('#app');
});