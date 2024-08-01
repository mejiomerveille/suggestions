'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { findSuggestionByPk,updateSuggestion } from '@/app/services';
import { UsersIcon, DocumentTextIcon, HandThumbUpIcon  } from '@heroicons/react/24/outline'; 
import Image from 'next/image';
import logo from '../../../logo.png';

const CreateSuggestion = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [id, setId] = useState('');

  // reccuperation des suggestions
  useEffect(() => {
    findSuggestionByPk()
      .then(response => {
        setSuggestions(response.data);
        setId(response.data.id)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des suggestions:', error);
        setError('Erreur lors de la récupération des suggestions.');
      });
  }, []);
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data={
      content:content,
      status:status
    }

    try {
      // Envoyer la suggestion au backend
      const response = await updateSuggestion(id,data);

      if (!response.message) {
        throw new Error('Erreur lors de la modifiation de la suggestion.');
      }
      else{
        setError(`La suggestion ${response.data.id} a bien été modifie.`)
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
            <ul>
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

          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Créer une suggestion</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Contenu
          </label>
          <textarea
            id="content"
            defaultValue={suggestions.content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Statut
          </label>
          <select
            id="status"
            defaultValue={suggestions.status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Pending">En attente</option>
            <option value="Approved">Approuvé</option>
            <option value="Rejected">Rejeté</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
            </main>
          </div>
        </main>
      </div>

   
  );
};

export default CreateSuggestion;