import React from 'react'


export const AddCaregory = () => {
  return (
    <form id="jsonForm">
        <h3>Agregar categorias</h3>

        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required/>

        <label for="description">Descripción:</label>
        <input type="text" id="description" name="description" required/>

        <label for="image">Imagen:</label>
        <input type="text" id="image" name="image" required/>

        <button type="button">Agregar</button>
    </form>
  )
}
