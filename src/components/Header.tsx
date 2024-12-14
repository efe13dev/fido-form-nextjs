'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className='mx-4 sm:mx-8 md:mx-16 lg:mx-32 pt-6 sm:pt-10'>
      <div className='flex items-center justify-center mb-4 sm:mb-6'>
        <img
          src='/fido-logo-cuadrado.png'
          alt='logo de fido'
          className='w-16 h-16 mr-4'
        />
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold font-serif text-gray-800'>
          Huellas
        </h1>
      </div>
      <h2 className='text-center text-gray-500 text-lg sm:text-xl md:text-2xl'>
        Web de gestion interna
      </h2>
      <nav className='flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 sm:gap-6'>
        {session && (
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-6'>
            <Link href={'./'}>
              <Button
                variant={'ghost'}
                className='w-full sm:w-auto text-sm sm:text-base text-gray-800 hover:text-white hover:bg-gray-800 transition-colors duration-300'
              >
                Añadir nuevo
              </Button>
            </Link>
            <Link href={'./list'}>
              <Button
                variant={'ghost'}
                className='w-full sm:w-auto text-sm sm:text-base text-gray-800 hover:text-white hover:bg-gray-800 transition-colors duration-300'
              >
                Lista de animales
              </Button>
            </Link>
          </div>
        )}
        <div className='flex items-center gap-3'>
          {session && (
            <>
              <LogoutButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};