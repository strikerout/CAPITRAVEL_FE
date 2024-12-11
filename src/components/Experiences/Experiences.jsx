import React, { useState, useRef, useEffect  } from "react";
import useCategories from "../../hooks/useCategories";
import useProperties from "../../hooks/useProperties";
import useExperiences from "../../hooks/useExperience";
import style from "./experiences.module.scss"
import ImageUploader from "../ImageUploader";
import PrimaryButton from "../Buttons/PrimaryButton";
import Swal from 'sweetalert2'
import Loading from '../Loading';
import TimeRangeSelector from "./TimeRangeSelector/TimeRangeSelector";
import DaysOfService from "./DaysOfService/DaysOfService";
import SecundaryButton from "../Buttons/SecundaryButton";
import ClearButton from "../Buttons/ClearButton"

const Experiences = () => {
  const divRef = useRef(null);

  const { addExperience, editExperience, removeExperience, fetchExperienceByID, experiences, loading } = useExperiences();

  const [isActive, setIsActive] = useState(false);

  const { properties } = useProperties();
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);

  const [idToEdit, setIdToEdit] = useState('');
  const [isModified, setIsModified] = useState(false);

  const sortedProperties = properties.sort((a, b) =>
  a.name.localeCompare(b.name)
  );
  const sortedCategories = categories.sort((a, b) =>
  a.name.localeCompare(b.name)
  );

  const [newExperience, setNewExperience] = useState({
    title: "",
    country: "",
    ubication: "",
    description: "",
    quantity: 0,
    timeUnit: "",
    images: [],
    categoryIds: [],
    propertyIds: [],
    serviceHours:  "",
    availableDays:[]
  });

  const [errors, setErrors] = useState({});

  const handleChangeTimeUnit = (e) => {
    setNewExperience({
      ...newExperience,
      timeUnit: e.target.value,
    });
    setIsModified(true);
  };

const handleTimeChange = (startTime, endTime) => {
  const formattedServiceHours = `${startTime}-${endTime}`;
  if (startTime) {
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      serviceHours: formattedServiceHours,
    }));
 }
 setIsModified(true);
};

  const handleDayAvailable = (day) => {
    setNewExperience((prevExperience) => {
      const updatedDays = prevExperience.availableDays.includes(day)
        ? prevExperience.availableDays.filter((d) => d !== day)
        : [...prevExperience.availableDays, day];
      return {
        ...prevExperience,
        availableDays: updatedDays,
      };
    });
    setIsModified(true);
  };

  const scrollToDiv = () => {
    if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }
};

  const handleImagesAdded = (base64Images) => {
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      images: [...prevExperience.images, ...base64Images].slice(0,10), 
    }));
    setIsModified(true);
  };

  const handleRemoveImg = (index) => {
    const updatedImages = newExperience.images.filter((_, i) => i !== index);
    setNewExperience({
      ...newExperience,
      images: updatedImages
    })

  }

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsModified(true); 
  };

  const handleSelectChangeProperty = (event) => {
    setSelectedProperty(event.target.value);
    setIsModified(true); 
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
        categoryIds: [...prevExperience.categoryIds, categoryToAdd.id], 
      }));
      setSelectedCategory([]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: '', 
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: 'This category has already been added.', 
      }));
    }
  };

  const handleRemoveCategory = (id) => {
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
        propertyIds: [...prevExperience.propertyIds, propertyToAdd.id], 
      }));
      setSelectedProperty("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        property: '', 
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        property: 'This property has already been added.', 
      }));
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
      Swal.fire({
        imageUrl: '/warningCapi.svg',
        imageWidth: 200,
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
          confirmButton: 'swalConfirmButton',
          cancelButton: 'swalCancelButton',
          title: 'swalTitle',
          htmlContainer: 'swalHtmlContainer',
        }
      }).then( async (result) => {
        if (result.isConfirmed) {
          const error = await removeExperience(id);
          if(error){
            Swal.fire({
              imageUrl: '/errorCapi.svg',
              imageWidth: 200,
              title: error.data.error,
              text: "Error: " + error.status,
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
          }else{
            Swal.fire({
              imageUrl: '/checkCapi.svg',
              imageWidth: 200,
              title: "Deleted!",
              text: "The experience has been deleted.",
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
          }
        }
      });
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    console.log(newExperience)
     const error = await addExperience(newExperience);
     if (error) {
      Swal.fire({
        imageUrl: '/errorCapi.svg',
        imageWidth: 200,
        title: error.data.error,
        text: "Error: " + error.status,
        customClass: {
          confirmButton: 'swalConfirmButton',
          title: 'swalTitle',
          htmlContainer: 'swalHtmlContainer',
        }
      });
    }else{
      Swal.fire({
        imageUrl: '/checkCapi.svg',
        imageWidth: 200,
        title: "Saved!",
        text: "The experience has been created.",
        customClass: {
          confirmButton: 'swalConfirmButton',
          title: 'swalTitle',
          htmlContainer: 'swalHtmlContainer',
        }
      });
      cancelEdit()
    }
   
      };

  const handleEditExperience = () =>{
      Swal.fire({
        imageUrl: '/warningCapi.svg',
        imageWidth: 200,
        title: "Are you sure?",
        text: "Changes will be saved",
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        customClass: {
          confirmButton: 'swalConfirmButton',
          cancelButton: 'swalCancelButton',
          title: 'swalTitle',
          htmlContainer: 'swalHtmlContainer',
        }
      }).then( async (result) => {
        if (result.isConfirmed) {
          const error = await editExperience(idToEdit, newExperience);
          if(error){
            Swal.fire({
              imageUrl: '/errorCapi.svg',
              imageWidth: 200,
              title: error.data.error,
              text: "Error: " + error.status,
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
          }else{
            cancelEdit()
            Swal.fire({
              imageUrl: '/checkCapi.svg',
              imageWidth: 200,
              title: "Saved!",
              text: "The experience has been modified.",
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
          }
        }
      });
  };

  const cancelEdit = () => {
    setIsActive(!isActive); 
    setIdToEdit('');
    setNewExperience({
      title: "",
      country: "",
      ubication: "",
      description: "",
      quantity: 0,
      timeUnit: "",
      images: [],
      categoryIds: [],
      propertyIds: [],
      serviceHours: "",
      availableDays:[]
    }); 
    setSelectedCategories([])
    setSelectedProperties([])
    setIsModified(false)
  };

  const validate = () => {
    const newErrors = {};
    if (!newExperience.title) newErrors.title = "Title is required";
    else if (newExperience.title.length < 3 || newExperience.title.length > 32)
       newErrors.title = "Title must be between 3 and 32 characters";
 
    if (!newExperience.description) newErrors.description = "Description is required";
    else if (newExperience.description.length < 32 || newExperience.description.length > 512)
       newErrors.description = "Description must be between 32 and 512 characters";
 
    if (!newExperience.country) newErrors.country = "Country is required";
    else if (newExperience.country.length < 2 || newExperience.country.length > 32)
      newErrors.country = "Country must be between 2 and 32 characters";

    if (!newExperience.ubication) newErrors.ubication = "Ubication is required";
    else if (newExperience.ubication.length < 2 || newExperience.ubication.length > 128)
      newErrors.ubication = "Ubication must be between 2 and 128 characters";

    if (!newExperience.quantity) newErrors.quantity = "A number of time is required";
    if (!newExperience.timeUnit) newErrors.timeUnit = "A unit of time is required";
  
    if (selectedCategories.length === 0) newErrors.category = "Category is required";
   
    if (newExperience.images.length === 0) newErrors.images = "At least one image is required";
    
    if (newExperience.availableDays.length === 0) newErrors.availableDays = "Choose a day of service";
    if (!newExperience.serviceHours) newErrors.serviceHours = "Service time is required";
    if(!newExperience.serviceHours.split("-")[0] === "") newErrors.serviceHours = "Select a start Time";
    if(newExperience.serviceHours.split("-")[1] === "") newErrors.serviceHours ="Select a end time"
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
 };
 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validate()) {
      idToEdit ? handleEditExperience() : handleAddExperience(e);
    }
  };

  const enableEditMode = async (id) => {
    if(isActive == false){
      setIsActive(!isActive);
    }
   
    scrollToDiv(); 

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
      quantity: toEdit.quantity,
      timeUnit: toEdit.timeUnit,
      images: toEdit.images,
      categoryIds: idCategoriesToEdit,
      propertyIds: idPropertiesToEdit,
      serviceHours: toEdit.serviceHours,
      availableDays:toEdit.availableDays
    })
    setIdToEdit(id);
  };

  const isModifiedRef = useRef(idToEdit);

  useEffect(() => {
    isModifiedRef.current = isModified;
  }, [isModified]);

  const idToEditRef = useRef(idToEdit);
  
  useEffect(() => {
    idToEditRef.current = idToEdit;
  }, [idToEdit]);

  function ToggleButton() {
      if(isModifiedRef.current){
        Swal.fire({
          imageUrl: '/warningCapi.svg',
          imageWidth: 200,
          title: "Exit without saving?",
          text: "Your changes will be discard",
          showCancelButton: true,
          confirmButtonText: "Yes",
          customClass: {
            confirmButton: 'swalConfirmButton',
            cancelButton: 'swalCancelButton',
            title: 'swalTitle',
            htmlContainer: 'swalHtmlContainer',
          }
        }).then( (result) => {
            if (result.isConfirmed) {
              setIdToEdit('');
              setNewExperience({
              title: "",
              country: "",
              ubication: "",
              description: "",
              quantity: 0,
              timeUnit: "",
              images: [],
              categoryIds: [],
              propertyIds: [],
              serviceHours: "",
              availableDays:[]
            }); 
            setSelectedCategories([])
            setSelectedProperties([])
            }
          });
        }else{
          setIsActive(!isActive);
    }

    if(!isActive){
      cancelEdit()
    }
}

  return (
    <>
      {loading ? <Loading/> : null}
      <div className={style.titleButtonExp}>
        <h3 ref={divRef}>List Experiences</h3>
        <PrimaryButton func={ToggleButton}>Create Experience</PrimaryButton>
      </div>
      
      <section className="content-general-experience">
        <form className={isActive ? "displayForm adminForm-experience" : "hiddenForm"}  onSubmit={handleSubmit}>
          <section>
            <div className={style.cardOrange}>
              <h5>About the Experience</h5>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter a title"
                  id="title"
                  value={newExperience.title}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      title: e.target.value,
                    });
                    setIsModified(true); 
                  }}
                /> {errors.title && <p className="error">{errors.title}</p>}
              </div>

              <div>
                <div className="labelCharacter">
                <label htmlFor="description"> Description</label>
                <p>{newExperience.description.length}/500</p>
                </div>
                <textarea
                  name="description"
                  placeholder="Enter a description"
                  maxLength={500}
                  value={newExperience.description}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      description: e.target.value,
                    });
                    setIsModified(true); 
                  }}
                />{errors.description && <p className="error">{errors.description}</p>}
              </div>
            </div>

            <div className={style.cardGreen}>
              <h5>Where is it?</h5>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  placeholder="Enter country name"
                  id="country"
                  value={newExperience.country}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      country: e.target.value,
                    });
                    setIsModified(true); 
                  }}
                />{errors.country && <p className="error">{errors.country}</p>}
              </div>
              <div>
                <label htmlFor="ubication">Ubication</label>
                <input
                  type="text"
                  placeholder="City, state/region"
                  id="ubication"
                  value={newExperience.ubication}
                  onChange={(e) => {
                    setNewExperience({
                      ...newExperience,
                      ubication: e.target.value,
                    });
                    setIsModified(true); 
                  }}
                />{errors.ubication && <p className="error">{errors.ubication}</p>}
              </div>
            </div>
          </section>

          <section>
            <div className={style.cardBlue}>
              <h5>Specifications</h5>
              <div>
                <label htmlFor="categorySelect">Category</label>
                <p className={style.mg}>Choose a maximum of 5 categories</p>
                <div className="container-select">
                <select
                  id="categorySelect"
                  value={selectedCategory}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Select Categories
                  </option>
                  {sortedCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className={style.buttonAdd} type="button" onClick={handleAddCategory} disabled={newExperience.categoryIds.length >= 5}>
                  Add 
                </button>
                </div>
                <ul className="containerTag">
                {errors.category && <p className="error">{errors.category}</p>}
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
                <label htmlFor="propertySelect">Property</label>
                <div className="container-select">
                <select
                  id="propertySelect"
                  value={selectedProperty}
                  onChange={handleSelectChangeProperty}
                >
                  <option value="" disabled>
                    Select Properties
                  </option>
                  {sortedProperties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
                <button className={style.buttonAdd}  type="button" onClick={handleAddProperty}>
                  Add 
                </button>
                </div>
                {errors.property && <p className="error">{errors.property}</p>}
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

            <div className={style.cardBrown}>
              <h5>Duration</h5>
              <article className={style.containerDuration}>
                <div>
                <label htmlFor="quantity">Number of..</label>
              <input
                type="number"
                min="1"
                placeholder="Type a number"
                id="quantity"
                value={newExperience.quantity}
                onChange={(e) => {
                  setNewExperience({
                    ...newExperience,
                    quantity: e.target.value,
                  });
                  setIsModified(true); 
                }}
              />{errors.quantity && <p className="error">{errors.quantity}</p>}
                </div>
                <div>
                <label htmlFor="timeUnit">Unit of Time</label>
              <select 
              id="timeUnit"
              className={style.select}
              value={newExperience.timeUnit}
              onChange={handleChangeTimeUnit}
                >
                  <option value="" disabled>
                    Minutes, Hour, Days..
                  </option>
                  <option value="MINUTES">
                    Minutes
                  </option>
                  <option value="HOURS" >
                    Hour
                  </option>
                  <option value="DAYS">
                    Day
                  </option>
                </select>
                {errors.timeUnit && <p className="error">{errors.timeUnit}</p>}
                </div>
              </article>
            </div>
          </section>

          <section>
            <div>
              <h5>Add Images</h5>
              <p className={style.mg}>{newExperience.images.length} / 10 images uploaded. You can upload fewer if you want.</p>
              <ImageUploader onImagesAdded={handleImagesAdded} />{" "}
              <div>
                <h6 className={style.mg}>Uploaded images:</h6>
                <ul className="containerTag">
                  {newExperience.images ? newExperience.images.map((image, index) => (
                    <li key={index} className="imgExperienceForm">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: "100px", height: "auto" }}
                      />
                      <svg className={style.deleteIcon} onClick={()=>(handleRemoveImg(index))} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                    </li>
                  )):null}
                </ul> 
              </div>  {errors.images && <p className="error">{errors.images}</p>}
            </div>


            {idToEdit ? (
            <div className="buttonsContainer">
              <PrimaryButton type="submit" disabled={!isModified}>Save</PrimaryButton>
              <ClearButton func={cancelEdit}>Cancel</ClearButton>
            </div>
          ) : (
            <div className="buttonsContainer">
              <PrimaryButton func={handleSubmit} type="submit" disabled={!isModified}>Create</PrimaryButton>
              <ClearButton func={cancelEdit}>Cancel</ClearButton>
            </div>
            
          )}
          </section>

          <section className="sectionTime">
            <div>
            <h4>Hours and days of service</h4>
              <p>What days will you offer service?</p>
              {errors.availableDays && <p className="error">{errors.availableDays}</p>}
              <DaysOfService
                selectedDays={newExperience.availableDays}
                fun={handleDayAvailable}
              />
             
            </div>

            <div>
              <p>
              Choose a service time
              </p>
              {errors.serviceHours && <p className="error">{errors.serviceHours}</p>}
              <TimeRangeSelector
                startTime={newExperience.serviceHours.split("-")[0] || ""}
                endTime={newExperience.serviceHours.split("-")[1] || ""}
                onChange={handleTimeChange}
              />
            </div>
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
                    className="iconInteractive"
                    onClick={() => enableEditMode(experience.id)}
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
                    className="iconInteractive"
                    onClick={() => handleRemoveExperience(experience.id)}
                    xmlns="http://www.w3.org/2000/svg"
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

