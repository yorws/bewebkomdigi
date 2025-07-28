@extends('layouts.admin') {{-- Ini akan menggunakan layout admin yang kita buat --}}

@section('header') {{-- Konten untuk slot 'header' di layouts/admin.blade.php --}}
    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        {{ __('Admin Dashboard') }}
    </h2>
@endsection

@section('content') {{-- Konten utama dashboard akan masuk ke section 'content' di layouts/admin.blade.php --}}
    <div class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 lg:p-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <h1 class="mt-4 text-2xl font-medium text-gray-900 dark:text-gray-100">
                        Welcome, {{ Auth::user()->name }}!
                    </h1>
                    <p class="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                        This is your administration panel where you can manage the dynamic content of your company profile website.
                        Use the "Manage Content" link in the navigation to update pages and sections.
                    </p>
                    <div class="mt-8 flex items-center justify-start gap-4">
                        <a href="{{ route('admin.content.index') }}" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                            <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            Go to Content Management
                        </a>
                        {{-- Tombol "Back to Home" --}}
                        {{-- Mengarahkan ke root aplikasi Laravel yang sekarang dilayani oleh React --}}
                        <a href="{{ url('http://127.0.0.1:8000/home') }}" class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
                            <svg class="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                            </svg>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Gaya ini bisa dipindahkan ke file CSS Anda (app.css) jika Anda ingin */
        .shadow-xl {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); /* Shadow yang lebih dalam untuk kartu */
        }
        .sm\:rounded-lg {
            border-radius: 12px; /* Konsisten dengan login page */
        }
        .bg-white {
            background-color: #ffffff;
        }
        .bg-gray-50 {
            background-color: #F8F8F8; /* Latar belakang yang lebih terang */
        }
        .text-blue-600 {
            color: #196ECD !important;
        }
        .bg-blue-600 {
            background-color: #196ECD !important;
        }
        .hover\:bg-blue-700:hover {
            background-color: #0C3766 !important;
        }
    </style>
@endsection