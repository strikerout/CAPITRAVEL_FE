import React, { useState, useEffect } from 'react';
import useCategories from '../../../hooks/useCategories';
import { FaTimes } from 'react-icons/fa';
import styles from './categoriesHome.module.scss'

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
    <div className={styles.categoriesHome}>
      <div className={styles.categories_list_wrapper}>
        <ul className={styles.categories_list}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={ selectedCategories.includes(category.id) ? styles.selected : ''}
              style={{
                backgroundColor: categoryColors[category.id] || '#000',
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.clear_filters_btn}onClick={handleClearFilters}>
        <FaTimes />
      </button>
    </div>
  );
};

export default CategoriesHome;
