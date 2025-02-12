<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Registro</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <!-- Formulario básico -->
        <ion-item>
          <ion-input label="Nombre" type="text"></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-input label="Email" type="email"></ion-input>
        </ion-item>
  
        <ion-item>
          <ion-input label="Password" type="password"></ion-input>
        </ion-item>
  
        <ion-button expand="block" class="ion-margin-top">Registrarse</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonItem,
    IonInput,
    IonButton 
  } from '@ionic/vue';
  </script>