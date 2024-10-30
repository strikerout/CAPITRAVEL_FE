import React, { useState } from 'react';
import useProperties from '../../hooks/useProperties'
import PrimaryButton from '../Buttons/PrimaryButton'


const Properties = () => {
const {fetchProperties, fetchPropertyByID, properties, loading, error, addProperty, updateExistingProperty, removeProperty  } = useProperties();

const [newProperty, setNewProperty] =  useState({ name: '', description: '', image: '' });
const [idToEdit, setIdToEdit] = useState('');


const handleAddProperty = () => {
     addProperty(newProperty);
    console.log(newProperty, 'NEW PROPERTY')
    setNewProperty({ name: '', description: '', image: '' }); // Limpiar el formulario
  };

  const handleRemoveProperty = (id) => {
    const confirm = window.confirm("Sure to delete this property?");
    if(confirm){
        removeProperty(id); 
      console.log("Elemento eliminado");
    }else{
      console.log("Cancelado")
    }
  };

  const enableEditMode = async (id) =>{
    const toEdit = await fetchPropertyByID(id) 
    setNewProperty({ name: toEdit.name, description: toEdit.description, image: toEdit.image})
    setIdToEdit(id)
  }

  const handleEditProperty = () => {
    const confirm = window.confirm("Sure to edit this property?");
    if(confirm){
    updateExistingProperty(idToEdit, newProperty)
    setNewProperty({ name: '', description: '', image: '' }); // Limpiar el formulario
    setIdToEdit('')
    console.log("Elemento editado");
    }else{
      console.log("Cancelado")
    }
  }

  const cancelEdit = () => {
    setIdToEdit('')
    setNewCategory({ name: '', description: '', image: '' }); // Limpiar el formulario
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    idToEdit? handleEditProperty() : handleAddProperty();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  

  return (
    <>
      <h3>Properties</h3>
      <form className='adminForm' onSubmit={handleSubmit}>
        <div>
          <label for='name'>Name</label>
          <input
            type="text"
            placeholder="Enter a name"
            id='name'
            value={newProperty.name}
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label for='description'>Description</label>
          <input
            type="text"
            placeholder="Enter a description"
            id='description'
            value={newProperty.description}
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label for='image'>Add a icon</label>
          <input
            type="text"
            placeholder="Image"
            id='image'
            value={newProperty.image}
            onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
            required
          />
          <p>Supported files .PNG .SVG</p>
        </div>
        
        {idToEdit ? 
          <div className='buttonsContainer'>
            <PrimaryButton type='submit'>Save Property</PrimaryButton>
            <PrimaryButton func={cancelEdit}>Cancel</PrimaryButton>
          </div>
        : 
        <PrimaryButton type='submit'>Add Property</PrimaryButton>}
      </form>
      

      <div className='adminList'>
        <div className='headerList'>
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Description</h4>
  
        </div>
        <ul className='bodyList'>
          {properties.map((property) => (
            <li key={property.id}>
              <p>{property.id}</p>
              <p>{property.name}</p>
              <p>{property.description}</p>

              <div>
                <svg onClick={() => enableEditMode(property.id)} width="1em" height="1em"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"/><path fill="currentColor" d="m5 16l-1 4l4-1L18 9l-3-3z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l3 3m-5 11h8"/></g></svg>

                <svg onClick={() => handleRemoveProperty(property.id)} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"/></svg>

              </div>
            </li>
          ))}
        </ul>
      </div> 

    </>
  )
}

export default Properties
