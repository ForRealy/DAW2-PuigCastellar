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
                <h1 class="titulo-superior">Leaderboard</h1>
              </ion-text>
              <div class="leaderboard-container">
                <div class="leaderboard-header">
                  <div>Rank</div>
                  <div>Player</div>
                  <div>Score</div>
                </div>
                <div 
                  v-for="(player, index) in players" 
                  :key="index"
                  class="player-row"
                  :class="[getRankClass(player.rank)]"
                >
                  <div class="player-rank">
                    {{ player.rank }}
                    <ion-icon v-if="player.rank <= 3" :icon="trophyIcon(player.rank)" />
                  </div>
                  <div class="player-name">{{ player.name }}</div>
                  <div class="player-score">{{ player.score }}</div>
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
  import { IonPage, IonContent, IonButton, IonIcon, IonText } from '@ionic/vue'
  import { settingsSharp, arrowBack, trophy } from 'ionicons/icons'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import '../theme/Home.css'
  
  const router = useRouter()
  
  // Mock player data
  const players = ref([
    { name: 'ProPlayer1', score: 24500, rank: 1 },
    { name: 'ChampionX', score: 22400, rank: 2 },
    { name: 'SkillMaster', score: 21500, rank: 3 },
    { name: 'QuickShot', score: 19800, rank: 4 },
    { name: 'DarkHorse', score: 18400, rank: 5 },
    { name: 'Ninja', score: 17200, rank: 6 },
    { name: 'Shadow', score: 16500, rank: 7 },
    { name: 'Rookie99', score: 15300, rank: 8 },
    { name: 'Newbie', score: 14200, rank: 9 },
    { name: 'Beginner', score: 13100, rank: 10 }
  ])
  
  const trophyIcon = (rank) => {
    const icons = { 1: trophy, 2: trophy, 3: trophy }
    return icons[rank]
  }
  
  const getRankClass = (rank) => {
    return {
      'gold-rank': rank === 1,
      'silver-rank': rank === 2,
      'bronze-rank': rank === 3,
      'other-rank': rank > 3
    }
  }
  
  const goBack = () => {
    router.go(-1)
  }
  </script>
  
  <style scoped>
  .leaderboard-header,
.player-row {
  color: black;
}

/* Update icon color */
ion-icon {
  color: black;
}
  .leaderboard-container {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 10px;
  }
  
  .leaderboard-header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    font-weight: bold;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .player-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 8px 0;
    border-radius: 8px;
    transition: transform 0.2s ease;
  }
  
  .player-rank {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 60px;
  }
  
  .player-name {
    flex-grow: 1;
    text-align: left;
    padding-left: 20px;
  }
  
  .player-score {
    width: 100px;
    text-align: right;
    font-weight: bold;
  }
  
  .gold-rank {
    background-color: #fff3cd;
    border: 2px solid #ffd700;
  }
  
  .silver-rank {
    background-color: #e9ecef;
    border: 2px solid #c0c0c0;
  }
  
  .bronze-rank {
    background-color: #e9d8a6;
    border: 2px solid #cd7f32;
  }
  
  .other-rank {
    background-color: #ffffff;
    border: 1px solid black;
  }
  
  ion-icon {
    font-size: 1.2em;
    color: currentColor;
  }
  
  .gold-rank ion-icon {
    color: #ffd700;
  }
  
  .silver-rank ion-icon {
    color: #c0c0c0;
  }
  
  .bronze-rank ion-icon {
    color: #cd7f32;
  }
  
  .player-row:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>