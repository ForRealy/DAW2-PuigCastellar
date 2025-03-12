// App.tsx
import React from 'react';
import Board from './components/Board';

// Componente principal de la aplicación para probar la fusión de iconos al arrastrarlos
const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Tablero con Fusión de Iconos</h1>
      <Board />
    </div>
  );
};

export default App;
