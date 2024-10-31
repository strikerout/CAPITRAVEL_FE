import React from 'react'
import useCategories from '../hooks/useCategories';

const CategoriesHome = () => {
  const {categories} = useCategories();

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className='categoriesHome'>
      <ul>
          {categories.slice(0, 4).map((category) => (
            <li key={category.id} style={{backgroundColor:getRandomColor()}}>
              <p>{category.name}</p>
            </li>
          ))}
          <li style={{backgroundColor:getRandomColor()}}>
            <p>More+</p>
          </li>
        </ul>
      
    </div>
  )
}

export default CategoriesHome
