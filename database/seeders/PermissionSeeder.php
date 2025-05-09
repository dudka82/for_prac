<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
{
    // Существующие разрешения для meetings
    $meetingsPermissions = [
        'view meetings',
        'create meetings',
        'edit meetings',
        'delete meetings',
    ];
    
    // Новые разрешения для themes
    $themesPermissions = [
        'view themes',
        'create themes',
        'edit themes', 
        'delete themes',
    ];

    // Создаем все разрешения
    foreach (array_merge($meetingsPermissions, $themesPermissions) as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    // Назначаем все права админу
    $adminRole = Role::firstOrCreate(['name' => 'admin']);
    $adminRole->syncPermissions(Permission::all());
}
}