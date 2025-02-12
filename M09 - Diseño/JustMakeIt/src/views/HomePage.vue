<template>
  <ion-page>
    <ion-content class="content">
      <div class="content-wrapper">
        <!-- Encabezado con animación de rebote -->
        <transition name="bounce">
          <div v-if="showHeader" class="header">
            <h1>Just</h1>
            <h1>Make It</h1>
          </div>
        </transition>

        <!-- Botones con efecto de aparición -->
        <transition name="flash">
          <div v-if="showButtons" class="buttons">
            <ion-button 
              expand="block" 
              class="custom-button"
              @click="navigateTo('/login')" 
            >
              Login
            </ion-button>
            <ion-button 
              expand="block" 
              class="custom-button"
              @click="navigateTo('/register')"  
            >
              Register
            </ion-button>
          </div>
        </transition>
      </div>

      <!-- Icono de ajustes con accesibilidad -->
      <ion-icon 
        id="settings" 
        :icon="settingsOutline" 
        @click="openSettings"
        aria-label="Ajustes"
      ></ion-icon>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';

// Configuración inicial
const router = useRouter();
const showHeader = ref(false);
const showButtons = ref(false);

// Animaciones al cargar la página
onMounted(() => {
  setTimeout(() => (showHeader.value = true), 500);
  setTimeout(() => (showButtons.value = true), 2000);
});

// Navegación entre páginas
const navigateTo = (path: string) => {
  router.push(path);
};

// Manejo del botón de ajustes
const openSettings = () => {
  console.log('Abrir configuración');
  // Aquí iría la lógica para mostrar un modal o cambiar de página
};
</script>

<style scoped>
/* Fuente retro */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Fondo animado */
ion-content.content {
  --background: url('@/assets/background.gif') no-repeat center center/cover;
  background-color: black;
}

/* Centrado vertical y horizontal */
.content-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Estilo del título */
.header h1 {
  font-family: 'Press Start 2P', cursive;
  font-size: 3rem;
  margin: 0;
  color: black;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

/* Contenedor de botones */
.buttons {
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
}

/* Botones personalizados */
.custom-button {
  --background: none;
  background-image: url('@/assets/button.jpg');
  background-size: cover;
  border: 3px solid black !important;
  border-radius: 15px;
  margin: 1rem 0;
  font-family: 'Press Start 2P', cursive;
  color: black !important;
  transition: transform 0.1s;
}

.custom-button:active {
  transform: scale(0.95);
}

/* Icono de ajustes */
#settings {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

#settings:hover {
  color: #00ff00;
}

/* Animaciones */
.bounce-enter-active {
  animation: bounceInUp 1s;
}

.flash-enter-active {
  animation: flashIn 0.5s;
}

@keyframes bounceInUp {
  0% { transform: translateY(100%); opacity: 0; }
  60% { transform: translateY(-10%); }
  80% { transform: translateY(5%); }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes flashIn {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .custom-button {
    max-width: 200px;
    font-size: 0.8rem;
  }
  
  #settings {
    font-size: 1.2rem;
  }
}
</style>