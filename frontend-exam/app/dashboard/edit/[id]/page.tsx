"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditUserPage() {
  const { id } = useParams(); // Obtener el id de la URL
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Obtener los datos del usuario al cargar la página
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
        setUsername(response.data.username);
        setPassword(response.data.password);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  // Función para manejar la edición del usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        username,
        password,
      });
      router.push('/dashboard'); // Redirigir a la lista de usuarios después de editar
    } catch (err) {
      setError('Error al editar el usuario');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}