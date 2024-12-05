import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import { FaTimes } from 'react-icons/fa';

const CategoriesHome = ({ selectedCategories, setSelectedCategories, fetchExperiences }) => {
  const { categories } = useCategories();
  const [categoryColors, setCategoryColors] = useState({});

  useEffect(() => {
    const colors = categories.reduce((acc, category) => {
      acc[category.id] = getRandomColor();
      return acc;
    }, {});
    setCategoryColors(colors);
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter(id => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    fetchExperiences();
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="categoriesHome">
      <div className="categories-list-wrapper">
        <ul className="categories-list">
          {categories.map((category) => (
            <li
              key={category.id}
              style={{
                backgroundColor: categoryColors[category.id] ? categoryColors[category.id] : '#000',
                border: selectedCategories.includes(category.id) ? '2.5px solid #562210' : 'none',
                boxShadow: categoryColors[category.id]? '0px 2px 0px 0px #562210' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className="clear-filters-btn" onClick={handleClearFilters}>
        <FaTimes />
      </button>
    </div>
  );
};

export default CategoriesHome;
