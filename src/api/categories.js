import api from './api';

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryByID = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

export const createCategory = async (category) => {
  const token = localStorage.getItem("token");
  const response = await api.post('/categories', category,  
    {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    
  return response.data;
};

export const updateCategory = async (id, updatedCategory) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/categories/${id}`, updatedCategory, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/categories/${id}`, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
},);
  return response.data;
};

