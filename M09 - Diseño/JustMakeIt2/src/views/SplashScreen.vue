<template>
  <ion-page class="splash-screen">
    <ion-content class="ion-padding" fullscreen>
      <div class="content">
        <h1>Just Make It</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
setTimeout(() => {
  router.replace('/home');
}, 3000); // 3 segundos de duración
});
</script>

<style scoped>
.splash-screen {
display: flex;
align-items: center;
justify-content: center;
background: black;
}

ion-content {
--background: black;
display: flex;
align-items: center;
justify-content: center;
}

.content {
text-align: center;
animation: bounceUp 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

h1 {
  font-size: 4rem; /* Tamaño aumentado */

color: white;
font-family: 'LifeIsGoofy';
margin: 0;
}

@keyframes bounceUp {
from {
  transform: translateY(100vh);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
}
</style>

<style>
@font-face {
font-family: 'LifeIsGoofy';
src: url('/assets/life-is-goofy/Life is goofy.ttf') format('truetype');
}
</style>