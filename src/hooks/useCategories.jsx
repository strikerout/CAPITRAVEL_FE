import { useEffect, useState } from 'react';
import { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory } from '../api/categories';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryByID = async (id) => {
      try {
          const category = await getCategoryByID(id);
          return category;
      } catch (err) {
          const error = err.response || "Unknown error";
          setError(error); 
          return error;
      }finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



  // Agregar una nueva categoría
  const addCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);
      setCategories((prev) => [...prev, newCategory]);
      return null; 
    } catch (err) {
      const error = err.response || "Unknown error";
      setError(error); 
      return error;
    }
  };

  // Actualizar una categoría existente
  const editCategory = async (id, updatedCategory) => {
    try {
      const updated = await updateCategory(id, updatedCategory);
      setCategories((prev) =>
        prev.map((category) => (category.id === id ? updated : category))
      );
      return null; 
    } catch (err) {
      const error = err.response || "Unknown error";
      setError(error); 
      return error;
    }
  };

  // Eliminar una categoría
  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      return null; 
    } catch (err) {
      const error = err.response || "Unknown error";
      setError(error); 
      return error;
    }
  };

  return {fetchCategories, fetchCategoryByID, categories, category, loading, error, addCategory, editCategory, removeCategory };
};

export default useCategories;
