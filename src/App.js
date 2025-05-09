import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/auth/AdminRoute';
import TopicsManagement from './components/admin/TopicsManagement';
import EventsManagement from './components/admin/EventsManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Другие маршруты */}
        
        <Route path="/admin/topics" element={
          <AdminRoute>
            <TopicsManagement />
          </AdminRoute>
        } />
        
        <Route path="/admin/events" element={
          <AdminRoute>
            <EventsManagement />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;