// Lista de correos electrónicos para validar
const email: string[] = [
    "lorem@gmail.com",        
    "john.doe@example.com",    
    "jane.smith@domain.com",   
    "alice@example.org",     
    "bob@example.net",         
    "charlie.doe@mail.com",    
    "info@company.com",        
    "invalid-email@domain",   
    "user@domain",             
    "@missingusername.com",   
    "username@domain..com"    
];

// Lista de nombres de clientes
const names: string[] = [
    "Paco", 
    "Roger", 
    "Alberto", 
    "Roberto",
    "Carlos", 
    "Sandra", 
    "Javier", 
    "Patricia", 
    "Felipe", 
    "Raquel"
];

// Interfaz para representar los juegos con su propiedad
interface Game {
    item: string;  // Nombre del juego
    prop: string;  // Plataforma del juego
}

// Lista de juegos
let games: Game[] = [
    {item: "Elden Ring", prop: "PC"},
    {item: "Wukong", prop: "PC"},
    {item: "Astro Bot", prop: "PS5"}
];

// Lista de películas
let films: string[] = [
    "Inception", 
    "The Shawshank Redemption", 
    "Parasite"
];

// Función para validar el formato de un correo electrónico utilizando una expresión regular
const validateEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// Función para imprimir los nombres y correos electrónicos si son válidos
function imprimir(names: string[], emails: string[]): void {
    const clients = document.getElementById("clients")!;
    const ul = document.createElement('ul');

    // Iterar sobre los nombres y correos para verificar si el correo es válido
    names.forEach((name, index) => {
        const email = emails[index];
        if (validateEmail(email)) {
            const liElement = document.createElement('li');
            liElement.textContent = `${name} - ${email}`; // Mostrar nombre y correo
            ul.appendChild(liElement);
        }
    });

    clients.appendChild(ul);  // Añadir la lista al DOM
}

// Función para manejar la entrada de almacenamiento y añadir el elemento adecuado
function getStorage(): void {
    const storageid = (<HTMLInputElement>document.getElementById("storage")).value;
    const splitStorage = storageid.split(",");  // Dividir el valor por comas

    // Si el valor contiene más de un elemento, es un juego, de lo contrario es una película
    if (splitStorage.length > 1) {
        games.push({ item: splitStorage[0], prop: splitStorage[1] });
    } else {
        films.push(splitStorage[0]);
    }
}

// Función de sobrecarga para añadir un elemento al almacenamiento y mostrarlo en la tabla
function storage(item: string, prop?: string): string;
function storage(item: string): string;

// Función para añadir un elemento al almacenamiento y mostrarlo en la tabla
function storage(item: string, prop?: string): string {
    const clients = document.getElementById("products")!;
    const ButtonFilms = document.getElementById("ButtonF");
    const ButtonGames = document.getElementById("ButtonG");
    const ButtonBouth = document.getElementById("ButtonB");

    // Configurar los eventos de los botones para filtrar por tipo de contenido
    ButtonFilms?.addEventListener('click', filter);
    ButtonGames?.addEventListener('click', filter);
    ButtonBouth?.addEventListener('click', filter);

    // Crear una tabla si no existe
    let table = clients.querySelector("table");
    if (!table) {
        table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        const headers = ["Juegos"];
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        clients.appendChild(table);
    }

    const tbody = table.querySelector("tbody")!;
    const row = document.createElement("tr");

    // Crear una celda para el item y su propiedad, si existe
    const itemCell = document.createElement("td");
    itemCell.textContent = prop ? `${item} - ${prop}` : item;  // Mostrar item con o sin propiedad
    row.appendChild(itemCell);

    tbody.appendChild(row);  // Añadir la fila a la tabla
    return item;  // Retornar el item añadido
}

// Función para filtrar los elementos según el botón presionado
function filter(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clients = document.getElementById("products")!;
    const table = clients.querySelector("table");
    const tbody = table?.querySelector("tbody");

    // Limpiar las filas anteriores
    tbody!.innerHTML = '';

    if (target.id === "ButtonF") {
        // Mostrar solo las películas
        table!.querySelector("thead")!.innerHTML = '<tr><th>Peliculas</th>';
        films.forEach(film => {
            const row = document.createElement("tr");
            const itemCell = document.createElement("td");
            itemCell.textContent = film;
            row.appendChild(itemCell);
            tbody!.appendChild(row);
        });
    } else if (target.id === "ButtonG") {
        // Mostrar solo los juegos
        table!.querySelector("thead")!.innerHTML = '<tr><th>Juegos</th>';
        games.forEach(game => {
            const row = document.createElement("tr");
            const itemCell = document.createElement("td");
            itemCell.textContent = `${game.item} - ${game.prop}`;
            row.appendChild(itemCell);
            tbody!.appendChild(row);
        });
    } else {
        // Mostrar tanto películas como juegos
        table!.querySelector("thead")!.innerHTML = '<tr><th>Peliculas</th><th>Juegos</th>';

        // Obtener la longitud máxima entre películas y juegos
        const maxLength = Math.max(films.length, games.length);

        // Iterar hasta el máximo de elementos
        for (let i = 0; i < maxLength; i++) {
            const row = document.createElement("tr");

            // Añadir película a la primera columna, si existe
            const itemCell = document.createElement("td");
            itemCell.textContent = films[i] || '';  // Si no hay película, dejar espacio vacío
            row.appendChild(itemCell);

            // Añadir juego a la segunda columna, si existe
            const propCell = document.createElement("td");
            propCell.textContent = games[i] ? `${games[i].item} - ${games[i].prop}` : '';  // Si no hay juego, dejar espacio vacío
            row.appendChild(propCell);

            tbody!.appendChild(row);  // Añadir la fila a la tabla
        }
    }
}

// Inicializar el contenido y las tablas
function charge(): void {
    imprimir(names, email);  // Imprimir nombres y correos

    // Añadir juegos a la tabla
    games.forEach(game => {
        storage(game.item, game.prop);
    });
}
