import React from 'react'
import Categories from '../components/Categories/Categories'
import Properties from '../components/Properties/Properties'
import Experiences from '../components/Experiences/Experiences'

const AdminPanel = () => {
  return (
    <div className='adminPanel'>
        <h2>Dashboard</h2>

      <Experiences/>
      <Categories/>
      <Properties/>
    </div>
  )
}

export default AdminPanel
