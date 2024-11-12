import React from 'react'
import useUsers from '../../hooks/useUsers'

const Users = () => {
    // const {users} = useUsers();
    const users = [
        {
            id: 1,
            name: 'Carlos',
            lastName: 'Colmenares',
            email: 'carlos@gmail.com',
            role: {
                id: 2,
                name: "ROLE_ADMIN"
            }
        },
        {
            id: 2,
            name: 'Daniel',
            lastName: 'Chacon',
            email: 'danielElTravieso@gmail.com',
            role: {
                id: 2,
                name: "ROLE_ADMIN"
            }
        },
        {
            id: 3,
            name: 'Yessy',
            lastName: 'Silvera',
            email: 'acaparaPipe@gmail.com',
            role: {
                id: 1,
                name: "ROLE_USER"
            }
        },
        {
            id: 4,
            name: 'Chiara',
            lastName: 'Pozzi',
            email: 'reparteTabla@gmail.com',
            role: {
                id: 2,
                name: "ROLE_ADMIN"
            }
        },
        {
            id: 5,
            name: 'Fabio',
            lastName: 'Gadea',
            email: 'rompeTodo@gmail.com',
            role: {
                id: 1,
                name: "ROLE_USER"
            }
        },
        {
            id: 6,
            name: 'Luis',
            lastName: 'Soto',
            email: 'esteSegunHaceLoDeInfra@gmail.com',
            role: {
                id: 1,
                name: "ROLE_USER"
            }
        },
        {
            id: 7,
            name: 'Romina',
            lastName: '',
            email: 'laMejorBackend@gmail.com',
            role: {
                id: 1,
                name: "ROLE_USER"
            }
        },
        {
            id: 8,
            name: 'Lina',
            lastName: '',
            email: 'creoQueDibujaBonito@gmail.com',
            role: {
                id: 1,
                name: "ROLE_USER"
            }
        },
    ]
  return (
    <div>
        <div className='adminList'>
        <div className='headerList usersList'>
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Lastname</h4>
          <h4>Email</h4>
          <h4>Role</h4>
        </div>
        <ul className='bodyList usersBody'>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
              <p>{user.role.name == "ROLE_ADMIN" ? 'ADMIN' : 'USER' }</p>

              <div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"/><path fill="currentColor" d="m5 16l-1 4l4-1L18 9l-3-3z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l3 3m-5 11h8"/></g></svg>

                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 12 12"><path fill="#EB5436" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"/></svg>

              </div>
            </li>
          ))}
        </ul>
      </div> 
    </div>
  )
}

export default Users;
