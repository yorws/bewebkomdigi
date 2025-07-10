<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; // Biasanya ada secara default, untuk contoh user dummy
use Database\Seeders\PageSeeder; // <-- PASTIKAN BARIS INI ADA

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil seeder lain di sini agar dieksekusi saat db:seed dijalankan
        $this->call([
            PageSeeder::class, // <-- PASTIKAN BARIS INI ADA
            // Anda bisa menambahkan seeder lain di sini, contoh: UserSeeder::class,
        ]);

        // Contoh user dummy yang dibuat oleh Laravel Breeze, bisa diaktifkan atau dikomentari
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('password'), // Ganti 'password' dengan password yang kuat
        // ]);
    }
}