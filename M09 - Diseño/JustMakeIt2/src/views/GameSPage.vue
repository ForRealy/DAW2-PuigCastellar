<template>
    <ion-page>
      <ion-button class="settings-button" router-link="/settings">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
  
      <ion-content class="custom-content">
        <div class="content-wrapper">
          <ion-text class="texto-responsivo" color="primary">
            <h1 class="titulo-superior">Just</h1>
            <h1 class="titulo-inferior">Make It</h1>
          </ion-text>
  
          <div class="host-section">
            <div class="number-field">
              <div class="players-row">
                <ion-text color="primary">Players:</ion-text>
                <ion-input 
                  type="number" 
                  min="2" 
                  max="8" 
                  value="4"
                  class="number-input"
                ></ion-input>
              </div>
              <ion-text 
              class="how-to-play-text"
              @click="navigateToHowToPlay"
            >
              How to Play
            </ion-text>
            </div>
            
            <ion-button 
              shape="round" 
              class="submit-button" 
              router-link="/host"
            >
              Submit
            </ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { IonPage, IonContent, IonButton, IonIcon, IonText, IonInput } from '@ionic/vue'
  import { settingsSharp } from 'ionicons/icons'
  import '../theme/Home.css'
  
  const router = useRouter()
  const navigateToHowToPlay = () => {
  router.push('/gbt')
}
  
  </script>

 
<style scoped>
.host-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.number-field {
  width: 40vw;
  border: 2px solid black;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: white;
}

.players-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.number-input {
  width: 60px;
  color: black;
  --padding-start: 8px;
  --padding-end: 8px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.how-to-play-text {
  font-size: 0.9em;
  color: #666;
  text-align: center;
}

.submit-button {
  width: 160px;
  font-weight: bold;
}
</style>