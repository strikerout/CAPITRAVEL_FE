import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import React, { useState } from 'react';

const ImageUploader = ({ onImagesAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      setError(null);

      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_preset'); 
        formData.append('cloud_name', 'dvximkuzi'); 

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dvximkuzi/image/upload`,
            formData
          );
          return response.data.secure_url; 
        } catch (err) {
          console.error('Error uploading image:', err);
          throw err;
        }
      });

      try {
        const uploadedUrls = await Promise.all(uploadPromises); 
        onImagesAdded(uploadedUrls);
      } catch (err) {
        setError('Error uploading one or more images. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: '2px dashed #EB5436',
          padding: '20px',
          borderRadius: '5px',
          backgroundColor: loading ? '#f9f9f9' : 'white',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag some images here, or click to select images.</p>
      </div>
      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
