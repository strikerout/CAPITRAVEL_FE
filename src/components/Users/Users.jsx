import React from 'react'

const Users = () => {
    const users = [
        {
            id: 1,
            name: 'Carlos',
            lastname: 'Colmenares',
            email: 'carlos@gmail.com'
        },
        {
            id: 2,
            name: 'Daniel',
            lastname: 'Chacon',
            email: 'danielElTravieso@gmail.com'
        },
        {
            id: 3,
            name: 'Yessy',
            lastname: 'Silvera',
            email: 'acaparaPipe@gmail.com'
        },
        {
            id: 4,
            name: 'Chiara',
            lastname: 'Pozzi',
            email: 'reparteTabla@gmail.com'
        },
        {
            id: 5,
            name: 'Fabio',
            lastname: 'Gadea',
            email: 'rompeTodo@gmail.com'
        },
        {
            id: 6,
            name: 'Luis',
            lastname: 'Soto',
            email: 'esteSegunHaceLoDeInfra@gmail.com'
        },
        {
            id: 7,
            name: 'Romina',
            lastname: '',
            email: 'laMejorBackend@gmail.com'
        },
        {
            id: 8,
            name: 'Lina',
            lastname: '',
            email: 'creoQueDibujaBonito@gmail.com'
        },
    ]
  return (
    <div>
        <div className='adminList'>
        <div className='headerList'>
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Lastname</h4>
          <h4>Email</h4>
        </div>
        <ul className='bodyList'>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.lastname}</p>
              <p>{user.email}</p>

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
