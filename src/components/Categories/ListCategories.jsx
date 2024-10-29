import React, { useState } from 'react';
import useCategories from '../../hooks/useCategories';

const CategoriesList = () => {
  const { fetchCategoryByID, categories, loading, error, addCategory, removeCategory } = useCategories();
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' });
  const [updatedCategory, setUpdatedCategory] = useState('');

  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory({ name: '', description: '', image: '' }); // Limpiar el formulario
  };

  const handleRemoveCategory = (id) => {
    removeCategory(id);
  };

  const handleEditCategory = async (id) =>{
    const edit = await fetchCategoryByID(id)
    console.log(edit);
    setNewCategory(edit)
    // editCategory(id, updatedCategory);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Lista de Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleRemoveCategory(category.id)}>Eliminar</button>
            <button onClick={() => handleEditCategory(category.id, updatedCategory)}>Editar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nueva Categoría</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Imagen"
        value={newCategory.image}
        onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
      />
      <button onClick={handleAddCategory}>Agregar Categoría</button>
    </div>
  );
};

export default CategoriesList;
