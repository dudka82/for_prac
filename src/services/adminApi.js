import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8001/api/admin',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Добавляем токен авторизации
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Темы
export const getThemes = async () => {
  return api.get('/themes');
};

export const createTheme = async (topicData) => {
  return api.post('/themes', topicData);
};

export const updateTheme = async (id, topicData) => {
  return api.put(`/themes/${id}`, topicData);
};

export const deleteTheme = async (id) => {
  return api.delete(`/themes/${id}`);
};

// Мероприятия
export const getMeetings = async () => {
  return api.get('/meetings');
};

export const createMeeting = async (eventData) => {
  return api.post('/meetings', eventData);
};

export const updateMeeting = async (id, eventData) => {
  return api.put(`/meetings/${id}`, eventData);
};

export const deleteMeeting = async (id) => {
  return api.delete(`/meetings/${id}`);
};