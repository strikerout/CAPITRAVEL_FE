import api from './api';

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
    const response = await api.post('/experiences', experience);
    return response.data;
};

// Actualizar una experiencia existente
export const updateExperience = async (id, updatedExperience) => {
    const response = await api.put(`/experiences/${id}`, updatedExperience);
    return response.data;
};

// Eliminar una experiencia
export const deleteExperience = async (id) => {
    const response = await api.delete(`/experiences/${id}`);
    return response.data;
};
