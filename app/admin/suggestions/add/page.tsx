'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSuggestion } from '@/app/services';
import { TrashIcon, PencilIcon, UsersIcon, DocumentTextIcon, HandThumbUpIcon  } from '@heroicons/react/24/outline'; 
import Image from 'next/image';
import logo from '../../../logo.png';

const CreateSuggestion = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data={
      content:content,
      status:status
    }

    try {
      // Envoyer la suggestion au backend
      const response = await createSuggestion(data);

      if (!response.message) {
        throw new Error('Erreur lors de la soumission de la suggestion.');
      }
      else{
        setError(`La suggestion ${response.data.id} a bien été crée.`)
        router.replace("/admin/suggestions");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white flex justify-between items-center p-4">
        <div className="flex items-center">
        {/* <Image src={logo} alt="Logo" className="h-8 mr-2" width={50} height={50} /> */}
          <h1 className="text-lg ml-96">Tableau de bord</h1>
        </div>
        <div className="flex items-center">
          <span>Bonjour, Merveille</span>
        </div>
      </header>

      <main className="flex flex-row ">
        <div className="flex">
          <aside className="w-1/4 bg-gray-800 text-white p-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <ul >
            <li className="py-2 flex items-center">
            <UsersIcon className="h-5 w-5 mr-2" />
            <a href="/admin/users">Users</a>
          </li>
          <li className="py-2 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            <a href="/admin/suggestions">Suggestions</a>
          </li>
          <li className="py-2 flex items-center">
            <HandThumbUpIcon className="h-5 w-5 mr-2" />
            <a href="/admin/votes">Votes</a>
          </li>
            </ul>
          </aside>
          <main className="flex-1 p-4">

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-center mb-8">
                Soumettez une suggestion
              </h1>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
               <form onSubmit={handleSubmit}  className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <label className="block mb-4">
                      <span className="text-gray-700">Votre Suggestion</span>
                      <textarea
                        required
                         id="content"
                         name="content"
                         value={content}
                         onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Écrivez votre suggestion ici..."
                      />
                    </label>
                    <label className="block mb-4">
                      <span className="text-gray-700">Status</span>
                      <select
                        id="status"
                        name="status"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </label>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      Soumettre
                    </button>
                  </form>
              </div>
            </main>
          </div>
        </main>
      </div>
   
  );
};

export default CreateSuggestion;