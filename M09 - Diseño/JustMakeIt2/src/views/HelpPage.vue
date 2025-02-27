<template>
    <ion-page>
      <ion-content>
        <!-- Contenedor con bordes negros redondeados y fondo de imagen -->
        <div class="bordered-container">
          <div class="how-to-play-container">
            <h1>How to Play?</h1>
            <p>Each box can create 4 more box</p>
            <p>Better Run!! This are the best players of the game, take care 
              <ion-button fill="outline" size="small">Leaderboard</ion-button>
            </p>
            <p>All boxes have unique things to do</p>
            <p>Dont Die!! Keep your life up and destroy other players</p>
            <ion-button @click="goBack">Return</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import {
    IonPage,
    IonContent,
    IonButton
  } from '@ionic/vue'

  const router = useRouter();
  const goBack = () => {
  // Go back to previous page in history
  router.go(-1);
  
  // Alternatively, if you want to navigate to a specific route:
  // router.push('/home');
};
  </script>
  
  <style scoped>
  /* Contenedor principal con estilos de borde y fondo */
  .bordered-container {
    border: 2px solid black;
    border-radius: 15px;
    background-image: url('../assets/button.jpg');
    background-size: cover;
    background-position: center;
    margin: 20px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .how-to-play-container {
    text-align: center;
    padding: 1.5rem;
  }
  
  .how-to-play-container h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .how-to-play-container p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.5;
    color: #444;
  }
  
  /* Mejoras para los botones */
  ion-button {
    margin-top: 1rem;
    --border-radius: 8px;
  }
  </style>