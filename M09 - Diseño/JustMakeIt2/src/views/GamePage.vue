<!-- HomePage.vue -->
<template>
    <ion-page>
       
    <ion-button class="settings-button" router-link="/settings">
      <ion-icon :icon="settingsSharp" />
    </ion-button>
    
    <!-- Nuevo botón para lobby -->
    <ion-button class="lobby-button" router-link="/lobby">
      <ion-icon :icon="arrowBackSharp" />
    </ion-button>
  
      <ion-content class="custom-content">
        <div
          class="outer-field"
          ref="outerField"
          @mousedown="startDrag"
          @touchstart.prevent="startDrag"
          @mousemove="drag"
          @touchmove.prevent="drag"
          @mouseup="stopDrag"
          @touchend="stopDrag"
          @mouseleave="stopDrag"
        >
          <div class="scrollable-content" ref="scrollableContent">
            <img 
              class="background-image" 
              src="../assets/button.jpg" 
              alt="Imagen de fondo"
              draggable="false"
            />
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
  import { ref, onBeforeUnmount, onMounted } from 'vue'
  import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
  import { settingsSharp, arrowBackSharp } from 'ionicons/icons'
  
  const outerField = ref(null)
  const scrollableContent = ref(null)
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const translateX = ref(0)
  const translateY = ref(0)
  const currentTranslateX = ref(0)
  const currentTranslateY = ref(0)
  const maxTranslateX = ref(0)
  const maxTranslateY = ref(0)
  let rafId = null
  
  onMounted(() => {
  // Esperar al siguiente tick para asegurar renderizado del DOM
  setTimeout(() => {
    calculateBounds();
    // Forzar un recálculo después de que las imágenes carguen
    const img = outerField.value.querySelector('img');
    if (img) {
      img.onload = calculateBounds;
    }
  });
  
  window.addEventListener('resize', calculateBounds);
});
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', calculateBounds)
    if (rafId) cancelAnimationFrame(rafId)
  })
  
  // En la función calculateBounds
function calculateBounds() {
  if (!outerField.value || !scrollableContent.value) return;
  
  // Forzar un reflow para mediciones precisas
  void outerField.value.offsetHeight;

  const containerRect = outerField.value.getBoundingClientRect();
  const contentRect = scrollableContent.value.getBoundingClientRect();
  
  // Asegurar valores mínimos
  maxTranslateX.value = Math.min(0, containerRect.width - contentRect.width);
  maxTranslateY.value = Math.min(0, containerRect.height - contentRect.height);
}
  
  function getClientPosition(e) {
    return e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY]
  }
  
  function startDrag(e) {
    isDragging.value = true
    const [clientX, clientY] = getClientPosition(e)
    startX.value = clientX
    startY.value = clientY
    currentTranslateX.value = translateX.value
    currentTranslateY.value = translateY.value
  }
  
  function applyTransform(x, y) {
    // Aplicar límites de desplazamiento
    x = Math.min(0, Math.max(maxTranslateX.value, x))
    y = Math.min(0, Math.max(maxTranslateY.value, y))
  
    translateX.value = x
    translateY.value = y
    scrollableContent.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  
  function drag(e) {
    if (!isDragging.value) return
    
    const [clientX, clientY] = getClientPosition(e)
    const deltaX = clientX - startX.value
    const deltaY = clientY - startY.value
    const newX = currentTranslateX.value + deltaX
    const newY = currentTranslateY.value + deltaY
  
    // Suavizado del movimiento
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => applyTransform(newX, newY))
  }
  
  function stopDrag() {
    isDragging.value = false
    currentTranslateX.value = translateX.value
    currentTranslateY.value = translateY.value
  }
  </script>
  
  <style scoped>
  .outer-field {
    position: relative;
    width: 99vw;
    height: 99vh;
    margin: auto;
    overflow: hidden;
    cursor: grab;
    border: 2px solid black;
    border-radius: 1rem;
    touch-action: none;
    background-color: #f0f0f0; /* Color de fondo para espacios vacíos */
  }
  
  .outer-field:active {
    cursor: grabbing;
  }
  
  .scrollable-content {
  position: absolute; /* Cambiar de relative a absolute */
  width: 300%;
  height: 300%;
  will-change: transform;
  backface-visibility: hidden;
}
  
  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }
  
  .inner-field {
    position: fixed; /* Cambiado a fixed para mantener posición */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 8px;
    pointer-events: none;
    max-width: 80%;
    text-align: center;
  }
  /* Botón de ajustes original */
  .settings-button, .lobby-button {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  --background: transparent;
  --box-shadow: none;
  --border-radius: 50%;  /* ¡Esta es la clave para la forma circular! */
  position: fixed;
  right: 16px;
  z-index: 1000;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-button ion-icon {
  font-size: 24px;
  color: #444;
}

.settings-button {
  top: 16px;
}

.lobby-button {
  top: 72px; /* Mayor separación para visualización circular */
}

/* Iconos con borde circular visible */
.settings-button ion-icon, 
.lobby-button ion-icon {
  font-size: 28px;
  color: #444;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 4px;
  transition: all 0.2s ease;
}

/* Efecto hover para hacer más visible la forma circular */
.settings-button:hover ion-icon,
.lobby-button:hover ion-icon {
  color: #000;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
  </style>