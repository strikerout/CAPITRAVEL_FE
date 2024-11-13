import api from './api';

const token = localStorage.getItem("token");

// Obtener todas las experiencias
export const getExperiences = async () => {
    const response = await api.get('/experiences');
    return response.data;
};

// Obtener una experiencia por ID
export const getExperienceByID = async (id) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
};

// Crear una nueva experiencia
export const createExperience = async (experience) => {
    const response = await api.post('/experiences', experience,  
    {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

// Actualizar una experiencia existente
export const updateExperience = async (id, updatedExperience) => {
    const response = await api.put(`/experiences/${id}`, updatedExperience, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

// Eliminar una experiencia
export const deleteExperience = async (id) => {
    const response = await api.delete(`/experiences/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};
