import React from 'react'
import PrimaryButton from './Buttons/PrimaryButton'

const Search = () => {
  return (
    <div className='search'>
        <form action="">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='Date'/>
            <PrimaryButton type='submit'>Search</PrimaryButton>
        </form>
      
    </div>
  )
}

export default Search
