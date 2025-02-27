<template>
  <ion-page>
    <ion-content class="custom-content">
      <div class="content-wrapper">
        <ion-text class="texto-responsivo" color="primary">
          <h1 class="titulo-superior">Just</h1>
          <h1 class="titulo-inferior">Make It</h1>
        </ion-text>
        <div class="settings-container">
        <!-- Sección de Idiomas con Banderas -->
        <div class="settings-section">
          <ion-text class="section-title text-black">Language</ion-text>
          <div class="flags-container">
            <ion-button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="selectedLanguage = lang.code"
              class="flag-button"
              :class="{ 'selected-flag': selectedLanguage === lang.code }"
              fill="clear"
            >
              <img 
                :src="lang.flag" 
                :alt="lang.name"
                class="flag-image"
              />
            </ion-button>
          </div>
        </div>

        <!-- Sección de Volumen con Vuetify -->
        <div class="settings-section">
          <ion-text class="section-title text-black">Volume</ion-text>
          
          <div class="volume-control">
            <v-slider v-model="masterVolume" color="secondary" thumb-label :max="100" :step="1" class="vuetify-slider">
              <template v-slot:prepend>
                <v-icon>mdi-volume-high</v-icon>
              </template>
            </v-slider>
          </div>

          <div class="volume-control">
            <v-slider v-model="musicVolume" color="secondary" thumb-label :max="100" class="vuetify-slider">
              <template v-slot:prepend>
                <v-icon>mdi-music</v-icon>
              </template>
            </v-slider>
          </div>

          <div class="volume-control">
            <v-slider v-model="uiVolume" color="secondary" thumb-label :max="100" class="vuetify-slider">
              <template v-slot:prepend>
                <v-icon>mdi-speaker-wireless</v-icon>
              </template>
            </v-slider>
          </div>
        </div>

        <!-- Botón de Retorno -->
        <ion-button expand="block" class="return-button" color="medium" @click="goBack">
          <ion-icon :icon="arrowBack"></ion-icon>
          Return
        </ion-button>
      </div>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon, IonText } from '@ionic/vue';
import { VSlider, VIcon } from 'vuetify/components';
import { arrowBack } from 'ionicons/icons';

const router = useRouter();

const selectedLanguage = ref('es');
const languages = ref([
  { code: 'es', name: 'Español', flag: 'https://flagcdn.com/es.svg' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/gb.svg' },
  { code: 'br', name: 'Português', flag: 'https://flagcdn.com/br.svg' }
]);
const masterVolume = ref(75);
const musicVolume = ref(60);
const uiVolume = ref(45);

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.text-black {
  color: #000000 !important;
}
.settings-container {
  border: 3px solid black;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  position: relative;
  overflow: hidden;
  background-image: url('../assets/button.jpg'); /* Ruta corregida */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Opcional: Capa de overlay para mejor legibilidad */
.settings-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); /* Ajusta la opacidad según necesites */
  z-index: 1;
}

/* Asegurar que el contenido quede sobre el fondo */
.settings-section, .return-button {
  position: relative;
  z-index: 2;
}

.settings-section {
  margin-bottom: 25px;
}
.vuetify-slider {
  margin: 25px 0;
}

.volume-control {
  padding: 0 15px;
}

.settings-section {
  width: 90%;
  margin: 20px auto;
}

.content-wrapper {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.2rem;
  display: block;
  margin-bottom: 15px;
  color: var(--ion-color-primary);
}

/* Contenedor de banderas: usamos flex para distribuir el espacio */
.flags-container {
  display: flex;
  gap: 15px;
  justify-content: space-around;
  margin: 15px 0;
}

.flag-button {
  width: 70px; /* Fixed width */
  height: 60px; /* Fixed height */
  min-width: auto; /* Override Ionic default */
  --padding-start: 0;
  --padding-end: 0;
}

.flag-image {
  width: 70; /* Slightly smaller than container */
  height: 60px;
  border: 2px solid transparent;
  transition: transform 0.2s ease;
}

.selected-flag .flag-image {
  transform: scale(1.1);
}



</style>
