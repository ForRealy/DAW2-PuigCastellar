import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';  // Añadido
import { IonicVue } from '@ionic/vue';

// Importa tus componentes/páginas
import HomePage from './views/HomePage.vue';  // Asegúrate de tener esta ruta

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

// Configuración del Router (Añadido)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/',
      component: HomePage  // Tu página principal
    },
    { 
      path: '/login',
      component: () => import('./views/LoginPage.vue')  // Carga diferida
    },
    { 
      path: '/register',
      component: () => import('./views/RegisterPage.vue')  // Carga diferida
    }
  ]
});

const app = createApp(App)
  .use(IonicVue)
  .use(router);  // Router integrado

// Espera a que el router esté listo para hidratación
router.isReady().then(() => {
  app.mount('#app');
});