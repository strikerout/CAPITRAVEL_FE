import api from './api';

// Obtener todas las experiencias
export const getExperiences = async (categoryIds = []) => {
    let url = '/experiences';
    if (categoryIds.length > 0) {
        url += `?categoryIds=${categoryIds.join(',')}`;
    }
    const response = await api.get(url);
    return response.data;
};

// Obtener una experiencia por ID
export const getExperienceByID = async (id) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
};

// Crear una nueva experiencia
export const createExperience = async (experience) => {
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const response = await api.put(`/experiences/${id}`, updatedExperience, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

// Eliminar una experiencia
export const deleteExperience = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/experiences/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

export const createReviewApi= async (experienceId, email, rating, message ) => {
    const token = localStorage.getItem("token");
    const response = await api.post(`/experiences/reputation/${experienceId}/${email}?rating=${rating}`, message,  
    {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

export const alredyReviewed = async (experienceId, email) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/experiences/reputation/${experienceId}/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
};

export const getAllReviews = async (experienceId) => {
    const response = await api.get(`/experiences/reputation/${experienceId}`);
    return response.data;
};