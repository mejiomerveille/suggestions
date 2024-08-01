'use client';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { updateUser,getuserByPk } from '@/app/services';
import { TrashIcon, PencilIcon, UsersIcon, DocumentTextIcon, HandThumbUpIcon  } from '@heroicons/react/24/outline'; 
import Image from 'next/image';
import logo from '../../../logo.png';

const EditUser = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [id, setId] = useState('');

  // reccuperation de utilisateurs
  useEffect(() => {
    getuserByPk()
      .then(response => {
        setUsers(response.data);
        setId(response.data.id)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des suggestions:', error);
        setError('Erreur lors de la récupération des suggestions.');
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data={
      username:username,
      email:email,
      role:role,
    }

    try {
      const response = await updateUser(id,data);
      console.log(response)

      if (!response.message) {
        throw new Error('Erreur lors de la soumission du user.');
      }
      else{
        setError(`L'utilisateur  a bien modifie.`)
        router.replace("/admin/users");
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
                Creer un nouveau utilisateur
              </h1>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

            <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                onChange={(e) => setUsername(e.target.value)}
                 type="text"
                 defaultValue={users.username}
                 id="username"
                 name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                 onChange={(e) => setEmail(e.target.value)}
                 type="email"
                 defaultValue={users.email}
                 id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  />
              </div>
              {/* <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Mot de Passe
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="password"
                  defaultValue={users.password}
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                  />
              </div> */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  profil
                </label>
                <select defaultValue={users.role} 
                onChange={(e) => setRole(e.target.value)}
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring focus:ring-green-500"
                >
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                </select>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700 text-sm font-bold">
                  Se souvenir de moi
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
                >Modifier
                </button>
              </div>
              {/* <p>{successMessage}</p>
              <p>{errorMessage}</p> */}
             
            </form>
            
              </div>
            </main>
          </div>
        </main>
      </div>
   
  );
};

export default EditUser;