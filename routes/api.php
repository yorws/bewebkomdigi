<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Member; // Import model Member
use App\Http\Controllers\Api\ContentApiController; // Import ContentApiController

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route API yang dilindungi oleh autentikasi (bawaan Laravel Sanctum)
// Mengembalikan informasi pengguna yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// --- Public API Routes ---

// Rute API publik untuk mendapatkan daftar anggota
// Mengembalikan semua anggota, diurutkan berdasarkan kolom 'order'
Route::get('/members', function () {
    return Member::orderBy('order')->get();
});

// Public API untuk konten profil perusahaan
// Ini adalah endpoint yang akan diakses oleh frontend React Anda
// Mengambil semua halaman dengan sections
Route::get('/pages', [ContentApiController::class, 'getPages']);
// Mengambil konten halaman spesifik berdasarkan slug
Route::get('/pages/{slug}', [ContentApiController::class, 'getPageContentBySlug']);

// Contoh rute API sederhana untuk pengujian
Route::get('/test-api-simple', function () {
    return response()->json(['message' => 'API test successful!']);
});

// Anda bisa menambahkan endpoint API lain di sini jika diperlukan, contoh:
// Route::get('/sections/{section}', [ContentApiController::class, 'getSectionContent']);

