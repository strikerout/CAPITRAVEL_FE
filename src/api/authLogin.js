import api from './api';

export const login = async (user) =>{
    const response = await api.post('/auth/login', user)
    return response.data;
}