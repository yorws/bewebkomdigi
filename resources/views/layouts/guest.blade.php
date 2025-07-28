<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Authentication') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            /* Custom Styles for Login/Auth Pages (Dipindahkan ke sini) */
            .bg-gray-100 {
                background: linear-gradient(135deg, #196ECD 0%, #0C3766 100%);
            }
            .shadow-lg {
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }
            .sm\:rounded-lg {
                border-radius: 12px;
            }
            .bg-white {
                background-color: #ffffff;
            }
            /* Modifikasi tombol primary Laravel Breeze */
            .ms-3.inline-flex.items-center.px-4.py-2.bg-gray-800,
            .ms-4.inline-flex.items-center.px-4.py-2.bg-gray-800 {
                background-color: #196ECD !important;
                border-color: #196ECD !important;
                transition: background-color 0.3s ease;
            }
            .ms-3.inline-flex.items-center.px-4.py-2.bg-gray-800:hover,
            .ms-4.inline-flex.items-center.px-4.py-2.bg-gray-800:hover {
                background-color: #0C3766 !important;
            }
            /* Mengubah warna teks link forgot password */
            .underline.text-sm.text-gray-600 {
                color: #196ECD !important;
            }
            .underline.text-sm.text-gray-600:hover {
                color: #0C3766 !important;
            }
            /* Jika Anda ingin mengubah warna input label */
            .text-gray-700 {
                color: #333 !important;
            }
            /* Agar logo berada di tengah */
            .guest-logo-container {
                display: flex;
                justify-content: center;
                margin-bottom: 1.5rem;
            }
            .guest-logo-container img {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
        </style>
    </head>
    <body class="font-sans antialiased text-gray-900 dark:text-gray-100">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            {{-- Tombol "Back to Home" --}}
            <div class="w-full sm:max-w-md mb-4 px-6 py-2">
                <a href="{{ url('/') }}" class="text-white hover:text-gray-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    Back to Home
                </a>
            </div>
            {{-- Akhir Tombol "Back to Home" --}}

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg">
                {{-- Logo Aplikasi (menggantikan <x-application-logo>) --}}
                <div class="guest-logo-container">
                    <a href="/">
                        {{-- GANTI DENGAN PATH LOGO ASLI ANDA --}}
                        <img src="{{ asset('images/logo.png') }}" alt="{{ config('app.name', 'Company Logo') }}" class="w-20 h-20">
                    </a>
                </div>

                {{ $slot }} {{-- Ini adalah tempat konten form login/register/dll akan dirender --}}
            </div>
        </div>
    </body>
</html>