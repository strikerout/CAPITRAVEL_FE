import React, { useState} from 'react';
import useCategories from '../../hooks/useCategories';
import PrimaryButton from '../Buttons/PrimaryButton';
import Swal from 'sweetalert2'
import Loading from '../Loading';


const Categories = () => {
  const {fetchCategoryByID, categories, loading, addCategory, editCategory, removeCategory } = useCategories();
  const [newCategory, setNewCategory] = useState({ name: '', description: ''});
  const [idToEdit, setIdToEdit] = useState('');
  const [errors, setErrors] = useState({ name: '', description: ''});

  const validateFields = () => {
    const newErrors = { name: '', description: ''};

    if (!newCategory.name) newErrors.name = "Name is required";
    else if ( newCategory.name.length < 3 || newCategory.name.length > 16) {
      newErrors.name = 'Name must be between 3 and 16 characters.';
    }

    if (!newCategory.description) newErrors.description = "Description is required";
    else if ( newCategory.description.length < 15 || newCategory.description.length > 256) {
      newErrors.description = 'Description must be between 15 and 256 characters.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleAddCategory = async() => {
    const error = await addCategory(newCategory);
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

  const handleRemoveCategory = (id) => {
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
        const error = await removeCategory(id);
        if(error){
          Swal.fire({
            imageUrl: '/errorCapi.svg',
            imageWidth: 200,
            title: "This category can't be deleted, delete the experiences first.",
            text: error.data.error,
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
            text: "The category has been deleted.",
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
    const toEdit = await fetchCategoryByID(id);
    setNewCategory({name: toEdit.name, description: toEdit.description});
    setIdToEdit(id);
  };

  const handleEditCategory = () => {
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
        const error = await editCategory(idToEdit, newCategory);;
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
            text: "The category has been saved.",
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
    setNewCategory({ name: '', description: ''});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      idToEdit ? handleEditCategory() : handleAddCategory();
    }
  };


  return ( 
    <>
      {loading ? <Loading/> : null}
      <h3 className='margin-temporary'> List Categories</h3>
      <section className="content-general">
        <form className="adminForm" onSubmit={handleSubmit}>
          <h4>Add Category</h4>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter a name"
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>


          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Enter a description"
              id="description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          {idToEdit ? (
            <div className="buttonsContainer">
              <PrimaryButton type="submit">Save category</PrimaryButton>
              <PrimaryButton func={cancelEdit}>Cancel</PrimaryButton>
            </div>
          ) : (
            <PrimaryButton type="submit">Add Category</PrimaryButton>
          )}
        </form>

        <div className="adminList">
          <div className="headerList">
            <h4>ID</h4>
            <h4>Name</h4>
            <h4>Description</h4>
          </div>
          <ul className="bodyList">
            {categories.map((category) => (
              <li key={category.id}>
                <p>{category.id}</p>
                <p>{category.name}</p>
                <p>{category.description}</p>

                <div>
                  <svg
                    className="iconInteractive"
                    onClick={() => enableEditMode(category.id)}
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
                    onClick={() => handleRemoveCategory(category.id)}
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

export default Categories;
