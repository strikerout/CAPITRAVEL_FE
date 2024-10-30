import React, { useState } from 'react';
import useCategories from '../../hooks/useCategories';
import Properties from '../Properties/Properties';

const AddExperience = () => {
    const [newExperience, setNewExperience] = useState ({title: '',
        description: '',
        country: '',
        ubication: '', 
        category: '',
        properties: '',
        duration: '',
        image: ''
    });

    const handleAddExperience = () => {
        addExperience(newExperience);
        setNewExperience({
            title: '',
            description: '',
            country: '',
            ubication: '',
            category: '',
            properties: '',
            duration: '',
            image: '' }); 
    };

    const handleRemoveExperience = (id) => {
        const confirm = window.confirm("Sure to delete this experience?");
        if (confirm) {
            removeExperience(id);
            console.log("Elemento eliminado");
        } else {
            console.log("Cancelado")
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperienceData({
            ...experienceData,
            [name]: value
        });
    };

    const handleCategoryChange = (selectedCategory) => {
        setExperienceData({
            ...experienceData,
            category: selectedCategory
        });
    };

    const handlePropertyChange = (selectedProperty) => {
        setExperienceData({
            ...experienceData,
            properties: selectedProperty
        });
    };


}