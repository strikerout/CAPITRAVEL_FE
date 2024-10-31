import React, { useState, useRef  } from "react";
import useCategories from "../../hooks/useCategories";
import useProperties from "../../hooks/useProperties";
import useExperiences from "../../hooks/useExperience";
import ImageUploader from "../ImageUploader";
import PrimaryButton from "../Buttons/PrimaryButton";
import style from "./experiences.module.scss"

const Experiences = () => {
  const divRef = useRef(null);
  const { addExperience, editExperience, removeExperience, fetchExperienceByID, experiences } = useExperiences();

  const { properties } = useProperties();
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);

  const [idToEdit, setIdToEdit] = useState('');

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

  const scrollToDiv = () => {
    if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }
};

  const handleImagesAdded = (base64Images) => {
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      images: [...prevExperience.images, ...base64Images], // Añadir nuevas imágenes a la experiencia
    }));
  };

  const handleRemoveImg = (index) => {
    console.log(index)
    const updatedImages = newExperience.images.filter((_, i) => i !== index);
    console.log(updatedImages);
    setNewExperience({
      ...newExperience,
      images: updatedImages
    })

  }



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
    console.log(selectedCategories)
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== id
    );
    setSelectedCategories(updatedCategories);

    let idUpdatedCategories = [];
    updatedCategories.map((category) => (idUpdatedCategories=[...idUpdatedCategories, category.id]))
    
    setNewExperience({
      ...newExperience,
      categoryIds: idUpdatedCategories,
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
        propertyIds: [...prevExperience.propertyIds, propertyToAdd.id], //Solo guarda el ID
      }));
      setSelectedProperty("");
    }
  };

  const handleRemoveProperty = (id) => {
    const updatedProperties = selectedProperties.filter(
      (properties) => properties.id !== id
    );

    setSelectedProperties(updatedProperties);

    let idUpdatedProperties = [];
    updatedProperties.map((property) => (idUpdatedProperties=[...idUpdatedProperties, property.id]))

    setNewExperience({
      ...newExperience,
      propertyIds: idUpdatedProperties,
    });
  };

  const handleRemoveExperience = (id) => {
    const confirm = window.confirm('Sure to delete this experience?');
    if (confirm) {
      removeExperience(id);
      console.log('Elemento eliminado');
    } else {
      console.log('Cancelado');
    }

  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const confirm = window.confirm('Sure to add this experience?');
    if (confirm) {
    addExperience(newExperience);
    cancelEdit();
    }else{
      console.log('Cancelado');
    }
  };

  const handleEditExperience = () =>{
    const confirm = window.confirm('Sure to edit this experience?');
    if (confirm) {
      editExperience(idToEdit, newExperience);
      cancelEdit()
      console.log('Elemento editado');
    }else{
      console.log('Cancelado');
    }
  }

  const cancelEdit = () => {
    setIdToEdit('');
    setNewExperience({
      title: "",
      country: "",
      ubication: "",
      description: "",
      duration: "",
      images: [],
      categoryIds: [],
      propertyIds: [],
    }); // Limpiar form
    setSelectedCategories([])
    setSelectedProperties([])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {idToEdit ? handleEditExperience() : handleAddExperience(e)};
    cancelEdit();
  };

  const enableEditMode = async (id) => {
    scrollToDiv(); //scrool hacia el form

    const toEdit = await fetchExperienceByID(id);

    //Rellenarlos tags de categories y suministra categories al estado newExperience
    let categoriesToEdit = [];      
    let idCategoriesToEdit = [];
    {toEdit.categories.map((category)=>{
      categoriesToEdit=[...categoriesToEdit, category];
      idCategoriesToEdit=[...idCategoriesToEdit, category.id];
    })}
    setSelectedCategories(categoriesToEdit)

    //Rellenarlos tags de properties y suministra properties al estado newExperience
    let propertiesToEdit = [];
    let idPropertiesToEdit = [];
    {toEdit.properties.map((property)=>{
      propertiesToEdit=[...propertiesToEdit, property]
      idPropertiesToEdit=[...idPropertiesToEdit, property.id]
    })}
    setSelectedProperties(propertiesToEdit)

    setNewExperience({
      title: toEdit.title,
      country: toEdit.country,
      ubication: toEdit.ubication,
      description: toEdit.description,
      duration: toEdit.duration,
      images: toEdit.images,
      categoryIds: idCategoriesToEdit,
      propertyIds: idPropertiesToEdit,
    });
    setIdToEdit(id);
  };

  return (
    <>
      <h3 ref={divRef} className="margin-temporary">Experiences</h3>
      <section className="content-general-experience">
        <form className="adminForm-experience" onSubmit={handleSubmit}>
          <section>
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
                    setNewExperience({
                      ...newExperience,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <div className="labelCharacter">
                <label for="description"> Description</label>
                <p>0/500</p>
                </div>
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
          </section>

          <section>
            <div>
              <h5>Specifications</h5>
              <div>
                <label for="categorySelect">Category</label>
                <div className="container-select">
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
                <button className="buttonAdd" type="button" onClick={handleAddCategory}>
                  Add 
                </button>
                </div>
                <ul className="containerTag">
                  {selectedCategories.map((category) => (
                    <li key={category.id} className="tag">
                      {category.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.id)}
                        className="button-detele-tag"
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label for="propertySelect">Property</label>
                <div className="container-select">
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
                <button className="buttonAdd" type="button" onClick={handleAddProperty}>
                  Add 
                </button>
                </div>
                

                
                <ul className="containerTag">
                  {selectedProperties.map((property) => (
                    <li key={property.id} className="tag">
                      {property.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveProperty(property.id)}
                        className="button-detele-tag"
                      >
                        x
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
                  setNewExperience({
                    ...newExperience,
                    duration: e.target.value,
                  })
                }
                required
              />
            </div>
          </section>

          <section>
            <div>
              <h5>Add Images</h5>
              <ImageUploader onImagesAdded={handleImagesAdded} />{" "}
              {/* Integrar ImageUploader */}
              <div>
                <h6>Imágenes Cargadas:</h6>
                <ul className="containerTag">
                  {newExperience.images ? newExperience.images.map((image, index) => (
                    <li key={index} className="imgExperienceForm">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: "100px", height: "auto" }}
                      />
                      <svg onClick={()=>(handleRemoveImg(index))} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>

                    </li>
                  )):null}
                </ul>
              </div>
            </div>


            {idToEdit ? (
            <div className="buttonsContainer">
              <PrimaryButton type="submit">Save</PrimaryButton>
              <PrimaryButton func={cancelEdit}>Cancel</PrimaryButton>
            </div>
          ) : (
            <PrimaryButton type="submit">Add Experience</PrimaryButton>
          )}
          </section>
        </form>

        <div className="adminList">

          <div className="headerList experienceList">
            <h4>ID</h4>
            <h4>Name</h4>
            <h4 className="mainImgHeader">Main Image</h4>
            <h4>Description</h4>
            <h4>Categories</h4>
            <h4>Properties</h4>
          </div>
          <ul className="bodyList experienceBody">
            {experiences.map((experience) => (
              <li key={experience.id}>
                <p>{experience.id}</p>
                <p>{experience.title}</p>
                <img
                  src={experience.images[0]}
                  alt=""
                  className="imgExperience-table"
                />
                <p>{experience.description}</p>
                <div className="miniList">
                  {experience.categories.map((category)=>(
                    <p key={category.id}>{category.name}</p>
                ))}
                </div>
                <div className="miniList">
                  {experience.properties.map((property)=>(
                    <p key={property.id}>{property.name}</p>
                ))}
                </div>
                
                <div>
                  <svg
                    onClick={() => enableEditMode(experience.id)}
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
                    onClick={() => handleRemoveExperience(experience.id)}
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
    </>
  );
};
export default Experiences;
