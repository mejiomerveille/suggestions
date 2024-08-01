"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "@/app/services";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from 'react';
import Image from "next/image";
import im from '../image1.png'
// import { BG,FB,GG,TW} from "../../app/services";

const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  username: Yup.string().required(`veuillez saisir nom d'utilisateur`),
  email: Yup.string().email('Veuillez saisir un email valide').required('veuillez saisir votre email'),
  password: Yup.string().required('veuillez saisir votre mot de passe').min(8),
  role: Yup.string().required('veuillez selectioner votre profil'),
});

const Signin: NextPage = () => {
  const[loading,setLoading]=useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },

    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ username,email, password,role}) => {
      try {
        setIsLoading(true); 
        const response = await register({ username,email, password,role });
        if (response) {
          console.log(response)
          setSuccessMessage('connexion réussie !');
          router.replace("/login");
        } else {
          setErrorMessage('le nom est deja utilise.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); 
      }
    },
  });
  
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 w-full">
        <div className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Formulaire d'inscription</h1>
            <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                 onChange={handleChange}
                 type="text"
                 value={values.username}
                 id="username"
                 name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                 onChange={handleChange}
                 type="email"
                 value={values.email}
                 id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  />
              {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Mot de Passe
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                  />
              {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  profil
                </label>
                <select value={values.role} onChange={handleChange}
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring focus:ring-green-500"
                >
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                </select>
              {errors.role && touched.role && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.role}</span>}
              </div>
              <div className="flex items-center mb-4">
                
            <div className="mt-4 text-center">
              
              <Link className="text-sm mt-3" href={"/login"}>
                Vous avez deja un compte? <span className="underline">Se connecter</span>
              </Link>
            </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
                >
                  {isLoading ? (
                      <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
                    ) : ( "S'inscrire"
                  )}
                </button>
              </div>
              <p>{successMessage}</p>
              <p>{errorMessage}</p>
             
            </form>
          </div>
          
        </div>
      </div>
    </div>

  );
}
export default Signin;
