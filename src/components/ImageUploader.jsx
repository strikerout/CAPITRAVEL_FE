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

      // Crear una lista de promesas para subir las imágenes a Cloudinary
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_preset'); // Cambia por tu Upload Preset
        formData.append('cloud_name', 'dvximkuzi'); // Cambia por tu Cloud Name

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dvximkuzi/image/upload`,
            formData
          );
          return response.data.secure_url; // Retorna la URL segura de la imagen subida
        } catch (err) {
          console.error('Error al subir la imagen:', err);
          throw err;
        }
      });

      try {
        const uploadedUrls = await Promise.all(uploadPromises); // Esperar que todas las imágenes sean subidas
        onImagesAdded(uploadedUrls); // Pasar las URLs al componente padre
      } catch (err) {
        setError('Error al subir una o más imágenes. Intenta de nuevo.');
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
      {loading && <p>Subiendo imágenes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
