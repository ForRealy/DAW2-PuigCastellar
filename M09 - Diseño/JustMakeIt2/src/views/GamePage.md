<!-- HomePage.vue -->
<template>
    <ion-page>
      <!-- Botón de ajustes con solo el icono, sin fondo ni borde -->
      <ion-button class="settings-button" router-link="/settings">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
  
      <ion-content class="custom-content">
        <!-- Campo exterior draggable -->
        <div
          class="outer-field"
          ref="outerField"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
        >
          <!-- Contenedor que tiene un área mayor para permitir el scroll -->
          <div class="scrollable-content">
            <!-- Imagen de fondo que se extiende más allá del contenedor visible -->
            <img class="background-image" src="../assets/button.jpg" alt="Imagen de fondo" />
            <!-- Objeto interior posicionado en el centro del contenido desplazable -->
            <div class="inner-field">
              <p>Contenido interior que se desplaza junto con el campo exterior.</p>
              <p>Puedes agregar más elementos aquí...</p>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
  import { settingsSharp } from 'ionicons/icons'
  import '../theme/Home.css'
  
  // Referencia al contenedor draggable
  const outerField = ref(null)
  // Variables para controlar el arrastre
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const scrollLeft = ref(0)
  const scrollTop = ref(0)
  
  function startDrag(e) {
    isDragging.value = true
    // Se guarda la posición inicial relativa al contenedor
    startX.value = e.pageX - outerField.value.offsetLeft
    startY.value = e.pageY - outerField.value.offsetTop
    // Se guarda la posición actual del scroll
    scrollLeft.value = outerField.value.scrollLeft
    scrollTop.value = outerField.value.scrollTop
  }
  
  function drag(e) {
    if (!isDragging.value) return
    e.preventDefault() // Evitar comportamientos no deseados
    const x = e.pageX - outerField.value.offsetLeft
    const y = e.pageY - outerField.value.offsetTop
    const walkX = x - startX.value
    const walkY = y - startY.value
    // Se ajusta la posición del scroll según el movimiento
    outerField.value.scrollLeft = scrollLeft.value - walkX
    outerField.value.scrollTop = scrollTop.value - walkY
  }
  
  function stopDrag() {
    isDragging.value = false
  }
  </script>
  
  <style scoped>
  .outer-field {
    position: relative;
    width: 99vw;
    height: 99vh;
    margin: auto;
    overflow: auto; /* Permite el desplazamiento */
    cursor: grab; 
    border-style: solid;
    border-color: black;
    border-radius: 1rem;
  }
  
  .outer-field:active {
    cursor: grabbing;
  }
  
  /* Este contenedor es mayor que el visible, para generar overflow */
  .scrollable-content {
    position: relative;
    width: 300%; /* Ajusta este valor para aumentar/disminuir el área desplazable */
    height: 300%;
  }
  
  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .inner-field {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  