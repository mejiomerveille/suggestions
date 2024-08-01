 "use client";
 import { useState } from 'react';
import { createSuggestion } from '../services';
import { useRouter } from 'next/navigation';
 

 export default function CreateSuggestion() {
   const [content, setContent] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
 
   const handleSubmit = async (event: { preventDefault: () => void; }) => {
     event.preventDefault();
 
     const data={
       content:content,
     }
 
     try {
       const response = await createSuggestion(data);
 
       if (!response.message) {
         throw new Error('Erreur lors de la soumission de la suggestion.');
       }
       else{
         setError(`La suggestion ${response.data.id} a bien été crée.`)
         router.replace("/");
       }
     } catch (error) {
       setError(error.message);
     }
   };
 
   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Créer une nouvelle suggestion</h1>
     
   
      <div className="container mx-auto p-4">
       <form onSubmit={handleSubmit}>
         <textarea
           className="w-full border border-gray-300 p-2 rounded"
           placeholder="Entrez votre suggestion ici"
           value={content}
           id="content"
           name="content"
           onChange={(e) => setContent(e.target.value)}
         />
         <button
           type="submit"
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
         >
           Soumettre
         </button>
       </form>
  
      </div>
    </div>

    
   );
 }
 