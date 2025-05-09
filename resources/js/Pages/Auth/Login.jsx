import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';





import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {  Link, useForm } from '@inertiajs/react';





export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const Logo = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
        </svg>
      );
    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
  //    const aa=getRole();
  // if(aa=='admin'){
  //   return 'kaiiif'
  // }
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
      <main className="flex-grow flex items-center justify-center py-12">
      <div className="bg-beige-100 p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Вход</h1>
            <form onSubmit={submit}>
                <div className="mb-4">
                    <InputLabel htmlFor="email" value="Email" className="block text-gray-700 text-sm font-bold mb-2"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('register')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </Link>
                    )}

                    <PrimaryButton  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32 ml-12" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
            
            </div>
</main>
  <footer className="bg-orange-200 shadow-sm mt-64 py-6">
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
