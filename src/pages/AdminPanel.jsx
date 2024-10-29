import React from 'react'
import Categories from '../components/Categories/Categories'
import Properties from '../components/Properties/Properties'

const AdminPanel = () => {
  return (
    <div className='adminPanel'>
        <h2>Dashboard</h2>

      
      <Categories/>
      <Properties/>
    </div>
  )
}

export default AdminPanel
