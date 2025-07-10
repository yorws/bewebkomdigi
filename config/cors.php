<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines which domains are allowed to access your
    | application's resources from a different domain. You may also
    | configure which HTTP methods and headers are allowed.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Tambahkan path API Anda
    'allowed_origins' => ['http://localhost:5173'], // Izinkan domain frontend React Anda
    'allowed_methods' => ['*'], // Izinkan semua metode (GET, POST, PUT, DELETE, dll.)
    'allowed_headers' => ['*'], // Izinkan semua header
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Sesuaikan ini jika Anda menggunakan cookie autentikasi di frontend
];