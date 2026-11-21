import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'

const levelRange = ["1", "2", "3", "4", "5"]

const esquema = z.object({
    name: z
        .string()
        .min(1, "Su nombre debe tener al menos un caracter"),
    age: z
        .coerce.number()
        .min(0, "La edad minima es 0"),
    color: z.string().min(1, "Selecciona un color"),
    menaceLevel: z.coerce.number()
        .min(1, "Elige un nivel de amenaza")
        .max(5),
    stinkiness: z.coerce.number()
        .min(1, "Elige un nivel de stinkiness")
        .max(5),
    sleepiness: z.coerce.number()
        .min(1, "Elige un nivel de sleepiness"),
    silliness: z.coerce.number()
        .min(1, "Elige un nivel de silliness")
        .max(5),

}).refine(  
    (data) => !(data.color == "Naranja" && data.menaceLevel < 4),
    {
        message: "TODOS LOS GATETES NARANJAS SON AL MENOS UNA AMENAZA DE NIVEL 4",
        path: ["menaceLevel"], // Esto es para definir donde esta el error
    }
);

function CatForm() {
  const {register, handleSubmit,
    setError, 
    formState: {errors, isSubmitting}} = useForm({defaultValues:{
        name: "",
        age: "",
        color:"",
    }, resolver: zodResolver(esquema),
    });
  const onSubmit = async (data) => {
    try{
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data);

    } catch(error){
        setError("root", {
            message: "Nuh uh :3",
        })
    }

  };
  

  return (
    <form className='formulario' onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor='name'> Nombre del gatete: </label>
            <input {...register("name")}
             type="text"
            placeholder='StinkMaster'
            />
            {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div>
            <label htmlFor='age'>Edad: </label>
            <input {...register("age", {valueAsNumber: true})}
                type="text"
                placeholder='Edad numerica'
            />
            {errors.age && <div>{errors.age.message}</div>}
        </div>

        <div>
            <label htmlFor='color'>Color: </label>
            {["Naranja", "Negro", "Calico", "Blanco", "Tabby"].map((colorOption) => (
                <label key={colorOption}>
                    <input {...register("color")}
                        type="radio" 
                        value={colorOption}
                    />{colorOption}
                </label>
            ))}
            
            {errors.color && <div>{errors.color.message}</div>}
        </div>
        <div>
            <label htmlFor='menaceLevel'>Nivel de Amenaza: </label>
            <input {...register("menaceLevel", {valueAsNumber: true})}type="range"
                min="1"
                max="5"
            />
            
            {errors.menaceLevel && <div>{errors.menaceLevel.message}</div>}
        </div>

        <div>
            <label htmlFor='stinkiness'>Stinkiness: </label>
            <input {...register("stinkiness", {valueAsNumber: true})}type="range"
                min="1"
                max="5"
            />
            
            {errors.stinkiness && <div>{errors.stinkiness.message}</div>}
        </div>
        
        <div>
            <label htmlFor='sleepiness'>Sleepiness: </label>
            <input {...register("sleepiness", {valueAsNumber: true})}type="range"
                min="1"
                max="5"
            />
            
            {errors.sleepiness && <div>{errors.sleepiness.message}</div>}
        </div>

        <div>
            <label htmlFor='silliness'>Silliness: </label>
            <input {...register("silliness", {valueAsNumber: true})}type="range"
                min="1"
                max="5"
            />
            
            {errors.silliness && <div>{errors.silliness.message}</div>}
        </div>

      <button disabled={isSubmitting} type='submit'>{isSubmitting ?  "Cargando... " : "Enviar"}</button>
      {errors.root && <div>{errors.root.message}</div>}

    </form>
  )
}

export default CatForm
