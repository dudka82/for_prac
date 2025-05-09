
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ themes = [], auth = {} }) {
    const normalizedThemes = Array.isArray(themes) ? themes : [];
    const isAdmin = auth.user?.role === 'admin';

    return (
        <AuthenticatedLayout 
            user={auth.user}
            title="Темы мероприятий"
        >
            <Head title="Темы мероприятий" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isAdmin && (   
                        <Link 
                            href={route('themes.create')}
                            className="mb-6 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                        >
                            Создать тему
                        </Link>
                    )}

<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      {normalizedThemes.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Название
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Описание
                                        </th>
                                        {isAdmin && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Действия
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {normalizedThemes.map((theme) => (
                                        <tr key={theme.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {theme.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {theme.description}
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <Link
                                                        href={route('themes.edit', theme.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Редактировать
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('themes.destroy', theme.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        as="button"
                                                        onBefore={() => confirm('Вы уверены, что хотите удалить эту тему?')}
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
                                Нет доступных тем
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}