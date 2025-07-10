<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page; // Penting: Impor model Page

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data awal untuk halaman-halaman profil perusahaan
        Page::create(['name' => 'Home', 'slug' => 'home', 'title' => 'Build Your Digital Future Here', 'description' => 'Official website of the Digital Talent Ecosystem.']);
        Page::create(['name' => 'About Us', 'slug' => 'about-us', 'title' => 'Strengthening Indonesia\'s National Digital Talent Ecosystem', 'description' => 'Learn more about our mission and values.']);
        Page::create(['name' => 'Products', 'slug' => 'products', 'title' => 'Empowering Indonesia’s Digital Talents', 'description' => 'Discover our integrated digital products.']);
        Page::create(['name' => 'Career', 'slug' => 'career', 'title' => 'Launch Your Digital Career with Confidence', 'description' => 'Access a range of digital operator opportunities.']);
        Page::create(['name' => 'Ecosystem', 'slug' => 'ecosystem', 'title' => 'Our Digital Talent Ecosystem', 'description' => 'One platform for training, certification and job access.']);
        // Anda bisa menambahkan halaman lain di sini jika diperlukan
    }
}