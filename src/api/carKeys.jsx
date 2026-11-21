export const carKeys = { // Esto es para guardar todos los gatetes bajo las etiquetas de cars y list
  all: ["cars"], 
  lists: () => [...carKeys.all, "list"],
}