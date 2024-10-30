 import { useState } from 'react';

 const useBase64 = () => {
   const [base64Image, setBase64Image] = useState('');

   const convertToBase64 = (file) => {
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = () => {
         setBase64Image(reader.result);  //Guardar en el estado
         resolve(reader.result);  //Retornar el resultado
       };
       reader.onerror = reject;
     });
   };

   return { base64Image, convertToBase64 };
 };

 export default useBase64;

// import { useState } from 'react';

// const useBase64 = () => {
//   const [base64Images, setBase64Images] = useState([]);

//   const convertToBase64 = async (files) => {
//     const promises = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           resolve(reader.result);
//         };
//         reader.onerror = reject;
//       });
//     });

//     const base64Array = await Promise.all(promises);
//     setBase64Images(base64Array);
//   };

//   return { base64Images, convertToBase64 };
// };

// export default useBase64;

// import { useState, useCallback } from 'react';

// const useBase64 = () => {
//   const [base64Images, setBase64Images] = useState([]);
//   const [error, setError] = useState(null);

//   const convertToBase64 = useCallback(async (files) => {
//     setError(null);

//     const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

//     if (imageFiles.length === 0) {
//       setError('Please upload valid image files.');
//       return;
//     }

//     try {
//       const promises = imageFiles.map((file) => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = () => reject(new Error('Error reading file'));
//         });
//       });

//       const newBase64Array = await Promise.all(promises);
      
//       // Agregar nuevas imágenes al estado sin sobrescribir las anteriores
//       setBase64Images((prevImages) => [...prevImages, ...newBase64Array]);
//     } catch (err) {
//       setError('Error converting files to base64');
//     }
//   }, []);

//   const clearImages = () => {
//     setBase64Images([]);
//     setError(null);
//   };

//   return { base64Images, convertToBase64, clearImages, error };
// };

// export default useBase64;
