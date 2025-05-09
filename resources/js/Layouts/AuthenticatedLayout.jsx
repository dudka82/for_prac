// 
import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ children, user = null, title = '' }) {
      

       
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />

            <nav className="bg-orange-100 shadow-sm">               
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">

                        <svg className="w-6 h-6 mr-96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
            </svg>


                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-gray-900">Главная</a>
                  <a href="/categories" className="text-gray-700 hover:text-gray-900">Категории</a>
                  <a href="/search" className="text-gray-700 hover:text-gray-900">Каталог</a>
                </nav> 
                        </div>
                        
                        {user && (
                            <div className="flex items-center">
                                <Link
                                href={'/dashboard'}
                                >
                                <span className="mr-4">{user.name}</span>
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Выйти
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
   
    
}