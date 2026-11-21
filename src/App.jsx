import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCars, toggleCorruptData, simulateCorruptData } from './api/Api.jsx'
import { carKeys  } from './api/carKeys.jsx'

import './App.css'
import CatForm from './components/form.jsx'



function App() { 
  const queryClient = useQueryClient(); // pillamos el queryClient que hay en main.jsx
  const [corruptMode, setCorruptMode] = useState(simulateCorruptData);
  const {
    data: cars = [], // renombra data a cars y le pone un array vacio por defecto
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: carKeys.lists(), // esto es para que TanStack Query guarde el resultado en la cache, con las etiquetas de 'cars' y 'list'
    queryFn: fetchCars, // la funcion que devuelve la promesa con los gatos
  })
  const handleToggleCorrupt = () => {
    toggleCorruptData(); // cambia la variable en api
    setCorruptMode(simulateCorruptData); // actualiza el estado visual del boton
    queryClient.invalidateQueries( {queryKey: carKeys.lists()}) // volvemos a pedir los datos
  }



  return (
    <>
      <header>
         <h1> Rate-A-Car</h1>
         <button type="button" onClick={handleToggleCorrupt}>
          {corruptMode ? "Desactivar API corrupta" : "Simular API corrupta"}
        </button>
      </header>
     
      <CatForm/>

      <hr/>
      <section>
        <h2>Gatetes Evaluados</h2>
        {isLoading && <p>Cargando gatetes...</p>}
        {isError && <p role="alert">Error: {error.message}</p>}
        {!isLoading && !isError && (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                <strong>{car.name}</strong> ({car.color}, {car.age} años) — Total:{" "}
                {car.scores.total}/100 [Agente del Caos: {car.scores.chaos}% | Stinkiness: {car.scores.stink}% | Coziness: {car.scores.cozy}% | Encantador: {car.scores.sweetheart}%]
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
    
  );
}

export default App
