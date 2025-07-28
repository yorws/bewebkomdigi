<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Company Profile') }}</title> {{-- Judul untuk aplikasi frontend Anda --}}

    {{-- Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    {{-- Vite Scripts untuk aplikasi React Anda --}}
    @viteReactRefresh
    @vite(['resources/js/src/main.jsx', 'resources/css/app.css']) {{-- Pastikan ini adalah entry point utama React Anda --}}
</head>
<body class="font-sans antialiased bg-white text-gray-900"> {{-- Sesuaikan background dan text color untuk frontend --}}
    <div id="root"> {{-- Ini adalah div tempat aplikasi React Anda di-mount --}}
        {{-- Aplikasi React Anda akan dirender di sini --}}
    </div>
</body>
</html>