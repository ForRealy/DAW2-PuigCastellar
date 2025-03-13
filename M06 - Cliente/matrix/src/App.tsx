import React from "react";
import Board from "./components/Board";

// Estilos principales del contenedor
const appStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f0f0",
};

// Componente principal
const App: React.FC = () => {
  return (
    <div style={appStyle}>
      <h1>Tablero</h1>
      <Board />
    </div>
  );
};

export default App;