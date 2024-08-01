'use client';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { getVotes } from '@/app/services';
import { TrashIcon, PencilIcon, UsersIcon, DocumentTextIcon, HandThumbUpIcon  } from '@heroicons/react/24/outline'; 
import Image from 'next/image';
import logo from '../../logo.png';

const CreateSuggestion = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [vote, setVote] = useState([]);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 // reccuperation des suggestions
 useEffect(() => {
  getVotes()
    .then(response => {
      setVote(response.data);
      console.log(response.data)
      console.log(response)
    })
    .catch(error => {
      setError('Veuillez vous reconnecter pour acceder aux ressources');
    });
}, []);

 // Calculer les éléments à afficher
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = vote.slice(indexOfFirstItem, indexOfLastItem);

 // Calculer le nombre de pages
 const totalPages = Math.ceil(vote.length / itemsPerPage);



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
          <div className="container mx-auto px-4 py-8 bg-gray-200">
    <div className='flex justify-around mb-3'>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Table Vote
      </h1>
      {/* <a href="/admin/suggestions/add">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add suggestions
      </button>
      </a> */}
    </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div>
    
        <div className="overflow-x-auto rounded-md shadow-md">
          <table className="bg-gray-300 table-auto w-full text-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-bold">ID</th>
                <th className="px-4 py-2 text-left font-bold">Suggestion</th>
                <th className="px-4 py-2 text-left font-bold">User</th>
                <th className="px-4 py-2 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.suggestion_id}</td>
                  <td className="px-4 py-2">{item.user_id}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      // onClick={() => handleDelete(item.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      // onClick={() => handleEdit(item.id)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
             {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
         </div>
            </div>
        </div>
          </main>
          </div>
        </main>
      </div>
   
  );
};

export default CreateSuggestion;