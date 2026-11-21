import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCars, createCar } from './api/Api.jsx'


import './App.css'
import CatForm from './form.jsx'

const carKeys = {
  all: ["cars"],
  lists: () => [...carKeys.all, "list"],
}

function App() {  
  return (
    <>
      <h1> RateACar</h1>
      <CatForm/>
    </>
    
  )
}

export default App
