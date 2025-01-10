"use strict";
// Función para cambiar el tema mediante estilos en línea
function changeTheme(theme) {
    const helpDiv = document.getElementById('help'); // Obtener el <div> con id 'help'
    // Aplicar estilos según el tema seleccionado
    switch (theme) {
        case 'black':
            helpDiv.style.backgroundColor = '#607d8b';
            break;
        case 'red':
            helpDiv.style.backgroundColor = '#f44336';
            break;
        case 'blue':
            helpDiv.style.backgroundColor = '#2196f3';
            break;
        default:
            helpDiv.style.backgroundColor = '#8bc34a';
            break;
    }
}
// Detectar botones con el atributo name igual a "theme"
const themeButtons = document.querySelectorAll('button[name="theme"]');
// Agregar un evento de clic a cada botón de tema
themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeTheme(button.value); // Llamar a la función para cambiar el tema
    });
});
