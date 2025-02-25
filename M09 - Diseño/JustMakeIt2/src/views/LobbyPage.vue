<template>
    <ion-page>
      <ion-content class="ion-padding">
        <ion-button class="settings-button" router-link="/settings">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
        <div class="lobby-container">
          <ion-text class="texto-responsivo" color="primary">
          <h1 class="titulo-superior">Just</h1>
          <h1 class="titulo-inferior">Make It</h1>
        </ion-text>
          
          <div class="action-buttons">
            <ion-button 
              expand="block" 
              class="custom-button"
              @click="$router.push('/host')"
            >
              Host Game
            </ion-button>
            
            <ion-button 
              expand="block" 
              class="custom-button"
              @click="$router.push('/game list')"
            >
              Join Game
            </ion-button>

            <ion-button 
              expand="block" 
              class="custom-button"
              @click="$router.push('/laderboard')"
            >
              Laderboard
            </ion-button>
          </div>
        </div>
        
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { 
    IonPage, 
    IonContent, 
    IonButton,
    
  } from '@ionic/vue';
  import { settingsSharp } from 'ionicons/icons';
  </script>
  
  <style scoped>

  .action-buttons {
    margin-top: 1rem;
    display: grid;

  }
  
  .custom-button {
    --border-radius: 50px;
    --border-width: 2px;
    --border-style: solid;
    --border-color: #000;
    --box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-weight: 600;
  }
  </style>