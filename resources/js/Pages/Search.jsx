
import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex justify-center mb-12 mt-12">
      <input 
        type="text" 
        className="w-full max-w-md p-2 border border-gray-300 rounded" 
        placeholder="Search" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

    </div>
  );
}

function Checkbox({ selectedThemes, setSelectedThemes }) {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/searches')
      .then(response => {
        setThemes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  const handleThemeChange = (themeId) => {
    setSelectedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='d-flex align-content-start flex-wrap mb-12'>
      {themes.length > 0 ? (
        <ul className='mt-12 ml-24'>
          {themes.map((theme) => (
            <li key={theme.id} className="bg-beige-100 p-6 rounded-lg shadow-md w-full md:w-1/6">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-orange-600" 
                checked={selectedThemes.includes(theme.id)}
                onChange={() => handleThemeChange(theme.id)}
              />
              <span className="text-gray-700"> {theme.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
  );
}

function Cards({ searchQuery, selectedThemes }) {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({});

  useEffect(() => {
    axios.get('/welcome')
      .then(response => {
        setMeetings(response.data);
        setFilteredMeetings(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  // Фильтрация встреч при изменении searchQuery или selectedThemes
  useEffect(() => {
    let filtered = [...meetings];
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(meeting => 
        meeting.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Фильтрация по выбранным темам
    if (selectedThemes.length > 0) {
      filtered = filtered.filter(meeting => 
        selectedThemes.includes(meeting.theme_id)
      );
    }
    
    setFilteredMeetings(filtered);
  }, [searchQuery, selectedThemes, meetings]);


  const handleBookMeeting = async (meetingId) => {
    try {
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { loading: true, error: null, booked: false }
      }));

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const currentMeeting = meetings.find(m => m.id === meetingId);
      const currentSeats = currentMeeting?.available_seats || 0;

      const response = await axios.post('/meetings/book', {
        meetings_id: meetingId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        }
      });

      setMeetings(prev => prev.map(m => 
        m.id === meetingId 
          ? { ...m, available_seats: Math.max(0, currentSeats - 1) }
          : m
      ));

      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          booked: true,
          error: null
        }
      }));

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка бронирования';
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          error: errorMessage,
          booked: false
        }
      }));
    }
  };

  const handleCancelBooking = async (meetingId) => {
    try {
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { ...prev[meetingId], loading: true }
      }));

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const currentMeeting = meetings.find(m => m.id === meetingId);
      const currentSeats = currentMeeting?.available_seats || 0;

      await axios.post('/meetings/cancel', {
        meetings_id: meetingId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        }
      });

      setMeetings(prev => prev.map(m => 
        m.id === meetingId 
          ? { ...m, available_seats: currentSeats + 1 }
          : m
      ));

      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          booked: false,
          error: null
        }
      }));

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка отмены бронирования';
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          ...prev[meetingId],
          loading: false, 
          error: errorMessage
        }
      }));
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='d-flex align-content-start flex-wrap w-full'>
        {filteredMeetings.length > 0 ? (
        <ul className="flex justify-evenly flex flex-wrap gap-6">
          {filteredMeetings.map((meeting) => (
            <li key={meeting.id} className="bg-beige-100 p-6 rounded-lg shadow-md w-full md:w-1/5">
              <h2 className="text-lg font-bold mb-2">{meeting.name}</h2>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Локация: </span> {meeting.place}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Дата: </span> {meeting.date}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Время: </span>{meeting.time}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Описание: </span>{meeting.description}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Свободных мест: </span>{meeting.available_seats}</p>
              
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleBookMeeting(meeting.id)}
                  disabled={
                    bookingStatus[meeting.id]?.loading || 
                    meeting.available_seats <= 0 ||
                    bookingStatus[meeting.id]?.booked
                  }
                  className={`${
                    meeting.available_seats <= 0 || bookingStatus[meeting.id]?.booked
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-700'
                  } text-white font-bold py-2 px-4 rounded flex-1`}
                >
                  {bookingStatus[meeting.id]?.loading 
                    ? 'Загрузка...' 
                    : meeting.available_seats <= 0 
                      ? 'Мест нет' 
                      : bookingStatus[meeting.id]?.booked
                        ? 'Забронировано'
                        : 'Забронировать'}
                </button>
                
                {bookingStatus[meeting.id]?.booked && (
                  <button
                    onClick={() => handleCancelBooking(meeting.id)}
                    disabled={bookingStatus[meeting.id]?.loading}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1"
                  >
                    {bookingStatus[meeting.id]?.loading ? 'Отмена...' : 'Отменить'}
                  </button>
                )}
              </div>
              
              {bookingStatus[meeting.id]?.error && (
                <p className="text-red-500 mt-2">{bookingStatus[meeting.id].error}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className='mb-60'>Нет доступных встреч</p>
      )}
    </div>
  );
}

function Footer() {
  return (
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
            <a href="search" className="text-gray-600 hover:text-gray-900">Каталог</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-700">КОНТАКТЫ</span>
            <span className="text-gray-600">+7 800 555-35-35</span>
            <span className="text-gray-600">Neshop@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Logo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
  </svg>
);

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);

  return (
    <div>
      <Header/>
      <main>
        <div> 
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <Checkbox 
            selectedThemes={selectedThemes} 
            setSelectedThemes={setSelectedThemes}
          />
         
        </div>
        <Cards 
          searchQuery={searchQuery}
          selectedThemes={selectedThemes}
        />
      </main>
      <Footer/>
    </div>
  );
}