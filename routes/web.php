<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\ContentController;
use App\Models\Page;
use App\Models\Member;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// --- 1. Rute Khusus untuk Aplikasi Laravel Blade Murni (Jika ada) ---
// Saat ini, rute '/' masih mengembalikan 'welcome' (Blade murni).
// Jika Anda ingin halaman utama '/' sepenuhnya di-handle oleh aplikasi React Anda,
// ubah `return view('welcome')` menjadi `return view('app')` DI SINI.
Route::get('/', function () {
    $homePage = Page::where('slug', 'home')->with('sections')->first();
    return view('welcome', compact('homePage')); // Pastikan 'welcome.blade.php' bersih dari elemen admin.
})->name('welcome');


// --- 2. Rute API untuk Frontend React (PENTING: Sebelum Catch-all React) ---
// Frontend React Anda akan memanggil rute-rute ini untuk mendapatkan data dari Laravel.
// Jika API Anda semakin banyak, sangat disarankan untuk memindahkannya ke `routes/api.php`
// dan menambahkan `Route::prefix('api')->group(function () { ... });` di sana.
Route::get('/api/members', function () {
    return Member::orderBy('order')->get();
});

Route::get('/api/pages/{slug}', function ($slug) {
    return Page::where('slug', $slug)->with('sections')->firstOrFail();
});
// Tambahkan rute API lainnya di sini jika ada.


// --- 3. Rute yang Membutuhkan Autentikasi (Admin Dashboard & Profil Pengguna) ---
// Rute-rute ini akan menggunakan layout 'layouts.admin.blade.php'.
// Pastikan semua view yang dipanggil di sini meng-extend 'layouts.admin'.
Route::middleware(['auth', 'verified'])->group(function () {

    // Rute untuk Dashboard Admin
    // View 'dashboard' (resources/views/dashboard.blade.php) harus meng-extend 'layouts.admin'.
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // Rute profil pengguna (Breeze default)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Admin Routes ---
    // Semua rute dalam grup ini akan memiliki 'admin/' prefix dan nama rute 'admin.'.
    Route::prefix('admin')->name('admin.')->group(function () {

        // CRUD resource untuk 'members'
        // View yang digunakan oleh MemberController harus meng-extend 'layouts.admin'.
        Route::resource('members', MemberController::class);

        // Rute untuk mengelola konten (Pages dan Sections)
        // View yang digunakan oleh ContentController harus meng-extend 'layouts.admin'.
        Route::get('content', [ContentController::class, 'index'])->name('content.index');
        Route::get('content/{page}', [ContentController::class, 'show'])->name('content.show');
        Route::get('content/{page}/create', [ContentController::class, 'create'])->name('content.create');
        Route::post('content/{page}', [ContentController::class, 'store'])->name('content.store');
        Route::get('content/{section}/edit', [ContentController::class, 'edit'])->name('content.edit');
        Route::put('content/{section}', [ContentController::class, 'update'])->name('content.update');
        Route::delete('content/{section}', [ContentController::class, 'destroy'])->name('content.destroy');
    });
});

// --- 4. Rute Autentikasi Laravel (Breeze) ---
// Pastikan rute ini dimuat setelah middleware 'auth' agar tidak bentrok dengan rute yang dilindungi.
require __DIR__.'/auth.php';


// --- 5. Catch-all Route untuk Aplikasi React (HARUS PALING BAWAH) ---
// Ini akan memuat view 'app' (resources/views/app.blade.php) yang berisi wadah React Anda.
// Rute ini menangkap semua URL yang belum cocok dengan rute-rute Laravel di atasnya.
// Frontend React Router kemudian akan mengambil alih navigasi di sisi klien untuk URL ini.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');