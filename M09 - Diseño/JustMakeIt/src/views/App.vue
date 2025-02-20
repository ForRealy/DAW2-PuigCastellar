<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ionic Vue Flat App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome to your Ionic Vue App!</h1>
    </ion-content>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  }
});
</script>

<style>
/* Add custom styles here if needed */
</style>
