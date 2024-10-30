import React, { useState } from 'react';
import useCategories from '../../hooks/useCategories';
import Properties from '../Properties/Properties';
import useExperiences from '../../hooks/useExperience';

const Experiences = () => {
    const {fetchExperiences, fetchExperienceByID, addExperience, experiences, loading, error,  updateExistingExperience, removeExperience} = useExperiences();

    const [newExperience, setNewExperience] = useState (
        {title: '',
        country: '',
        ubication: '', 
        description: '',
        duration: '',
        images: '',
        category: '',
        properties: '',
      
    });

    const handleAddExperience = () => {
        addExperience(newExperience);
        setNewExperience(
        {title: '',
        country: '',
        ubication: '', 
        description: '',
        duration: '',
        images: '',
        category: '',
        properties: '',
      
    }); 
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

    return(
        <>
         <h3>Experiences</h3>
         <section>
            <form className='adminForm'>
                <div>
                    <h5>About the Experience</h5>
                    <div>
                        <label for='title'>Title</label>
                        <input
                        type="text"
                        placeholder="Enter a title"
                        id='title'
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                        required
                        />
                    </div>

                    <div>
                        <label for='description'> Description</label> 
                        <p>0/500</p>
                        <textarea 
                        name='description'
                        placeholder="Enter a description"
                        />
                    </div>
                    
                </div>

                <div>
                    <h5>Where is it?</h5>
                    <div>
                        <label for='country'>Country</label>
                        <input
                        type="text"
                        placeholder="Enter country name"
                        id='country'
                        value={newExperience.country}
                        onChange={(e) => setNewExperience({ ...newExperience, country: e.target.value })}
                        required
                        />
                    </div>
                    <div>
                        <label for='ubication'>ubication</label>
                        <input
                        type="text"
                        placeholder="City, state/region"
                        id='ubication'
                        value={newExperience.ubication}
                        onChange={(e) => setNewExperience({ ...newExperience, ubication: e.target.value })}
                        required
                        />
                    </div>
                </div>

                <div>
                    <h5>Specifications</h5>
                    <div>
                       {/* select category */}
                       {/* espacio para renderizar los tags*/}
                    </div>

                    <div>
                        {/* select properties */}
                        {/* espacio para renderizar los tags*/}
                    </div>
                </div>
                
                <div>
                    <h5>Duration</h5>
                       {/* select duration */}
                </div>

                <div>
                    <h5>Add Images</h5>
                </div>
            </form>
            <div>
                <div>
                    header
                </div>
                <ul>

                </ul>
            </div>
         </section>
        </>
    )
}

export default Experiences