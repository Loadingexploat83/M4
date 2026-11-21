import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCar } from '../api/Api';
import { carKeys } from '../api/carKeys';

const colors = ["Naranja", "Negro", "Calico", "Blanco", "Tabby"];

const esquema = z.object({
    name: z
        .string()
        .min(1, "Su nombre debe tener al menos un caracter"),
    age: z
        .coerce.number({invalid_type_error: "escribe une edad valida"})
        .min(0, "La edad minima es 0"),

    color: z.string().min(1, "Selecciona un color"),
    menaceLevel: z.coerce.number()
        .min(1, "Elige un nivel de amenaza")
        .max(5),
    stinkiness: z.coerce.number()
        .min(1, "Elige un nivel de stinkiness")
        .max(5),
    sleepiness: z.coerce.number()
        .min(1, "Elige un nivel de sleepiness")
        .max(5),
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
    const queryClient = useQueryClient();
  const {
    register, 
    handleSubmit,
    watch,
    reset, 
    formState: {errors}} = useForm({defaultValues:{
        name: "",
        age: "",
        color:"",
        menaceLevel: 3,
        silliness: 3,
        stinkiness: 3,
        sleepiness: 3,
    }, resolver: zodResolver(esquema),
    });

    // Observamos los valores de los slider para poder mostrarlos
    const [menace, stink, sleep, silly] = watch([
        "menaceLevel",
        "stinkiness",
        "sleepiness",
        "silliness",
    ])

    const mutation = useMutation({
        mutationFn: createCar, // la funcion que envia los datos
        onSuccess: () =>{
            queryClient.invalidateQueries({ // esto es para marcar carKeys como "invalida" y hace que el fetchCars se lance y traer la nueva lista
                queryKey: carKeys.lists()}); // vacia el formulario de react-hook-form
            reset();
    }
  })

  const onSubmit = (formData) => { // al hacer submit se mandan los datos a la BD
    mutation.mutate(formData); 
  };

  return (
    <form className='formulario' onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor='name'> Nombre del gatete: </label>
            <input 
                id = "name "
                {...register("name")}
                type="text"
                placeholder='StinkMaster'
            />
            {errors.name && <div role ="alert">{errors.name.message}</div>}
        </div>

        <div>
            <label htmlFor='age'>Edad: </label>
            <input 
                id='age'
                {...register("age")}
                type="text"
                placeholder='Edad numerica'
            />
            {errors.age && <div role = "alert">{errors.age.message}</div>}
        </div>

        <fieldset>
            <legend>Color: </legend>
            {colors.map((colorOption) => (
                <label key={colorOption}>
                    <input {...register("color")}
                        type="radio" 
                        value={colorOption}
                    />{colorOption}
                </label>
            ))}
            
            {errors.color && <div role='alert'>{errors.color.message}</div>}
        </fieldset>
        <div>
            <label htmlFor='menaceLevel'>Nivel de Amenaza ({menace}/5) </label>
            <input 
                id='menaceLevel'
                {...register("menaceLevel", {valueAsNumber: true})}
                type="range"
                min="1"
                max="5"
            />
            
            {errors.menaceLevel && <div role='alert'>{errors.menaceLevel.message}</div>}
        </div>

        <div>
            <label htmlFor='stinkiness'>Stinkiness ({stink}/5) </label>
            <input 
                id='stinkiness'
                {...register("stinkiness", {valueAsNumber: true})}
                type="range"
                min="1"
                max="5"
            />
            
            {errors.stinkiness && <div role="alert">{errors.stinkiness.message}</div>}
        </div>
        
        <div>
            <label htmlFor='sleepiness'>Sleepiness ({sleep}/5) </label>
            <input 
                id='sleepiness'
                {...register("sleepiness", {valueAsNumber: true})}
                type="range"
                min="1"
                max="5"
            />
            
            {errors.sleepiness && <div role='alert'>{errors.sleepiness.message}</div>}
        </div>

        <div>
            <label htmlFor='silliness'>Silliness ({silly}/5) </label>
            <input 
                id='silliness'
                {...register("silliness", {valueAsNumber: true})}
                type="range"
                min="1"
                max="5"
            />
            
            {errors.silliness && <div role='alert'>{errors.silliness.message}</div>}
        </div>

      <button disabled={mutation.isPending} type='submit'>
        {mutation.isPending ?  "Cargando... " : "Enviar"}
        </button>
      {mutation.isSuccess && <div role='status'> Stinker Evaluado con Exito</div>}
      {mutation.isError && <div role ="alert"> {mutation.error.message}</div>}

    </form>
  )
}

export default CatForm
