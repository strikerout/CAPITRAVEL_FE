import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import useProperties from "../../hooks/useProperties";
import useExperiences from "../../hooks/useExperience";

const Experiences = () => {
  const {
    fetchExperiences,
    fetchExperienceByID,
    addExperience,
    experiences,
    loading,
    error,
    updateExistingExperience,
    removeExperience,
  } = useExperiences();

  const { properties } = useProperties();
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);


  const [newExperience, setNewExperience] = useState({
    title: "",
    country: "",
    ubication: "",
    description: "",
    duration: "",
    images: [],
    categories: [],
    properties: [],
  });

  const handleAddExperience = () => {
    addExperience(newExperience);
    setNewExperience({
      title: "",
      country: "",
      ubication: "",
      description: "",
      duration: "",
      images: [],
      categories: [],
      properties: [],
    });
  };

  const handleRemoveExperience = (id) => {
    const confirm = window.confirm("Sure to delete this experience?");
    if (confirm) {
      removeExperience(id);
      console.log("Elemento eliminado");
    } else {
      console.log("Cancelado");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

//   const handleCategoryChange = (selectedCategory) => {
//     setExperienceData({
//       ...experienceData,
//       category: selectedCategory,
//     });
//   };

//   const handlePropertyChange = (selectedProperty) => {
//     setExperienceData({
//       ...experienceData,
//       properties: selectedProperty,
//     });
//   };


  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddCategory = () => {
    const categoryToAdd = categories.find(
      (category) => category.id === Number(selectedCategory)
    );
    if (
      categoryToAdd &&
      !selectedCategories.some((category) => category.id === categoryToAdd.id)
    ) {
      const updatedCategories = [...selectedCategories, categoryToAdd];
      setSelectedCategories(updatedCategories);
      setNewExperience({
        ...newExperience,
        categories: updatedCategories,
      });
      setSelectedCategory(""); 
    }
  };

  const handleRemoveCategory = (id) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== id
    );

    setSelectedCategories(updatedCategories);

    setNewExperience({
      ...newExperience,
      categories: updatedCategories,
    });
  };

  const handleSelectChangeProperty = (event) => {
    setSelectedProperty(event.target.value);
  };

  const handleAddProperty = () => {
    const propertyToAdd = properties.find(
        (property) => property.id === Number(selectedProperty)
    );
    if (
        propertyToAdd &&
        !selectedProperties.some((property) => property.id === propertyToAdd.id) 
    ) {
        const updatedProperties = [...selectedProperties, propertyToAdd];
        setSelectedProperties(updatedProperties);
        setNewExperience({
            ...newExperience,
            properties: updatedProperties,
        });
        setSelectedProperty(""); 
    }
};

  const handleRemoveProperty = (id) => {
    const updatedProperties = selectedProperties.filter(
      (properties) => properties.id !== id
    );

    setSelectedProperties(updatedProperties);

    setNewExperience({
      ...newExperience,
      properties: updatedProperties,
    });
  };


  return (
    <>
      <h3>Experiences</h3>
      <section>
        <form className="adminForm">
          <div>
            <h5>About the Experience</h5>
            <div>
              <label for="title">Title</label>
              <input
                type="text"
                placeholder="Enter a title"
                id="title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label for="description"> Description</label>
              <p>0/500</p>
              <textarea 
              name="description" 
              placeholder="Enter a description" 
              maxLength={500}
              value={newExperience.description}
              onChange={(e) => 
                setNewExperience({ 
                  ...newExperience, 
                  description: e.target.value 
                })
              } 
              required
              
              />
            </div>
          </div>

          <div>
            <h5>Where is it?</h5>
            <div>
              <label for="country">Country</label>
              <input
                type="text"
                placeholder="Enter country name"
                id="country"
                value={newExperience.country}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    country: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label for="ubication">ubication</label>
              <input
                type="text"
                placeholder="City, state/region"
                id="ubication"
                value={newExperience.ubication}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    ubication: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <h5>Specifications</h5>
            <div>
              <label for="categorySelect">Category</label>
              <select
                id="categorySelect"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                Select Categories
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button onClick={handleAddCategory}>Add Category</button>

              <h3>Selected Categories</h3>
              <ul>
                {selectedCategories.map((category) => (
                  <li key={category.id}>
                    {category.name}
                    <button onClick={() => handleRemoveCategory(category.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label for="propertySelect">Property</label>
              <select
                id="propertySelect"
                value={selectedProperty}
                onChange={handleSelectChangeProperty}
              >
                <option value="" disabled>
                Select Properties
                </option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
              <button onClick={handleAddProperty}>Add Property</button>

              <h3>Selected Properties:</h3>
              <ul>
                {selectedProperties.map((property) => (
                  <li key={property.id}>
                    {property.name}
                    <button onClick={() => handleRemoveProperty(property.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
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
          <div>Titulo de la tabla</div>
          <ul></ul>
        </div>
      </section>
    </>
  );
};
export default Experiences;
