import React, { useState } from 'react';
import useProperties from '../../hooks/useProperties';
import PrimaryButton from '../Buttons/PrimaryButton';
import Swal from 'sweetalert2'
import Loading from '../Loading';
import ImageUploader from '../ImageUploader';
import styles from './properties.module.scss'

const Properties = () => {
  const { fetchPropertyByID, properties, loading, addProperty, updateExistingProperty, removeProperty } = useProperties();

  const [newProperty, setNewProperty] = useState({ name: '', description: '', image: '' });
  const [idToEdit, setIdToEdit] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', image: '' });

  const handleAddProperty = async() => {
    const error = await addProperty(newProperty);
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
    }
    cancelEdit();
  };

  const handleRemoveProperty = (id) => {
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
        const error = await removeProperty(id);
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
            text: "The property has been deleted.",
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

  const enableEditMode = async (id) => {
    const toEdit = await fetchPropertyByID(id);
    setNewProperty({ name: toEdit.name, description: toEdit.description, image: toEdit.image });
    setIdToEdit(id);
  };

  const handleEditProperty = () => {
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
        const error = await updateExistingProperty(idToEdit, newProperty);
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
            text: "The property has been saved.",
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
    setIdToEdit('');
    setNewProperty({ name: '', description: '', image: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = { name: '', description: '', image: ''};

    if (newProperty.name.length < 3 || newProperty.name.length > 32) {
      validationErrors.name = 'Name must be between 3 and 32 characters.';
    }
    if (newProperty.description.length < 15 || newProperty.description.length > 256) {
      validationErrors.description = 'Description must be between 15 and 256 characters.';
    }
    
    if (newProperty.image === ''){
      validationErrors.image = 'Is required to upload an icon';
    }

    if (validationErrors.name || validationErrors.description || validationErrors.image) {
      setErrors(validationErrors);
    } else {
      setErrors({ name: '', description: '', image:'' });
      idToEdit ? handleEditProperty() : handleAddProperty();
    }
  };

  const handleImagesAdded = (base64Images) => {
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      image: base64Images[0],
    }));
  };
  
  const handleRemoveImg = () => {
    setNewProperty({
      ...newProperty,
      image: '',
    })
  }


  return (
    <>
      {loading ? <Loading/> : null}
      <h3 className='margin-temporary'>List Properties</h3>
      <section className="content-general">
      <form className='adminForm' onSubmit={handleSubmit}>
      <h4>Add Property</h4>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            placeholder="Enter a name"
            id='name'
            value={newProperty.name}
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <input
            type="text"
            placeholder="Enter a description"
            id='description'
            value={newProperty.description}
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor='image'>Add a icon</label>
          <ImageUploader onImagesAdded={handleImagesAdded} />{" "}
          <p>Supported files .PNG .SVG</p>
          { newProperty.image && (
              <div>
                  <h6>Uploaded images:</h6>
                    {newProperty.image && (
                  <ul className={styles.containerUl}>
                    <li className={styles.iconPropertyLi}>
                    <img
                      src={newProperty.image}
                      alt="Uploaded image"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <svg
                      className="iconInteractive"
                      onClick={()=>(handleRemoveImg())}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                    <path d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                    </svg>
                    </li>
                  </ul>
                    )}
            </div> 
          )}
     {errors.image && <p className="error">{errors.image}</p>}
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
        <div className={styles.headerList}>
          <h4>ID</h4>
          <h4>Icon</h4>
          <h4>Name</h4>
          <h4>Description</h4>
        </div>
        <ul className={styles.bodyList}>
          {properties.map((property) => (
            <li key={property.id}>
              <p>{property.id}</p>
              <img src={property.image} alt="" className={styles.icon}/>
              <p>{property.name}</p>
              <p>{property.description}</p>

              <div>
                <svg className="iconInteractive" onClick={() => enableEditMode(property.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"/><path fill="currentColor" d="m5 16l-1 4l4-1L18 9l-3-3z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l3 3m-5 11h8"/></g></svg>

                <svg className="iconInteractive" onClick={() => handleRemoveProperty(property.id)} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 12 12"><path fill="#EB5436" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"/></svg>
              </div>
            </li>
          ))}
        </ul>
      </div> 
      </section>
    </>
  )
}

export default Properties;
