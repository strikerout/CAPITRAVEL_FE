import React, { useState } from 'react';
import useBase64 from '../hooks/useBase64';
import useExperiences from '../hooks/useExperience';
import PrimaryButton from '../components/Buttons/PrimaryButton'

const ImageUploader = () => {

  const { base64Images, convertToBase64 } = useBase64(); 
  const {fetchExperiences,
    fetchExperienceByID,
    experiences,
    experience,
    loading,
    error,
    addExperience,
    updateExistingExperience,
    removeExperience} = useExperiences();
    const[newExperience, setNewExperience] = useState({
      title: '',
      country: '',
      ubication: '',
      description: '',
      duration: 0,
      images: [],
      categoryIds: [],
      propertyIds: []
    });
    const [idToEdit, setIdToEdit] = useState('');

  const handleChange = async (e) => {
    // const file = e.target.files[0];
    // if (file) {
    //   await convertToBase64(file);
    const files = Array.from(e.target.files);
    await convertToBase64(files);
    //}
  };

  const handleAddExperience = () => {
    const updateImagesIds = [...newExperience.images]; // Copia del array actual
    updateImagesIds[0] = base64Image; // Modificar el índice específico
    setNewExperience({ ...newExperience, images: updateImagesIds }); // Actualizar el estado
    console.log(experience.images);

    const confirm = window.confirm("Sure to add this experience?");
    if(confirm){
    addExperience(newExperience);
    setNewExperience({
      title: '',
      country: '',
      ubication: '',
      description: '',
      duration: 0,
      images: [],
      categoryIds: [''],
      propertyIds: ['']
    });// Limpiar el formulario
    }else{
      console.log("Cancelado")
    } 
  };

  const handleRemoveExperience = (id) => {
    const confirm = window.confirm("Sure to delete this experience?");
    if(confirm){
      removeExperience(id); 
      console.log("Elemento eliminado");
    }else{
      console.log("Cancelado")
    }
  };

  const enableEditMode = async (id) =>{
    const toEdit = await fetchExperienceByID(id) 
    setNewExperience({
      title: toEdit.title,
      country: toEdit.country,
      ubication: toEdit.ubication,
      description: toEdit.description,
      duration: toEdit.duration,
      images: toEdit.images,
      categoryIds: toEdit.categoryIds,
      propertyIds: toEdit.propertyIds
  })
    setIdToEdit(id)
  }

  const handleEditExperience = () => {
    const updateImagesIds = [...newExperience.images]; // Copia del array actual
    updateImagesIds[0] = base64Image; // Modificar el índice específico
    setNewExperience({ ...newExperience, images: updateImagesIds }); // Actualizar el estado
    
    const confirm = window.confirm("Sure to edit this experience?");
    if(confirm){
    updateExistingExperience(idToEdit, newExperience)
    setNewExperience({
      title: '',
      country: '',
      ubication: '',
      description: '',
      duration: 0,
      images: [''],
      categoryIds: [''],
      propertyIds: ['']
  }); // Limpiar el formulario
    setIdToEdit('')
    console.log("Elemento editado");
    }else{
      console.log("Cancelado")
    }
  }

  const cancelEdit = () => {
    setIdToEdit('')
    setNewExperience({
      title: '',
      country: '',
      ubication: '',
      description: '',
      duration: 0,
      images: [],
      categoryIds: [],
      propertyIds: []
    }); // Limpiar el formulario
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    idToEdit? handleEditExperience() : handleAddExperience();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;




  return (
    <>
    <form className='adminForm' onSubmit={handleSubmit}>

      {/* <div>
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
          <label for='country'>Country</label>
          <input
            type="text"
            placeholder="Enter a country"
            id='country'
            value={newExperience.country}
            onChange={(e) => setNewExperience({ ...newExperience, country: e.target.value })}
            required
          />
        </div>

        <div>
          <label for='ubication'>Ubication</label>
          <input
            type="text"
            placeholder="Enter a ubication"
            id='ubication'
            value={newExperience.ubication}
            onChange={(e) => setNewExperience({ ...newExperience, ubication: e.target.value })}
            required
          />
        </div>

        <div>
          <label for='description'>Description</label>
          <input
            type="text"
            placeholder="Enter a description"
            id='description'
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label for='duration'>Duration</label>
          <input
            type="text"
            placeholder="Enter a duration"
            id='duration'
            value={newExperience.duration || ''}
            onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
            required
          />
        </div>

        <div>
          <label for='category1'>Category 1</label>
          <input
            type="text"
            placeholder="Enter category 1"
            id='category1'
            // value={newExperience.categoryIds[0] || ''}
            onChange={(e) => {
              const updatedCategoryIds = newExperience.categoryIds ? [...newExperience.categoryIds] : ['']; // Copia del array actual
              updatedCategoryIds[0] = e.target.value; // Modificar el índice específico
              setNewExperience({ ...newExperience, categoryIds: updatedCategoryIds }); // Actualizar el estado
            }}
            required
          />
        </div>

        <div>
          <label for='category2'>Category 2</label>
          <input
            type="text"
            placeholder="Enter category 2"
            id='category2'
            // value={newExperience.categoryIds[1] || ''}
            onChange={(e) => {
              const updatedCategoryIds = newExperience.categoryIds ? [...newExperience.categoryIds] : ['']; // Copia del array actual
              updatedCategoryIds[1] = e.target.value; // Modificar el índice específico
              setNewExperience({ ...newExperience, categoryIds: updatedCategoryIds }); // Actualizar el estado
            }}
            required
          />
        </div>

        <div>
          <label for='property1'>Property 1</label>
          <input
            type="text"
            placeholder="Enter property 1"
            id='property1'
            // value={newExperience.propertyIds[0] || ''}
            onChange={(e) => {
              const updatePropertirdIds = newExperience.propertyIds ? [...newExperience.propertyIds] : ['']; // Copia del array actual
              updatePropertirdIds[0] = e.target.value; // Modificar el índice específico
              setNewExperience({ ...newExperience, propertyIds: updatePropertirdIds }); // Actualizar el estado
            }}
            required
          />
        </div>

        <div>
          <label for='property2'>Property 2</label>
          <input
            type="text"
            placeholder="Enter property 2"
            id='property2'
            // value={newExperience.propertyIds[1] || ''}
            onChange={(e) => {
              const updatePropertirdIds = newExperience.propertyIds ? [...newExperience.propertyIds] : ['']; // Copia del array actual
              updatePropertirdIds[1] = e.target.value; // Modificar el índice específico
              setNewExperience({ ...newExperience, propertyIds: updatePropertirdIds }); // Actualizar el estado
            }}
            required
          />
        </div> */}


        <div>
          <label for='image1'>Image 1</label>
          <input
            type="file"
            id='image1'
            accept="image/*"
            onChange={handleChange}
            multiple
            required
          />
            {base64Images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
        ))}
        </div>

        {/* falta imput para imagen 2 */}



      {base64Images ? console.log(base64Images) : null}

      {idToEdit ? 
          <div className='buttonsContainer'>
            <PrimaryButton type='submit'>Save Experience</PrimaryButton>
            <PrimaryButton func={cancelEdit}>Cancel</PrimaryButton>
          </div>
        : 
        <PrimaryButton type='submit'>Add Experience</PrimaryButton>}

    </form>

    <div className='adminList'>
    <div className='headerList'>
      <h4>ID</h4>
      <h4>Title</h4>
      <h4>Description</h4>

    </div>
    <ul className='bodyList'>
      {experiences.map((experience) => (
        <li key={experience.id}>
          <p>{experience.id}</p>
          <p>{experience.title}</p>
          <p>{experience.description}</p>

          <div>
            <svg onClick={() => enableEditMode(experience.id)} width="1em" height="1em"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"/><path fill="currentColor" d="m5 16l-1 4l4-1L18 9l-3-3z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l3 3m-5 11h8"/></g></svg>

            <svg onClick={() => handleRemoveCategory(experience.id)} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"/></svg>

          </div>
        </li>
      ))}
    </ul>
    </div>
    </>
  );
};

export default ImageUploader;
