import { z } from "zod"

const carResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    color: z.string(),
    scores: z.object({
        chaos: z.number(),
        stink: z.number(),
        cozy: z.number(),
        sweetheart: z.number(),
        total: z.number(),
    })
});

const carListSchema = z.array(carResponseSchema);

let CarDB = [
    {
        id: "1",
        name: "StinkMaster",
        age: 3,
        color: "Naranja",
        scores: {chaos: 80, stink: 100, cozy: 10, sweetheart: 0, total: 80},
    },

];

// Para probar el bonus de datos corruptos
export let simulateCorruptData = false;
export const toggleCorruptData = () => {
    simulateCorruptData = !simulateCorruptData;
}

// GET: Conseguir gatetes
export async function fetchCars(params) {
    await new Promise((r) => setTimeout (r, 600)); // el timeout es para mostrar la barra de carga

    const rawData = simulateCorruptData ? 
        [{id: 123, name: null, scores: "ROTO"}] // para mostrar que pasa si se rompe
        : CarDB; // si no queremos mostrar que pasa si se rompe, usamos la BD de verdad
    
    const parsed = carListSchema.safeParse(rawData);

    if(!parsed.success){
        console.error("Zod atrapo un dato corrupto en la API", parsed.error);
        throw new Error("Respuesta corrupta del servidor (atrapada por el Zod SafeParse)");
    }
    return parsed.data;
}

// POST:  Crear gatetes y darles su querido score
export async function createCar(newCar){
    await new Promise((r) => setTimeout (r, 600));

    const scores = {
        chaos: Math.round(((newCar.menaceLevel + newCar.silliness) / 10) * 100),
        stink: newCar.stinkiness * 20,
        cozy: Math.round(Math.max(0, (newCar.sleepiness + newCar.silliness - Math.floor(newCar.stinkiness / 2)) / 10) * 100),
        sweetheart: newCar.silliness *20,
        total: Math.round(((newCar.menaceLevel + newCar.stinkiness + newCar.sleepiness + newCar.silliness) / 20) * 100),
    };

    const created = {
        id: crypto.randomUUID(),
        name: newCar.name,
        age: newCar.age,
        color: newCar.color,
        scores
    };

    CarDB = [created, ...CarDB];
    return created;

}