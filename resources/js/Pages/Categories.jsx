
import { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/category')  // Запрос к Laravel API
      .then(response => {
        setThemes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []); // Зависимость пустая, значит запрос выполняется только один раз при монтировании

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;


return(
<div className='d-flex align-content-center w-full mb-48'>
      <h1 className="text-2xl font-bold mb-4 text-center">Список категорий</h1>
      {themes.length > 0 ? (
        <ul class="flex flex-col items-center justify-center list-none p-0 m-0">
          {themes.map((theme) => (
            <li key={theme.id} className="bg-beige-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
              <h2 className="text-lg font-bold mb-2">{theme.name}</h2>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Описание: </span> {theme.description}</p>
              {/* <p>Тема ID: {theme_id}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
);
}  
const Logo = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
    </svg>
  );
 

  const Footer = () => (
  <footer className="bg-orange-200  mt-0 py-6">
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
  )
  function Header() {
    return (
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
    );
  }
export default function categories(){
  return(
    <div>
<Header/>
<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12  gap-12">
<Categories/>
</main>
<Footer/>


    </div>
  );

};
