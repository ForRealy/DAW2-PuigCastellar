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

<script lang="ts">
import { defineComponent } from 'vue';
import { usePageLogic } from '../components/HomePageLogic';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const { showHeader, showButtons, settingsOutline, navigateTo, openSettings } = usePageLogic();
    return { showHeader, showButtons, settingsOutline, navigateTo, openSettings };
  }
});
</script>

<!-- Se importa el archivo CSS -->
<style src="../components/HomePage.css" scoped></style>
