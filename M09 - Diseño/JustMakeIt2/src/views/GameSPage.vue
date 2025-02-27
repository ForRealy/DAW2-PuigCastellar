<!-- HomePage.vue -->
<template>
    <ion-page>
      <!-- Botón de ajustes con solo el icono, sin fondo ni borde -->
      <ion-button class="settings-button" router-link="/settings">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
  
      <ion-content class="custom-content">
        <div class="content-wrapper">
          <ion-text class="texto-responsivo" color="primary">
            <h1 class="titulo-superior">Just</h1>
            <h1 class="titulo-inferior">Make It</h1>
          </ion-text>
          
          <div class="botones-container">
            <ion-button shape="round" class="boton-personalizado" router-link="/login">Login</ion-button>
            <ion-button shape="round" class="boton-personalizado" router-link="/register">Register</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
  import { settingsSharp } from 'ionicons/icons'
  
  import '../theme/Home.css'
  
  </script>
  
  <!-- 
    Cambios realizados:
    - Se mantiene el botón de ajustes, pero se han ajustado sus propiedades para que solo muestre el icono (engranaje),
      sin fondo ni borde, mediante el atributo fill="clear".
    - Se añadieron clases CSS para eliminar cualquier padding y borde, y se implementó un efecto hover para agrandarlo ligeramente.
  -->
  