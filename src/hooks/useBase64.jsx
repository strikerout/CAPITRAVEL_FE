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

