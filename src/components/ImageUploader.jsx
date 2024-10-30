import { useDropzone } from 'react-dropzone';

import React from 'react'

const ImageUploader = ({ onImagesAdded }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      const base64Promises = acceptedFiles.map(file =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result); // Convertir a base64
          };
          reader.readAsDataURL(file);
        })
      );

      Promise.all(base64Promises).then(base64Images => {
        onImagesAdded(base64Images); // Pasar las imágenes base64 al componente padre
      });
    },
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #EB5436', padding: '20px', borderRadius: '5px' }}>
      <input {...getInputProps()} />
      <p>Arrastra algunas imágenes aquí, o haz clic para seleccionar imágenes.</p>
    </div>
  );
};

export default ImageUploader;