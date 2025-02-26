<template>
    <ion-page>
      <div class="turn-bar" @click="centerView" role="status" aria-live="polite">
        Player {{ currentPlayer }} Turn
      </div>
      
      <ion-button 
        class="settings-button" 
        router-link="/settings"
        aria-label="Configuración"
      >
        <ion-icon :icon="settingsSharp" />
      </ion-button>
      
      <ion-button 
        class="lobby-button" 
        router-link="/lobby"
        aria-label="Volver al lobby"
      >
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
          @keydown="handleKeydown"
          tabindex="0"
        >
        <div class="scrollable-content" ref="scrollableContent">
            <img class="background-image" src="../assets/button.jpg" alt="Tablero de juego"/>
            
            <div class="inner-field">
              <div 
                v-for="(sphere, index) in spheres" 
                :key="index"
                class="sphere"
                :class="sphere.position"
                @click="handleSphereClick(sphere)"
              >
                +
              </div>
              <div 
  v-for="field in innerFields"
  :key="field.id"
  class="inner-field dynamic-field"
  :style="{
    transform: `
      translate(
        ${field.translate.x}%,
        ${field.translate.y}%
      )
      translate(-50%, -50%)
    `
  }"
>
  <div 
    v-for="pos in ['top', 'right', 'bottom', 'left']" 
    :key="pos"
    class="sphere" 
    :class="pos"
    @click="handleSphereClick({ position: pos }, field)"
  >
    +
  </div>
  <ion-icon :icon="homeSharp" class="home-icon"></ion-icon>
</div>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, onBeforeUnmount, onMounted } from 'vue'
  import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
  import { settingsSharp, arrowBackSharp, homeSharp } from 'ionicons/icons'
  
  // Configuración básica
  const currentPlayer = ref(1)
  const spheres = ref([
    { position: 'top' },
    { position: 'right' },
    { position: 'bottom' },
    { position: 'left' }
  ])
  
  
  
  // Lógica de arrastre y desplazamiento
  const outerField = ref(null)
const scrollableContent = ref(null)
const homeIcon = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const translateX = ref(0)
const translateY = ref(0)
const currentTranslateX = ref(0)
const currentTranslateY = ref(0)
const maxTranslateX = ref(0)
const maxTranslateY = ref(0)
const currentScale = ref(1)
const initialDistance = ref(null)
const lastScale = ref(1)
let rafId = null
let observer = null
let debouncedResize = null

  
const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

  
const calculateBounds = () => {
  if (!outerField.value || !scrollableContent.value) return
  
  const containerRect = outerField.value.getBoundingClientRect()
  const contentRect = scrollableContent.value.getBoundingClientRect()
  
  maxTranslateX.value = containerRect.width - contentRect.width
  maxTranslateY.value = containerRect.height - contentRect.height
}


// Funciones de utilidad para el zoom táctil
const getDistance = (t1, t2) => {
  return Math.hypot(
    t2.clientX - t1.clientX,
    t2.clientY - t1.clientY
  )
}

const getCenter = (t1, t2) => {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2
  }
}

  
  // Mejorado: Manejo de carga de imagen con Intersection Observer
  const setupImageObserver = () => {
    const img = outerField.value?.querySelector('img')
    if (!img) return
  
    if (img.complete) {
      handleImageLoad()
      return
    }
  
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && img.complete) {
          handleImageLoad()
        }
      })
    }, { root: outerField.value })
  
    observer.observe(img)
  }
  
  const handleImageLoad = () => {
    calculateBounds()
    centerView()
    if (observer) observer.disconnect()
  }
  
  const handleImageError = () => {
    console.error('Error cargando la imagen del tablero')
    // Puedes agregar una imagen de respaldo aquí si es necesario
  }
  
  // Mejorado: Centrado inicial con verificación de posición
  const centerView = () => {
  calculateBounds()
  translateX.value = maxTranslateX.value / 2
  translateY.value = maxTranslateY.value / 2
  
  scrollableContent.value.style.transition = 'transform 0.5s ease'
  applyTransform(translateX.value, translateY.value)
  
  setTimeout(() => {
    scrollableContent.value.style.transition = ''
  }, 500)
}

  // Añadir funciones para manejar el zoom
const handleWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  zoom(delta, e.clientX, e.clientY)
}

const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    initialDistance.value = getDistance(e.touches[0], e.touches[1])
    lastScale.value = currentScale.value
  }
}

const handleTouchMove = (e) => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches[0], e.touches[1])
    const delta = (newDistance - initialDistance.value) * 0.01
    const center = getCenter(e.touches[0], e.touches[1])
    zoom(delta, center.x, center.y)
  }
}

const zoom = (delta, clientX, clientY) => {
  const containerRect = outerField.value.getBoundingClientRect()

  
  // Calcular posición relativa antes del zoom
  const x = (clientX - containerRect.left - translateX.value) / currentScale.value
  const y = (clientY - containerRect.top - translateY.value) / currentScale.value
  
  // Aplicar nuevo zoom
  const newScale = Math.min(2, Math.max(0.5, currentScale.value + delta))
  currentScale.value = newScale
  
  // Ajustar posición para mantener el foco
  const newX = clientX - containerRect.left - x * newScale
  const newY = clientY - containerRect.top - y * newScale
  
  applyTransform(newX, newY)
}

  // Mejorado: Navegación con teclado
  const handleKeydown = (e) => {
    const step = 50
    switch(e.key) {
      case 'ArrowLeft':
        applyTransform(translateX.value + step, translateY.value)
        break
      case 'ArrowRight':
        applyTransform(translateX.value - step, translateY.value)
        break
      case 'ArrowUp':
        applyTransform(translateX.value, translateY.value + step)
        break
      case 'ArrowDown':
        applyTransform(translateX.value, translateY.value - step)
        break
      case 'Home':
        centerView()
        break
    }
  }
  
  const applyTransform = (x, y) => {
  calculateBounds() // Actualizar límites con el nuevo scale
  
  x = Math.min(0, Math.max(maxTranslateX.value, x))
  y = Math.min(0, Math.max(maxTranslateY.value, y))
  
  translateX.value = x
  translateY.value = y
  
  scrollableContent.value.style.transform = `
    translate3d(${x}px, ${y}px, 0)
    scale(${currentScale.value})
  `
}

  
  // Mejorado: Manejo de eventos de arrastre con verificación de límites
  const startDrag = (e) => {
    isDragging.value = true
    const [clientX, clientY] = getClientPosition(e)
    startX.value = clientX
    startY.value = clientY
    currentTranslateX.value = translateX.value
    currentTranslateY.value = translateY.value
  }
  
  const drag = (e) => {
    if (!isDragging.value) return
    
    const [clientX, clientY] = getClientPosition(e)
    const deltaX = clientX - startX.value
    const deltaY = clientY - startY.value
    const newX = currentTranslateX.value + deltaX
    const newY = currentTranslateY.value + deltaY
  
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => applyTransform(newX, newY))
  }
  
  onMounted(() => {
  setupImageObserver()
  
  debouncedResize = debounce(() => {
    calculateBounds()
    centerView()
  }, 100)

  window.addEventListener('resize', debouncedResize)
  
  outerField.value?.addEventListener('wheel', handleWheel, { passive: false })
  outerField.value?.addEventListener('touchstart', handleTouchStart)
  outerField.value?.addEventListener('touchmove', handleTouchMove)
  outerField.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debouncedResize)
  if (rafId) cancelAnimationFrame(rafId)
  if (observer) observer.disconnect()
  outerField.value?.removeEventListener('wheel', handleWheel)
  outerField.value?.removeEventListener('touchstart', handleTouchStart)
  outerField.value?.removeEventListener('touchmove', handleTouchMove)
})
  
  // Utilidades
  const getClientPosition = (e) => {
  return e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY]
}
const stopDrag = () => {
  isDragging.value = false
  currentTranslateX.value = translateX.value
  currentTranslateY.value = translateY.value
}
  
const innerFields = ref([]);

const handleSphereClick = (sphere, parentField = null) => {
  const directions = {
    top: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 }
  };

  // Calcular translate basado en el padre
  const parentTranslate = parentField ? parentField.translate : { x: 0, y: 0 };
  const direction = directions[sphere.position];
  const offset = 1; // Offset fijo para cada nuevo campo

  const newTranslate = {
    x: parentTranslate.x + (direction.x * 100 * offset),
    y: parentTranslate.y + (direction.y * 100 * offset)
  };

  const newField = {
    id: Date.now(),
    position: sphere.position,
    direction: direction,
    offset: offset,
    parentId: parentField ? parentField.id : null,
    translate: newTranslate // Guardar la posición acumulada
  };

  innerFields.value.push(newField);
};
  </script>
  
  <style scoped>
  .outer-field {
    position: relative;
    width: 99vw;
    height: 99vh;
    margin: 0;
    overflow: hidden;
    cursor: grab;
    border: 2px solid black;
    border-radius: 1rem;
    touch-action: pan-x pan-y; /* Mejor que 'none' para compatibilidad */
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
.settings-button, .lobby-button {
  z-index: 1002;
}
.turn-bar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  padding: 15px 30px; /* Ajustar según tu imagen */
  border-radius: 15px;
  
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-style: solid;
  width: 220px; /* Ajustar al ancho de tu imagen */
  height: 50px; /* Ajustar al alto de tu imagen */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.turn-bar:hover {
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  filter: brightness(1.1);
}

.turn-bar:active {
  transform: translateX(-50%) scale(0.95);
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  pointer-events: none;
  width: 100px;
  height: 100px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
 
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
.sphere {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* Color del signo + */
  font-weight: bold;
  font-size: 16px;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.sphere.top { top: -10px; left: 50%; transform: translateX(-50%); }
.sphere.right { right: -10px; top: 50%; transform: translateY(-50%); }
.sphere.bottom { bottom: -10px; left: 50%; transform: translateX(-50%); }
.sphere.left { left: -10px; top: 50%; transform: translateY(-50%); }
.sphere:hover {
  background-color: #333;
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Ajustar transformaciones para mantener posición + escala */
.sphere.top:hover {
  transform: translateX(-50%) scale(1.2);
}

.sphere.right:hover {
  transform: translateY(-50%) scale(1.2);
}

.sphere.bottom:hover {
  transform: translateX(-50%) scale(1.2);
}

.sphere.left:hover {
  transform: translateY(-50%) scale(1.2);
}
.home-icon {
  font-size: 40px;
  color: black;
  z-index: 3;
}
  </style>