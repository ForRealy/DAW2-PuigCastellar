<template>
    <ion-page>
      <ion-button class="settings-button" router-link="/settings">
        <ion-icon :icon="settingsSharp" />
      </ion-button>
  
      <ion-content class="custom-content">
        <div class="content-wrapper">
          <div class="contenedor-cuadro-botones">
            <div class="cuadro-botones">
              <ion-text class="texto-responsivo" color="primary">
                <h1 class="titulo-superior">Join Lobby</h1>
              </ion-text>
              <div class="botones-container">
                <div 
                  v-for="(button, index) in botones" 
                  :key="index"
                  class="fila-boton"
                >
                  <ion-button 
                    shape="round" 
                    class="boton-personalizado"
                    @click="handleButtonClick(button)"
                  >
                    {{ button.texto }}
                  </ion-button>
                  <div class="random-number">
  {{ button.numero }}
</div>
                </div>
                
              </div>
              <ion-button 
              class="back-button"
              @click="goBack"
            >
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  

  <script setup>
  import { IonPage, IonContent, IonButton, IonIcon, IonText, alertController } from '@ionic/vue'
  import { settingsSharp, arrowBack } from 'ionicons/icons'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import '../theme/Home.css'
  
  const router = useRouter()
  const cantidadBotones = ref(Math.floor(Math.random() * 5) + 2)
  
  const textosBase = ['I Hate N', 'Robert Game']
  const textosExtras = ['Your Mom', 'F Lover', 'Yow Chat', 'SBrothers']
  
  const botones = ref([])
  
  const handleButtonClick = async (button) => {  // Cambio en el parámetro recibido
  if (button.numero === 6) {  // Nueva validación del número
    const alert = await alertController.create({
      header: 'Lobby Full',
      message: 'You Cant Enter',
      buttons: ['OK']
    })
    await alert.present()
    return  // Importante: salir de la función para evitar redirección
  }
  
  if (button.texto === 'Robert Game') {
    const alert = await alertController.create({
      header: 'Private Lobby',
      message: 'You Cant Enter',
      buttons: ['OK']
    })
    await alert.present()
  } else {
    router.push('/game')
  }
}

  
  const mezclarArray = (array) => array.sort(() => Math.random() - 0.5)
  
  const generarBotones = () => {
    const todosTextos = [...textosBase, ...mezclarArray(textosExtras)]
    botones.value = todosTextos
      .slice(0, cantidadBotones.value)
      .map(texto => ({
        texto,
        numero: Math.floor(Math.random() * 6) + 1
      }))
  }
  const goBack = () => {
  router.go(-1)
}
  generarBotones()
  </script>
  
  <style scoped>
  /* Botones más delgados */
  .boton-personalizado {
    min-height: 40px;
    font-size: 0.95rem;
    transition: transform 0.2s ease;
  }
  
  /* Efecto hover para mejor interactividad */
  .boton-personalizado:hover {
    transform: scale(0.98);
  }
  
  /* Ajuste de contenedor para múltiples botones */
  .botones-container {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    justify-content: center;
  }
  button-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
  }

  .button-text {
    flex-grow: 1;
    text-align: left;
  }

  .random-number {
    font-weight: bold;
    text-align: center;
  }

  /* Ajustar tamaño de fuente para pantallas pequeñas */
  
/* Contenedor de fila (botón + número) */
.fila-boton {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Número al lado del botón */
.random-number {
    border-style: solid;
    border-color: black;

  color: black;
  border-radius: 20px;
  padding: 8px 12px;
  -width: 35px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Asegurar que el botón ocupe el espacio disponible */
.boton-personalizado {
  flex-grow: 1;
}

/* Mantener consistencia en hover */
.fila-boton:hover .boton-personalizado {
  transform: scale(0.98);
}

  
  </style>