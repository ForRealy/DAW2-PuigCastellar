<template>
    <ion-page class="splash-screen">
      <ion-content class="ion-padding" fullscreen>
        <div class="content">
          <img 
          src="../assets/life-is-goofy/button.jpg" 
            alt="App Logo"
            class="logo"
          />
          <h1>JustMakeIt2</h1>
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
    background: var(--ion-color-primary);
  }
  
  .content {
    text-align: center;
    animation: fadeIn 1.5s ease-in;
  }
  
  .logo {
    max-width: 200px;
    margin-bottom: 2rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  </style>