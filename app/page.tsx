"use client";
import moment from 'moment';
import Avatar from 'react-avatar'; 
import { useState,useEffect } from 'react';
import { getSuggestions,createVote } from './services';
import { useRouter } from 'next/navigation';
import img from '../images/ecole.jpg'
import FullImageWithText from '../components/slide/slide';


export default function Home({ onLike }) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const router=useRouter()

  // reccuperation des suggestions
  useEffect(() => {
    getSuggestions()
      .then(response => {
        setSuggestions(response.data);
        console.log(response.data)
        console.log(response)
      })
      .catch(error => {
        setError('Veuillez vous reconnecter pour acceder aux ressources');
      });
  }, []);

  const handleLike = async (suggestion) => { 
    const user=localStorage.getItem('user')

    const data = {
      suggestion_id: suggestion.id,
      user_id:user
    }
    try {
      console.log(data)
      const response = await createVote(data);
      console.log(response)
      setLiked(true);
      onLike(); 
    } catch (error) {
      console.error(error);
    }
  };


  if(suggestions.length===0){
    return (
      <FullImageWithText
        imageSrc={img}
        text="Bienvenue dans la boite de suggestions de Primetec Academy. Connectez-vous pour soumettre vos suggestions et consulter celles des autres.!"
      />
    );
  }

  return (
    <div className='mt-24'>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bienvenue à Primetec Academy</h1>
      <p className="mb-6">Soumettez vos suggestions et consulter celles des autres.</p>
     

      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Rechercher une suggestion..."
          className="w-full rounded-lg py-2 px-4 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          // value={searchTerm}
          // onChange={handleSearch}
          />
        <button type="button" className="absolute right-3 top-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white px-2 py-1">
          Rechercher
        </button>
      </div>
   
      <div className="mt-8 grid grid-cols-1 gap-4">
        {suggestions.map((item) => (
          <div key={item.id} className="bg-gray-300 rounded shadow-md">
            <hr />
            <div className="flex items-center px-6 py-4">
              <div className="relative">
              <Avatar
                name={item.author} 
                size={48} 
                round={true} 
                className="border-2 border-white mr-4"
              />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">{item.author || 'Anonymous'}</h2>
                <p className="text-gray-700 text-sm"><span className="align-middle">{moment(item.created).format('MMM DD, YYYY')}</span></p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold mb-2">{item.content}</h3>
              <div className="bg-green-100 p-2 rounded-lg flex justify-around">
                <p className="text-green-500 font-bold">{item.status}</p>
              <div>
              <button onClick={() => handleLike(item)} disabled={liked}>
                {liked ? 'Voté:' : 'Voter:'}
              </button>
              <span>{item.nombre_de_votes} vote</span>
            </div>
              </div>
            </div>
          
          </div>
        ))}
      </div>
    </div>
        </div>
  );
}