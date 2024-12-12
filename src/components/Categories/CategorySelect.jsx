import React, { useEffect } from 'react';
import useCategories from '../../hooks/useCategories';

const CategorySelect = ({ value, onChange }) => {
    const { fetchCategories, categories, loading, error } = useCategories();

    useEffect(() => {
        fetchCategories(); 
    }, []);

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories: {error.message}</div>;

    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default CategorySelect;
