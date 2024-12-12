import api from './api';

export const getProperties = async () => {
    const response = await api.get('/properties');
    return response.data;
};

export const getPropertyByID = async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};

export const createProperty = async (property) => {
    const token = localStorage.getItem("token");
    const response = await api.post('/properties', property, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

export const updateProperty = async (id, updatedProperty) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/properties/${id}`, updatedProperty, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};

export const deleteProperty = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/properties/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    },);
    return response.data;
};
