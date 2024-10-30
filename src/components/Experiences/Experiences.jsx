import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import useProperties from "../../hooks/useProperties";
import useExperiences from "../../hooks/useExperience";
import ImageUploader from "../ImageUploader";
import PrimaryButton from "../Buttons/PrimaryButton";
import style from "./experiences.module.scss"

const Experiences = () => {
  const { addExperience, experiences } = useExperiences();

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
    categoryIds: [],
    propertyIds: [],
  });

  const handleImagesAdded = (base64Images) => {
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      images: [...prevExperience.images, ...base64Images], // Añadir nuevas imágenes a la experiencia
    }));
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSelectChangeProperty = (event) => {
    setSelectedProperty(event.target.value);
  };



  const handleAddCategory = (e) => {
    e.preventDefault();
    const categoryToAdd = categories.find(
      (category) => category.id === Number(selectedCategory)
    );
    if (
      categoryToAdd &&
      !selectedCategories.some((category) => category.id === categoryToAdd.id)
    ) {
      const updatedCategories = [...selectedCategories, categoryToAdd];
      setSelectedCategories(updatedCategories);
      setNewExperience((prevExperience) => ({
        ...prevExperience,
        categoryIds: [...prevExperience.categoryIds, categoryToAdd.id], // Solo guarda el ID
      }));
      setSelectedCategory([]);
    }
  };

  const handleRemoveCategory = (id) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== id
    );
    setSelectedCategories(updatedCategories);
    setNewExperience({
      ...newExperience,
      categoryIds: updatedCategories,
    });
  };

  
   const handleAddProperty = (e) => {
     e.preventDefault();
     const propertyToAdd = properties.find(
       (property) => property.id === Number(selectedProperty)
     );
     if (
       propertyToAdd &&
       !selectedProperties.some((property) => property.id === propertyToAdd.id)
     ) {
       const updatedProperties = [...selectedProperties, propertyToAdd];
       setSelectedProperties(updatedProperties);
       setNewExperience((prevExperience) => ({
         ...prevExperience,
         propertyIds: [...prevExperience.propertyIds, propertyToAdd.id],  //Solo guarda el ID
       }));
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
       propertyIds: updatedProperties,
     });
   };
   
  const handleAddExperience = (e) => {
    e.preventDefault();
    addExperience({
      ...newExperience,
      categoryIds: newExperience.categoryIds, //Mantiene solo los IDs
      propertyIds: newExperience.propertyIds,//Mantiene solo los IDs
    });

    console.log(newExperience);

    setSelectedCategories([]);
    setSelectedProperties([]);

    setNewExperience({
      title: "",
      country: "",
      ubication: "",
      description: "",
      duration: "",
      images: [],
      categoryIds: [],
      propertyIds: [],
    });
  };

const handleSubmit =(e)=>{
  e.preventDefault();
  handleAddExperience(e)
}

  // const handleRemoveExperience = (id) => {
  //   const confirm = window.confirm("Sure to delete this experience?");
  //   if (confirm) {
  //     removeExperience(id);
  //     console.log("Elemento eliminado");
  //   } else {
  //     console.log("Cancelado");
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setExperienceData({
  //     ...experienceData,
  //     [name]: value,
  //   });
  // };

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

     return (
       <div className={style.experiencesAdmin}>
         <h3 className='margin-temporary'>Experiences</h3>
         <section>
           <form className="adminForm" onSubmit={handleSubmit}>
             <div>
               <h5>About the Experience</h5>
               <div>
                 <label htmlFor="title">Title</label>
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
                 <label htmlFor="description"> Description</label>
                 <p>0/500</p>
                 <textarea
                   name="description"
                   placeholder="Enter a description"
                   maxLength={500}
                   value={newExperience.description}
                   onChange={(e) =>
                     setNewExperience({
                       ...newExperience,
                       description: e.target.value,
                     })
                   }
                   required
                 />
               </div>
             </div>

             <div>
               <h5>Where is it?</h5>
               <div>
                 <label htmlFor="country">Country</label>
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
                 <label htmlFor="ubication">ubication</label>
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
                 <label htmlFor="categorySelect">Category</label>
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
                 <button type="button" onClick={handleAddCategory}>
                   Add Category
                 </button>

                 <h3>Selected Categories</h3>
                 <ul>
                   {selectedCategories.map((category) => (
                     <li key={category.id}>
                       {category.name}
                       <button
                         type="button"
                         onClick={() => handleRemoveCategory(category.id)}
                       >
                         Delete
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                 <label htmlFor="propertySelect">Property</label>
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
                 <button type="button" onClick={handleAddProperty}>
                   Add Property
                 </button>

                 <h3>Selected Properties:</h3>
                 <ul>
                   {selectedProperties.map((property) => (
                     <li key={property.id}>
                       {property.name}
                       <button
                         type="button"
                         onClick={() => handleRemoveProperty(property.id)}
                       >
                         Delete
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>

             <div>
               <h5>Duration</h5>
               <label htmlFor="duration">Time</label>
               <input
                 type="number"
                 placeholder="Enter a Duration"
                 id="duration"
                 value={newExperience.duration}
                 onChange={(e) =>
                   setNewExperience({ ...newExperience, duration: e.target.value })
                 }
                 required
               />
             </div>

            
               <div>
                 <h5>Add Images</h5>
                 <ImageUploader onImagesAdded={handleImagesAdded} />{" "}
                 {/* Integrar ImageUploader */}
                 <div>
                   <h6>Imágenes Cargadas:</h6>
                   <ul>
                     {newExperience.images.map((image, index) => (
                       <li key={index}>
                         <img
                           src={image}
                           alt={`Imagen ${index + 1}`}
                           style={{ width: "100px", height: "auto" }}
                         />
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
            
             <PrimaryButton type="submit" func={handleAddExperience}>
               Add Experience
             </PrimaryButton>
           </form>

           </section>
          <section>
           <div className="adminList">
          <div className="headerList">
            <h4>ID</h4>
            <h4>Name</h4>
            <h4>Description</h4>
          </div>
          <ul className="bodyList">
            {experiences.map((experience) => (
              <li key={experience.id}>
                <p>{experience.id}</p>
                <p>{experience.title}</p>
                <img src={experience.images[0]} alt="" className="imgExperience-table"/>
                <div>
                  <svg
                    // onClick={() => enableEditMode(category.id)}
                    width="1em"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"
                      />
                      <path fill="currentColor" d="m5 16l-1 4l4-1L18 9l-3-3z" />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 6l3 3m-5 11h8"
                      />
                    </g>
                  </svg>

                  <svg
                    // onClick={() => handleRemoveCategory(category.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="#EB5436"
                      d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
            </div>
         </section>

         
       </div>
     );
   };
   export default Experiences;

  