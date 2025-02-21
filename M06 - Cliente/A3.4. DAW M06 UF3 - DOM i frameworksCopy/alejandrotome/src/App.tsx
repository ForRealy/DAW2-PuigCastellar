import React, { useState } from "react";
import './App.css';

function App() {

  type Photo = {
    url: string;
    title: string;
  }

  // Afegim més fotos inicials per demostrar el slider
  const [photos, setPhotos] = useState<Photo[]>([
    { url: "/gats.jpg", title: "Gats" },
    { url: "/gossets.jpg", title: "Gossets" },
    { url: "/ocell.jpg", title: "Ocell" }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [newUrl, setNewUrl] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  // Slider infinit amb mòdul (%)
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  // Afegir nova foto (en comptes de modificar)
  const handleUpdatePhoto = () => {
    if (newUrl && newTitle) {
      setPhotos(prev => [...prev, { url: newUrl, title: newTitle }]);
      setCurrentIndex(photos.length);  
      setNewUrl("");
      setNewTitle("");
    }
  };

  return (
    <div>
      <div>
        <img
          src={photos[currentIndex].url}
          alt={photos[currentIndex].title}
          style={{ maxWidth: "500px" }}
        />
        <h3>{photos[currentIndex].title}</h3>
      </div>
      <div>
        <button onClick={handlePrevious}>Anterior</button>
        <button onClick={handleNext}>Següent</button>
      </div>
      <div>
        <h4>Afegir Nova Foto</h4>
        <input
          type="text"
          placeholder="URL de la imatge"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Títol de la imatge"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleUpdatePhoto}>Afegir Foto</button>
      </div>
    </div>
  );
}

export default App;