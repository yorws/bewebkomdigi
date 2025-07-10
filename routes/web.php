<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MemberController;    // Import MemberController
use App\Http\Controllers\Admin\ContentController;   // Import ContentController
use App\Models\Page;                                // Import Page Model (untuk route welcome)

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

// Route untuk halaman utama ('/')
// Mengambil 'home' page content untuk tampilan default
Route::get('/', function () {
    $homePage = Page::where('slug', 'home')->with('sections')->first();
    return view('welcome', compact('homePage'));
});

// Route untuk dashboard setelah login (dibawaan Breeze)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Grup route yang memerlukan autentikasi
Route::middleware('auth')->group(function () {
    // Route untuk profil pengguna (dibawaan Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Admin Routes ---
    // Semua route di dalam grup ini akan memiliki prefix 'admin/' dan nama route dimulai dengan 'admin.'
    Route::prefix('admin')->name('admin.')->group(function () {

        // Menggunakan Route::resource untuk semua operasi CRUD standar untuk 'members'
        // Ini secara otomatis mendefinisikan rute: index, create, store, show, edit, update, destroy
        Route::resource('members', MemberController::class);

        // Rute untuk mengelola konten (Halaman dan Bagian)
        Route::get('content', [ContentController::class, 'index'])->name('content.index');             // Menampilkan daftar semua halaman (Home, About Us, dll.)
        Route::get('content/{page}', [ContentController::class, 'show'])->name('content.show');         // Menampilkan daftar sections untuk halaman tertentu
        Route::get('content/{page}/create', [ContentController::class, 'create'])->name('content.create'); // Menampilkan formulir untuk menambah section baru
        Route::post('content/{page}', [ContentController::class, 'store'])->name('content.store');     // Menyimpan section baru ke database
        Route::get('content/{section}/edit', [ContentController::class, 'edit'])->name('content.edit'); // Menampilkan formulir untuk mengedit section yang ada
        Route::put('content/{section}', [ContentController::class, 'update'])->name('content.update'); // Memperbarui section di database
        Route::delete('content/{section}', [ContentController::class, 'destroy'])->name('content.destroy'); // Menghapus section dari database
    });
});

// Rute untuk autentikasi (login, register, dll.) bawaan Breeze
require __DIR__.'/auth.php';

