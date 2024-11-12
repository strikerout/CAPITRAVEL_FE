import api from './api';

const token = localStorage.getItem("token");
console.log(token);

export const createUser = async (user) => {
    const response = await api.post('/users/register', user)
    return response;
}

export const getUsers = async () => {
    // const response = await api.get('/users',{
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //     },
    //     }
    // )
    await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    .then(response => console.log(response.json()))
}

export const getUserByEmail = async (email) => {
      const response = await api.get(`/users/${email}`,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        }
    )
    return response;
}

export const updateUserRole = async (email, newRole) =>{
    const response = await api.post(`/users/role?email=${email}&roleName${newRole}`,{
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
    })
    return response;
}