import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

import { ModelObject } from "../../models/ModelObject";
import { ModelData } from "../../models/ModelData";

import "./Home.css";

const API_URL = "http://192.168.236.234:8080/objects"; //S'ha de canviar localhost per la IP correcte

function Home() {
    const [objects, setObjects] = useState<ModelObject[]>([]); //Lista dels objectes a mostrar
    const [newObject, setNewObject] = useState<string>(""); //Control de l'input de les dades d'objecte
    const [objectId, setObjectId] = useState<string>(""); //Control de l'input de ID

    useEffect(() => {
        fetchObjects();
    }, []);

    const fetchObjects = async () => {
        //TODO Recuperar tots els objectes amb axiosz
        try {
            const response = await axios.get(API_URL);
            const fetchedObjects: ModelObject[] = response.data.map((obj: { id: string; name: string; data: { photo: string; description: string; price: number } }) =>
                new ModelObject(obj.name, new ModelData(obj.data.photo, obj.data.description, obj.data.price), obj.id)
            );
            setObjects(fetchedObjects);
        } catch (error) {
            console.error("Error al obtener los objetos:", error);
        }
    };

    const fetchObjectById = async () => {
        //TODO Recuperar un objecte per ID amb fetch
        if (!objectId) return;
    try {
        const response = await fetch(`${API_URL}/${objectId}`);
        if (!response.ok) throw new Error("No se encontró el objeto");
        const data = await response.json();
        const fetchedObject = new ModelObject(data.name, new ModelData(data.data.photo, data.data.description, data.data.price), data.id);
        setObjects([fetchedObject]);
    } catch (error) {
        console.error("Error al obtener el objeto por ID:", error);
    }
    };
    

    const createObject = async () => {
        //TODO Crear un objecte per ID amb axios
        if (!newObject) {
            console.error("El objeto está vacío");
            return;
        }
    
        try {
            // Separar los datos CSV: nombre,foto,descripcion,precio
            const [name, photo, description, price] = newObject.split(",");
    
            // Asegurarse de que todos los datos estén presentes
            if (!name || !photo || !description || !price) {
                console.error("Datos incompletos. Asegúrate de ingresar: nombre,foto,descripcion,precio");
                return;
            }
    
            // Convertir el precio a un número
            const priceNumber = parseFloat(price);
    
            // Verificar que el precio sea un número válido
            if (isNaN(priceNumber)) {
                console.error("El precio no es un número válido");
                return;
            }
    
            // Crear el objeto con la estructura correcta
            const payload = {
                name: name.trim(), // Eliminar posibles espacios adicionales
                data: {
                    photo: photo.trim(),
                    description: description.trim(),
                    price: priceNumber
                }
            };
    
            // Hacer la solicitud POST a la API con headers correctos
            const response = await axios.post(API_URL, payload, {
                headers: { "Content-Type": "application/json" }
            });
    
            // Crear una nueva instancia con la respuesta
            const createdObject = new ModelObject(
                response.data.name,
                new ModelData(response.data.data.photo, response.data.data.description, response.data.data.price),
                response.data.id
            );
    
            // Actualizar la lista de objetos
            setObjects([...objects, createdObject]);
            setNewObject(""); // Limpiar el campo de entrada
    
            console.log("Objeto creado correctamente:", createdObject);
        } catch (error) {
            console.error("Error al crear el objeto:", error);
        }
    };

    const updateObject = async (id: string) => {
        //TODO Actualitzar un objecte per ID amb fetch
        if (!id || !newObject) return;
        try {
            // Separar los datos CSV igual que en create
            const [name, photo, description, price] = newObject.split(",");
            
            if (!name || !photo || !description || !price) {
                console.error("Datos incompletos. Formato: nombre,foto,descripcion,precio");
                return;
            }
    
            const priceNumber = parseFloat(price);
            if (isNaN(priceNumber)) {
                console.error("Precio inválido");
                return;
            }
    
            const payload = {
                name: name.trim(),
                data: {
                    photo: photo.trim(),
                    description: description.trim(),
                    price: priceNumber
                }
            };
    
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) throw new Error("Error en la actualización");
    
            await fetchObjects(); // Refrescar la lista
            setNewObject(""); // Limpiar input
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };
    

    const deleteObject = async (id: string) => {
        //TODO Eliminar un objecte per ID amb fetch o axios
        if (!id) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setObjects(objects.filter(obj => obj.id !== id));
    } catch (error) {
        console.error("Error al eliminar el objeto:", error);
    }
    };

    //Actualitzar el valor de l'objecte de l'input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewObject(e.target.value);
    };

    //Actualitzar el valor de l'ID de l'input
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setObjectId(e.target.value);
    };

    return (
        <div className="container">
            <h1>Online Store</h1>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Nom, foto, descripció, preu"
                    value={newObject}
                    onChange={handleInputChange}
                />
                <button onClick={createObject}>Crear producte</button>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="ID producte"
                    value={objectId}
                    onChange={handleIdChange}
                />
                <button onClick={fetchObjectById}>Buscar per ID</button>
            </div>
            <button className="refresh-btn" onClick={fetchObjects}>
                Mostrar tots els productes
            </button>
            <div className="object-list">
                {objects.map((obj) => (
                    <div key={obj.id} className="object-card">
                        <img src={obj.data.photo} alt={obj.name} className="object-photo" />
                        <div className="object-details">
                            <h2>{obj.name}</h2>
                            <p>{obj.data.description}</p>
                            <p className="object-price">{obj.data.getFormattedPrice()}</p>
                            <button onClick={() => updateObject(obj.id!)}>Actualitzar</button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteObject(obj.id!)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
