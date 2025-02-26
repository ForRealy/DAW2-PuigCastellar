<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-button class="settings-button" router-link="/settings" fill="clear">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
      <div class="login-container">
        <ion-text class="texto-responsivo" color="primary">
          <h1 class="titulo-superior">Just</h1>
          <h1 class="titulo-inferior">Make It</h1>
        </ion-text>
        
        <form @submit.prevent="handleLogin">
          <ion-item class="input-item" lines="none">
            <ion-input
              type="text"
              placeholder="Hub Name"
              class="custom-input"
              aria-label="Correo electrónico"
              v-model="email"
            ></ion-input>
          </ion-item>

          <ion-item class="input-item" lines="none">
            <ion-input
              type="text"
              v-model="password"
              placeholder="Hub Password"
              class="custom-input"
              aria-label="Contraseña"
            ></ion-input>
          </ion-item>

          <!-- Agrega un contenedor alrededor del botón -->
          <div class="button-group">
            <ion-button shape="round" class="boton-personalizado" router-link="/gsettings">
              Game Settings
            </ion-button>
          </div>

          <div class="button-group">
            <ion-button 
              type="submit" 
              class="main-button"
              :disabled="!isFormValid"
            >
              Continuar
            </ion-button>
            
            <ion-button 
              class="back-button"
              @click="goBack"
            >
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
          </div>
        </form>
      </div>
      <ion-alert
        :is-open="showAlert"
        header="Campos requeridos"
        :message="alertMessage"
        :buttons="['Entendido']"
        @didDismiss="showAlert = false"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  IonPage, 
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert 
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { arrowBack, settingsSharp } from 'ionicons/icons';

const router = useRouter();
const email = ref(''); // Declarado para el Hub Name
const password = ref(''); 
const showAlert = ref(false);
const alertMessage = ref('');

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '';
});

const handleLogin = () => {
  console.log('Intentando navegar...');
  if (!isFormValid.value) {
    alertMessage.value = 'Debes completar ambos campos para continuar';
    showAlert.value = true;
    return;
  }
  console.log('Redirigiendo a /lobby');
  router.push('/game');
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.input-item {
  --background: url('../assets/button.jpg') no-repeat center center / cover;
  --border-radius: 15px;
  --border-color: #000;
  --border-style: solid;
  --border-width: 2px;
  --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
  --ripple-color: deeppink;
  --padding-top: 5px;
  --padding-bottom: 5px;
  margin-bottom: 0.5rem;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.custom-input::part(placeholder) {
  color: #666;
  font-style: italic;
}

.custom-input::part(text) {
  color: #000;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.main-button {
  --border-radius: 15px;
  --border-color: #000;
  --border-style: solid;
  --border-width: 2px;
  --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  --padding-top: 8px;
  --padding-bottom: 8px;
  --height: 40px;
  width: 150px;
  margin: 0;
  color: #000;
  font-weight: 600;
}

.back-button {
  --border-radius: 50px;
  --border-color: #000;
  --border-width: 2px;
  --border-style: solid;
  --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  --padding-start: 0;
  --padding-end: 0;
  width: 35px;
  height: 35px;
  margin: 0;
}

.forgot-password {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
}

ion-icon {
  font-size: 1.4rem;
  color: #000;
}

.custom-input {
  --background: url('../../assets/button.jpg') no-repeat center center / cover;
  --border-radius: 15px;
  --border-width: 2px;
  --border-style: solid;
  --border-color: #000;
  --padding-start: 15px;
  --padding-end: 15px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 20px;
  color: #000;
  background-clip: padding-box;
}

ion-alert {
  --backdrop-opacity: 0.7;
  --width: 90%;
  --max-width: 400px;
}

ion-alert::part(message) {
  color: #000;
  font-size: 1rem;
}

ion-alert::part(header) {
  font-weight: bold;
  color: #000;
}

ion-alert .alert-button-group {
  padding: 15px;
}

ion-alert .alert-button {
  color: #000;
  font-weight: 600;
  border: 2px solid #000;
  border-radius: 15px;
  margin: 0 10px;
  background: url('../assets/life-is-goofy/button.jpg') no-repeat center center / cover;
}

.main-button:disabled {
  --background: #cccccc;
  --border-color: #666666;
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
