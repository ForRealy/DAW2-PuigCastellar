<template>
  <ion-page>
    <div class="video-background">
      <video autoplay loop muted>
        <source src="@/assets/4822860-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
    </div>

    <!-- Ícono en la esquina superior derecha -->
    <ion-icon name="settings-outline" class="settings-icon"></ion-icon>

    <h1>
      <span class="word word-1">Just</span>
      <span class="word word-1">Make It</span>
    </h1>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { onMounted } from 'vue';

onMounted(() => {
  // Añade la clase 'show' al h1 después de que el componente haya sido montado
  const h1Element = document.querySelector('h1');
  if (h1Element) {
    setTimeout(() => {
      h1Element.classList.add('show');
    }, 500);  // Espera 500ms antes de iniciar la animación
  }
});
</script>

<style scoped>
/* Estilo para el video de fondo */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;  /* Coloca el video detrás del contenido */
}

video {
  object-fit: cover;  /* Asegura que el video cubra toda el área */
  width: 100%;
  height: 100%;
}

/* Aseguramos que todo use Irish Grover */
body {
  font-family: 'Irish Grover';
}

/* Estilo general para el h1 */
h1 {
  font-family: 'Irish Grover';  /* Aplica Irish Grover solo al h1 */
  font-size: 5rem;  /* Ajusta el tamaño de fuente */
  color: black;  /* Color blanco para el texto */
  text-align: left;  /* Alineación a la izquierda, no completamente centrado */
  position: absolute;
  top: 10%;  /* Mueve el h1 hacia la parte superior */
  left: 50%;
  transform: translateX(-50%); /* Centra el h1 horizontalmente */
  line-height: 1.2; /* Asegura que las palabras estén más separadas */
}

/* Estilo para cada palabra */
.word {
  display: block;
  text-align: center;
  opacity: 0; /* Inicia con la opacidad en 0 para la animación */
  transform: translateY(20px);  /* Comienza desplazada hacia abajo */
  transition: opacity 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Animación suave con efecto de rebote */
}

.word-1 {
  transition-delay: 0s; /* Sin retraso para la primera palabra */
}

.word-2 {
  transition-delay: 1s; /* Retraso para la segunda palabra */
}

/* Animación al aparecer */
h1.show .word {
  opacity: 1;
  transform: translateY(0);  /* Se mueve hacia su posición original */
}

/* Estilo para el ícono en la esquina superior derecha */
.settings-icon {
  position: absolute;
  top: 20px;  /* Ajusta la distancia desde la parte superior */
  right: 20px;  /* Ajusta la distancia desde la parte derecha */
  font-size: 3rem;  /* Tamaño del ícono */
  color: white;  /* Color blanco para que resalte sobre el fondo */
  z-index: 1;  /* Asegura que el ícono quede sobre el video */
  cursor: pointer;  /* Cambia el cursor para indicar que es interactivo */
}
</style>
