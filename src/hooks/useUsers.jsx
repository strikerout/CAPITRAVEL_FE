import { useState, useEffect } from 'react';
import { createUser, getUsers , updateUserRole} from '../api/users';


const useUsers = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

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
            setLoading(true);
            const response = await getUsers();
            const data = await response.json(); 
            setUsers(data);
        } catch (err) {
            const error = err.response || "Connection error";
            setError(error); 
            return error;
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateUserRole = async (email, newRole) => {
        try {
            const response = await updateUserRole(email, newRole);
            if (response.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.email === email ? { ...user, role: { name: newRole } } : user
                    )
                );
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update user role');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return{
        users,
        addUser,
        handleUpdateUserRole,
        loading,
        error
    };
};

export default useUsers;
