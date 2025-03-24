import React, { useState } from "react";
import Cell from "./Cell";
import Icon from "./Icon";
import IconAdd from "./IconAdd";

// Dimensiones del tablero
const ROWS = 6;
const COLS = 6;

// Definición de la posición para los IconAdd
interface IconAddPosition {
  row: number;
  col: number;
  type: "A" | "B";
}

// Posiciones fijas para los iconos de añadir
const ICON_ADD_POSITIONS: IconAddPosition[] = [
  { row: 0, col: 0, type: "A" },
  { row: ROWS - 1, col: COLS - 1, type: "B" },
];

// Definición de la estructura de los iconos draggable, ahora usando directamente el símbolo
interface IconData {
  row: number;
  col: number;
  type: "A" | "B";
  symbol: string;
}

const Board: React.FC = () => {
  // Estado para almacenar los iconos draggable presentes en el tablero
  const [draggableIcons, setDraggableIcons] = useState<IconData[]>([]);

  // Estilo para el contenedor del tablero
  const boardContainerStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "15px",
    background: "#f5f5f5",
    border: "2px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "20px auto"
  };

  // Verifica si la celda está vacía (excluyendo las celdas reservadas y las ocupadas)
  const isCellEmpty = (row: number, col: number): boolean => {
    const isReserved = ICON_ADD_POSITIONS.some(pos => pos.row === row && pos.col === col);
    if (isReserved) return false;
    const isOccupied = draggableIcons.some(icon => icon.row === row && icon.col === col);
    return !isOccupied;
  };

  // Encuentra una celda vacía al azar
  const findEmptyCell = (): { row: number; col: number } | null => {
    const availableCells: { row: number; col: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (isCellEmpty(row, col)) {
          availableCells.push({ row, col });
        }
      }
    }
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      return availableCells[randomIndex];
    }
    return null;
  };

  // Al hacer clic en IconAdd, se agrega un nuevo icono draggable con el emoji base
  const handleIconAddClick = (type: "A" | "B", baseEmoji: string) => {
    const emptyCell = findEmptyCell();
    if (emptyCell) {
      setDraggableIcons([
        ...draggableIcons,
        { row: emptyCell.row, col: emptyCell.col, type, symbol: baseEmoji }
      ]);
    } else {
      console.log("No hay celdas vacías disponibles");
    }
  };

  // Guarda el índice del icono arrastrado en el dataTransfer
  const handleIconDragStart = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("iconIndex", index.toString());
  };

  // Permite que la celda reciba el drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Maneja el drop en una celda: si hay iconos iguales se fusionan haciendo una llamada a la API,
  // de lo contrario se mueve el icono a la nueva posición
  const handleDrop = (row: number, col: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const iconIndexStr = e.dataTransfer.getData("iconIndex");
    const draggedIndex = parseInt(iconIndexStr, 10);
    if (isNaN(draggedIndex) || draggedIndex < 0 || draggedIndex >= draggableIcons.length) {
      return;
    }

    // Buscar si ya hay un icono draggable en la celda destino
    const targetIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);

    if (targetIndex !== -1 && targetIndex !== draggedIndex) {
      const draggedIcon = draggableIcons[draggedIndex];
      const targetIcon = draggableIcons[targetIndex];

      // Si ambos iconos tienen el mismo tipo y símbolo, se fusionan llamando a la API
      if (draggedIcon.type === targetIcon.type && draggedIcon.symbol === targetIcon.symbol) {
        fetch(`http://192.168.11.100:8080/api/v1/emojis?emoji=${encodeURIComponent(targetIcon.symbol)}`)
  .then(response => response.text())
  .then(html => {
    // Parseamos la respuesta HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Suponemos que el emoji es el primer nodo de texto dentro del body
    const emojiText = doc.body.childNodes[0]?.textContent?.trim();
    if (emojiText) {
      setDraggableIcons(prev => {
        const newIcons = [...prev];
        // Ajustamos el índice del icono target según la posición del arrastrado
        const updatedTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
        // Eliminamos el icono arrastrado
        newIcons.splice(draggedIndex, 1);
        // Actualizamos el icono fusionado con el nuevo emoji extraído
        newIcons[updatedTargetIndex] = { ...newIcons[updatedTargetIndex], symbol: emojiText };
        return newIcons;
      });
    } else {
      console.error("No se encontró el emoji en la respuesta de la API");
    }
  })
  .catch(error => {
    console.error("Error al fusionar iconos:", error);
  });


        return;
      }
      return;
    } else if (targetIndex === -1) {
      // Si la celda está vacía, se mueve el icono
      setDraggableIcons(prev => {
        const newIcons = [...prev];
        newIcons[draggedIndex] = { ...newIcons[draggedIndex], row, col };
        return newIcons;
      });
    }
  };

  // Construcción del tablero celda por celda
  const boardCells = [];
  for (let row = 0; row < ROWS; row++) {
    const rowCells = [];
    for (let col = 0; col < COLS; col++) {
      let cellContent: React.ReactNode = null;

      // Si la celda es de IconAdd, se muestra el botón fijo con el emoji base correspondiente
      const iconAddData = ICON_ADD_POSITIONS.find(pos => pos.row === row && pos.col === col);
      if (iconAddData) {
        // Se define el emoji base según el tipo; puedes modificar estos valores si lo requieres
        const baseEmoji = iconAddData.type === "A" ? "💧" : "🔥";
        cellContent = (
          <IconAdd
            symbol={baseEmoji}
            onClick={() => handleIconAddClick(iconAddData.type, baseEmoji)}
          />
        );
      } else {
        // Se verifica si hay un icono draggable en la celda
        const iconIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);
        if (iconIndex !== -1) {
          const iconData = draggableIcons[iconIndex];
          cellContent = (
            <Icon
              symbol={iconData.symbol}
              onDragStart={handleIconDragStart(iconIndex)}
            />
          );
        }
      }

      rowCells.push(
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          onDragOver={handleDragOver}
          onDrop={handleDrop(row, col)}
        >
          {cellContent}
        </Cell>
      );
    }
    boardCells.push(
      <div key={`row-${row}`} style={{ display: "flex", justifyContent: "center" }}>
        {rowCells}
      </div>
    );
  }

  return <div style={boardContainerStyle}>{boardCells}</div>;
};

export default Board;
