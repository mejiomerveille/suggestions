'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import Image from 'next/image';
import Logo from '../../app/logo.png';
import { getSuggestions } from '@/app/services';
import { useRouter } from "next/navigation";


const Header = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [top, setTop] = useState(true);
  const [verif, setVerif] = useState('');

  useEffect(() => {
    getSuggestions()
      .then(response => {
        setSuggestions(response.data);
        console.log(response.data)
        console.log(response)
      })
      .catch(error => {
        setVerif('Veuillez vous reconnecter pour acceder aux ressources');
      });
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset > 10 ? false : true);
    };

    if (top) {
      scrollHandler();
      window.addEventListener('scroll', scrollHandler);
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [top]);

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
        <a className="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
            <div className="shrink-0 mr-4">
            <Image src={Logo} alt="Logo" width="60" height="60" />
          </div>
            </a>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              {suggestions.length===0? (
                <>
                
                  <li>
                    <Link href="/login" className="font-medium text-black hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Se connecter
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="font-medium text-black hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      <span>S&apos;inscrire</span>
                      <svg className="w-3 h-3 fill-current text-black shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/create" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Creer une suggestion
                    </Link>
                  </li>
              </>
             )}
             
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
export default Header;
