import api from './api';

export const createUser = async (user) => {
    const response = await api.post('/users/register', user)
    return response;
}

export const getUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://capitravelbackcopy-production.up.railway.app", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    return response;
}

export const getUserByEmail = async (email) => {
    const token = localStorage.getItem("token");

      const response = await api.get(`/users/${email}`,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        }
    )
    return response;
}

export const updateUserRole = async (email, newRole) => {
    const token = localStorage.getItem("token");

    const response = await api.post(`/users/role/${email}?roleName=${newRole}`, null, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    )
    return response;
}

export const resendEmailApi = async (userData) => {
    const response = await api.post(`/emails`, userData)
    return response;
}