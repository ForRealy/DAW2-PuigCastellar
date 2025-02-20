import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(1);
  const [items, setItems] = useState<number[]>([]);

  const addItem = () => {
    
    setItems(prevItems => [...prevItems, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul id="itemList">
        {items.map((item) => (
          <li key={item}>Element {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;