
document.addEventListener('DOMContentLoaded', () => {
    let counter = 1;

    const addButton = document.getElementById('addButton') as HTMLButtonElement;
    const itemList = document.getElementById('itemList') as HTMLUListElement;

    const addItem = () => {
        const newItem = document.createElement('li');
        newItem.textContent = `Element ${counter}`;
        itemList.appendChild(newItem);
        counter++;
    };

    addButton.addEventListener('click', addItem);
});