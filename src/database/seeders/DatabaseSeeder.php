<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $userAdmin = User::firstOrNew([
            'email' => 'admin@cellarvinhos.com.br'
        ]);

        $userAdmin->fill([
            'name' => 'Admin',
            'password' => bcrypt('password')
        ]);

        $userAdmin->save();


        $this->call([
            CategorySeeder::class,
            TicketSeeder::class,
        ]);
    }
}
