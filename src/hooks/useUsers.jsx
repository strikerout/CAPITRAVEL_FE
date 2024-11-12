import { useState, useEffect } from 'react';
import { createUser, getUsers } from '../api/users';


const useUsers = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(null)

    const addUser = async (newUser) => {
        try{
            setLoading(true);
            await createUser(newUser);
            return null;
        }catch(err){
            const error = err.response || "Unknown error";
            return error;
        } finally {
            setLoading(false);
        }
    }

    const fetchUsers = async () =>{
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            const error = err.response || "Connection error";
            setError(error); 
            return error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return{
        addUser,
        loading,
        error
    };
};

export default useUsers;
