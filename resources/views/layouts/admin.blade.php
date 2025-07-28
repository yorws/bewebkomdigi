<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Admin Panel') }}</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    {{-- Jika ada JS atau CSS spesifik admin, tambahkan di sini --}}
</head>
<body class="font-sans antialiased bg-gray-100 dark:bg-gray-900">
    <div class="min-h-screen flex">

        <aside x-data="{ openManageContent: {{ request()->routeIs('admin.content.*') ? 'true' : 'false' }} }"
               class="w-64 bg-gray-800 dark:bg-gray-900 shadow-md min-h-screen flex-shrink-0 z-20 transition-all duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between" id="sidebar">
            <div> {{-- Wrapper for top section of sidebar --}}
                <div class="p-4 flex items-center justify-center border-b border-gray-700">
                    <a href="{{ route('dashboard') }}" class="text-white text-2xl font-semibold">
                        Admin Panel
                    </a>
                </div>

                <nav class="mt-5">
                    <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')" class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-3 transition-colors duration-200">
                        {{ __('Dashboard') }}
                    </x-responsive-nav-link>

                    {{-- Link Manage Members --}}
                    <x-responsive-nav-link :href="route('admin.members.index')" :active="request()->routeIs('admin.members.*')" class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-3 mt-2 transition-colors duration-200">
                        {{ __('Manage Members') }}
                    </x-responsive-nav-link>

                    {{-- Manage Content Dropdown --}}
                    <div>
                        <button @click="openManageContent = !openManageContent"
                                class="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-3 mt-2 transition-colors duration-200"
                                :class="{'bg-gray-700 text-white': openManageContent || request()->routeIs('admin.content.*') }">
                            <span>{{ __('Manage Content') }}</span>
                            <svg :class="{'rotate-90': openManageContent}" class="w-4 h-4 ml-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <div x-show="openManageContent" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95" class="py-1 ml-6 text-gray-400">
                            @php
                                use App\Models\Page;
                                $allPages = Page::all()->keyBy('slug');
                                $desiredOrderSlugs = ['home', 'about-us', 'our-team', 'products', 'ecosystem', 'career', 'contact'];
                                $orderedPages = collect();
                                $processedSlugs = [];
                                foreach ($desiredOrderSlugs as $slug) {
                                    if ($allPages->has($slug)) {
                                        $orderedPages->push($allPages->get($slug));
                                        $processedSlugs[] = $slug;
                                    }
                                }
                                foreach ($allPages as $slug => $page) {
                                    if (!in_array($slug, $processedSlugs)) {
                                        $orderedPages->push($page);
                                    }
                                }
                            @endphp

                            @foreach($orderedPages as $page)
                                <x-responsive-nav-link :href="route('admin.content.show', $page)" :active="request()->routeIs('admin.content.show', $page)" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200">
                                    {{ $page->name }}
                                </x-responsive-nav-link>
                            @endforeach
                        </div>
                    </div> {{-- End Manage Content Dropdown --}}

                    {{-- You can add other admin links here --}}
                </nav>
            </div> {{-- End Wrapper for top section --}}

            {{-- "Back to Frontend" button at the bottom of the sidebar --}}
            <div class="p-4 border-t border-gray-700">
                <a href="{{ url('http://127.0.0.1:8000/home') }}" class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 0 011.414 1.414L5.414 9H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    Back to Frontend
                </a>
            </div>
        </aside>

        <div class="flex-1 flex flex-col">
            @include('layouts.navigation') {{-- Asumsi ini adalah navigasi atas admin Anda --}}

            <header class="bg-white dark:bg-gray-800 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    @yield('header') {{-- Ini akan menerima konten dari @section('header') di view anak --}}
                </div>
            </header>

            <main class="flex-1">
                @yield('content') {{-- Ini akan menerima konten dari @section('content') di view anak --}}
            </main>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            // Pastikan Anda memiliki tombol dengan ID 'menu-toggle' di layouts/navigation.blade.php
            const menuButton = document.getElementById('menu-toggle');

            if (menuButton) {
                menuButton.addEventListener('click', function() {
                    sidebar.classList.toggle('-translate-x-full');
                    sidebar.classList.toggle('translate-x-0');
                });
            }

            // Close sidebar on outside click for mobile
            document.addEventListener('click', function(event) {
                if (window.innerWidth < 768 && sidebar && !sidebar.contains(event.target) && menuButton && !menuButton.contains(event.target) && sidebar.classList.contains('translate-x-0')) {
                    sidebar.classList.add('-translate-x-full');
                    sidebar.classList.remove('translate-x-0');
                }
            });
        });
    </script>
</body>
</html>