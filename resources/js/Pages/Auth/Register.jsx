import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';



export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
function Logo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
    return (
        <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-100 shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
  <div className="flex items-center">
    <Logo />
  </div>
  <nav className="hidden md:flex space-x-8">
    <a href="/" className="text-gray-700 hover:text-gray-900">Главная</a>
    <a href="categories" className="text-gray-700 hover:text-gray-900">Категории</a>
    <a href="search" className="text-gray-700 hover:text-gray-900">Каталог</a>
    <a href="dashboard" className="text-gray-700 hover:text-gray-900">Личный кабинет</a>
  </nav>
</div>
</header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Регистрация</h1>
            <form onSubmit={submit} className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200"    >
                <div>
                    <InputLabel className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32 ml-12" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
            </main>
            <footer className="bg-orange-200 shadow-sm mt-12 py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
    <div className="flex items-center mb-4 md:mb-0">
      <Logo />
    </div>
    <div className="text-gray-600 text-sm mb-4 md:mb-0">
      Спасибо что выбрали нас!
    </div>
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
      <div className="flex flex-col">
        <span className="font-bold text-gray-700">О НАС</span>
        <a href="/" className="text-gray-600 hover:text-gray-900">Главная</a>
        <a href="dashboard" className="text-gray-600 hover:text-gray-900">Личный кабинет</a>
        <a href="search" className="text-gray-600 hover:text-gray-900">каталог</a>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-gray-700">КОНТАКТЫ</span>
        <span className="text-gray-600">+7 800 555-35-35</span>
        <span className="text-gray-600">Neshop@gmail.com</span>
      </div>
    </div>
  </div>
</footer>
      </div>
    );
}

  
      