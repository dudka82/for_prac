import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ meetings, themes, auth }) { 
    const { data, setData, put, processing, errors } = useForm({
        place: meetings.place,
        name: meetings.name,
        date: meetings.date,
        time: meetings.time,
        description: meetings.description,
        available_seats: meetings.available_seats,
        theme_id: meetings.theme_id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('meetings.update', meetings.id)); 
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            title="Редактирование мероприятия"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Название мероприятия</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                                {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Тема</label>
                                <select
                                    value={data.theme_id}
                                    onChange={(e) => setData('theme_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    {themes.map((theme) => (
                                        <option 
                                            key={theme.id} 
                                            value={theme.id}
                                        >
                                            {theme.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.theme_id && <div className="text-red-500 mt-1">{errors.theme_id}</div>}
                            </div>

                          
                               
                            <div className="mb-4">
                                <label className="block text-gray-700">Место проведения</label>
                                <input
                                    type="text"
                                    value={data.place}
                                    onChange={(e) => setData('place', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                                {errors.place && <div className="text-red-500 mt-1">{errors.place}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Дата</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                                {errors.date && <div className="text-red-500 mt-1">{errors.date}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Время</label>
                                <input
                                    type="time"
                                    value={data.time}
                                    onChange={(e) => setData('time', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                                {errors.time && <div className="text-red-500 mt-1">{errors.time}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Описание</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    rows="4"
                                />
                                {errors.description && <div className="text-red-500 mt-1">{errors.description}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Доступные места</label>
                                <input
                                    type="number"
                                    value={data.available_seats}
                                    onChange={(e) => setData('available_seats', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    min="1"
                                />
                                {errors.available_seats && <div className="text-red-500 mt-1">{errors.available_seats}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <Link
                                    href={route('meetings.index')}
                                    className="text-gray-600 hover:text-gray-900 mr-4"
                                >
                                    Отмена
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                                >
                                    {processing ? 'Обновление...' : 'Обновить'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}