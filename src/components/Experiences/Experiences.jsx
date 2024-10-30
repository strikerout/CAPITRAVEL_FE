import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import useProperties from "../../hooks/useProperties";
import useExperiences from "../../hooks/useExperience";
import ImageUploader from "../ImageUploader";
import PrimaryButton from "../Buttons/PrimaryButton";

const Experiences = () => {
  const { addExperience } = useExperiences();

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

  const handleSelectChangeProperty = (event) => {
    setSelectedProperty(event.target.value);
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
       <>
         <h3>Experiences</h3>
         <section>
           <form className="adminForm" onSubmit={handleSubmit}>
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
               <label for="duration">Time</label>
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
             </div>
             <PrimaryButton type="submit" func={handleAddExperience}>
               Add Experience
             </PrimaryButton>
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

  