<template>
  <ion-page>
    <ion-content class="content">
      <div class="content-wrapper">
        <!-- Header Transition (bounce in from bottom) -->
        <transition name="bounce">
          <div v-if="showHeader" class="header">
            <h1>Just</h1>
            <h1>Make It</h1>
          </div>
        </transition>

        <!-- Buttons Transition (fade in instantly) -->
        <transition name="flash">
          <div v-if="showButtons" class="buttons">
            <ion-button expand="block" class="custom-button">Login</ion-button>
            <ion-button expand="block" class="custom-button">Register</ion-button>
          </div>
        </transition>
      </div>

      <ion-icon id="settings" :icon="settingsIcon" @click="openSettings"></ion-icon>
    </ion-content>
  </ion-page>
</template>





<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';

const settingsIcon = settingsOutline;
const showHeader = ref(false);
const showButtons = ref(false);

onMounted(() => {
  // Show the header after 0.5 seconds
  setTimeout(() => {
    showHeader.value = true;
  }, 500);

  // Show the buttons after 2.5 seconds (increased delay)
  setTimeout(() => {
    showButtons.value = true;
  }, 2000); // Now the buttons will appear after 2 seconds
});

function openSettings() {
  console.log('Settings clicked');
}
</script>






<!-- Importing the external CSS -->
<style src="../components/style.css"></style>
