    import React from 'react';
    import { Head, Link } from '@inertiajs/react';
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

    export default function Index({ meetings = [], auth = {}, themes = [] }) {
        // Проверяем и нормализуем данные
        const normalizedMeetings = Array.isArray(meetings) ? meetings : [];
        const normalizedThemes = Array.isArray(themes) ? themes : [];
        const isAdmin = auth.user?.role === 'admin';

        return (
            <AuthenticatedLayout 
                user={auth.user}
                title="Мероприятия"
            >
                
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isAdmin && (
                            <Link 
                                href={route('meetings.create')}
                                className="mb-6 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                            >
                                Создать мероприятие
                            </Link>
                        )}

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {normalizedMeetings.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* Заголовок таблицы */}
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тема</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                                            {isAdmin && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                                            )}
                                        </tr>
                                    </thead>
                                    {/* Тело таблицы */}
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {normalizedMeetings.map((meeting) => (
                                            <tr key={meeting.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{meeting.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {normalizedThemes.find(t => t.id === meeting.theme_id)?.name || 'Без темы'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(meeting.date).toLocaleDateString()}
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link
                                                       href={route('meetings.edit', meeting.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Редактировать
                                                    </Link>



                                                        <Link
                                                            method="delete"
                                                            href={route('meetings.destroy', meeting.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            as="button"
                                                        >
                                                            Удалить
                                                        </Link>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    Нет доступных мероприятий
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }