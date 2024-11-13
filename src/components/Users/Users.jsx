import React from 'react';
import useUsers from '../../hooks/useUsers';
import styles from './Users.module.css'; // Asegúrate de que la ruta sea correcta

const Users = () => {
    const { users, loading, error, handleUpdateUserRole } = useUsers();

    const handleRoleToggle = (email, isAdmin) => {
        const newRole = isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';
        handleUpdateUserRole(email, newRole);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className='adminList'>
                <div className='headerList usersList'>
                    <h4>ID</h4>
                    <h4>Name</h4>
                    <h4>Lastname</h4>
                    <h4>Email</h4>
                    <h4>ADMIN</h4>
                </div>
                <ul className='bodyList usersBody'>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.lastName}</p>
                            <p>{user.email}</p>
                            <label className={styles.switch}>
                                <input 
                                    type="checkbox" 
                                    checked={user.role.name === "ROLE_ADMIN"} 
                                    onChange={(e) => handleRoleToggle(user.email, e.target.checked)} 
                                />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Users;
