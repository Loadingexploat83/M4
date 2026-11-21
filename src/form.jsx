import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'

const levelRange = ["1", "2", "3", "4", "5"]

const esquema = z.object({
    name: z.string(),
    age: z.number(),
    color: z.string(),
    menaceLevel: z.coerce.number(),
    stinkiness: z.coerce.number(),
    sleepiness: z.coerce.number(),
    silliness: z.coerce.number(),


})

function CatForm() {
  const {register, handleSubmit,
    setError, 
    formState: {errors, isSubmitting}} = useForm({defaultValues:{
        name: "",
        age: "",
        color:"",
        menaceLevel:"",
        stinkiness:"",
        sleepiness:"",
        silliness:"",
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
            <label htmlFor='age'>Edad</label>
            <input {...register("age", {valueAsNumber: true})}type="range"
            min="0"
            max="25"
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
            {levelRange.map((level) => (
                <label key={level}>
                    <input {...register("menaceLevel")}
                        type="radio" 
                        value={level}
                    />
                    {level}
                </label>
            ))}
            
            {errors.color && <div>{errors.color.message}</div>}
        </div>

        <div>
            <label htmlFor='stinkiness'>Stinkines: </label>
            {levelRange.map((level) => (
                <label key={level}>
                    <input {...register("stinkiness")}
                        type="radio" 
                        value={level}
                    />
                    {level}
                </label>
            ))}
            
            {errors.color && <div>{errors.color.message}</div>}
        </div>
        
        <div>
            <label htmlFor='sleepiness'>Sleepiness: </label>
            {levelRange.map((level) => (
                <label key={level}>
                    <input {...register("sleepiness")}
                        type="radio" 
                        value={level}
                    />
                    {level}
                </label>
            ))}
            
            {errors.color && <div>{errors.color.message}</div>}
        </div>

        <div>
            <label htmlFor='silliness'>Silliness: </label>
            {levelRange.map((level) => (
                <label key={level}>
                    <input {...register("silliness")}
                        type="radio" 
                        value={level}
                    />
                    {level}
                </label>
            ))}
            
            {errors.color && <div>{errors.color.message}</div>}
        </div>

      <button disabled={isSubmitting} type='submit'>{isSubmitting ?  "Cargando... " : "Enviar"}</button>
      {errors.root && <div>{errors.root.message}</div>}

    </form>
  )
}

export default CatForm
