<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;
use Illuminate\Support\Facades\Hash;

class ThemeSeeder extends Seeder
{
    public function run()
    {
        // Очистка таблицы перед заполнением (опционально)

        // Создание тестовых пользователей
        Theme::create([
            'name' => 'Концерт',
            'description' => 'музыкальное выступление артиста, проводится в основном в закрытом помещении и ограниченным количеством билетов.',
        ]);

        Theme::create([
            'name' => 'Выставка',
            'description' => 'мероприятие, которое проводится с целью показа новых произведений искусств, проводится в музеях.',
        ]);
    
        Theme::create([
            'name' => 'Праздник',
            'description' => 'всеобщее мероприятие, которое проводится в честь какого-то праздника, проводится в основном на открытом воздухе.',
        ]);

      
    }
}