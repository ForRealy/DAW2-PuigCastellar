<template>
  <ion-page>
    <ion-content class="custom-content">
      <div class="content-wrapper">
        <ion-text class="texto-responsivo" color="primary">
          <h1>Just Make It</h1>
        </ion-text>
        
        <div class="botones-container">
          <ion-button shape="round" class="boton-personalizado">Login</ion-button>
          <ion-button shape="round" class="boton-personalizado">Register</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import '../theme/Home.css'
</script>
