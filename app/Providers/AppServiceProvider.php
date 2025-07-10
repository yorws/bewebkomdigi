<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route; // Pastikan ini diimpor

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard'; // Ini adalah path default dari Laravel Breeze

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        // Konfigurasi rate limiting untuk API (bawaan Laravel)
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        // Mendefinisikan rute-rute aplikasi
        $this->routes(function () {
            // Rute untuk API Anda
            Route::middleware('api') // Menggunakan middleware group 'api'
                ->prefix('api')     // Menambahkan prefix 'api/' ke semua rute di api.php
                ->group(base_path('routes/api.php')); // Memuat file routes/api.php

            // Rute untuk aplikasi web Anda
            Route::middleware('web') // Menggunakan middleware group 'web'
                ->group(base_path('routes/web.php')); // Memuat file routes/web.php
        });
    }
}