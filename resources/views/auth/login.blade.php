<x-guest-layout>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        {{-- Tombol "Back to Home" --}}
        <div class="w-full sm:max-w-md mb-4 px-6 py-2">
            <a href="http://localhost:5173/home" class="text-white hover:text-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Back to Home
            </a>
        </div>
        {{-- Akhir Tombol "Back to Home" --}}

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg">
            <div class="flex justify-center mb-6">
                {{-- Logo Anda di sini, ganti dengan path yang sesuai, misal: asset('images/logo.png') --}}
                <img src="{{ asset('path/to/your/logo.png') }}" alt="Company Logo" class="h-16 w-auto">
            </div>

            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div>
                    <x-input-label for="email" :value="__('Email')" />
                    <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="password" :value="__('Password')" />
                    <x-text-input id="password" class="block mt-1 w-full"
                                    type="password"
                                    name="password"
                                    required autocomplete="current-password" />
                    <x-input-error :messages="$errors->get('password')" class="mt-2" />
                </div>

                <div class="block mt-4">
                    <label for="remember_me" class="inline-flex items-center">
                        <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                        <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    @if (Route::has('password.request'))
                        <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">
                            {{ __('Forgot your password?') }}
                        </a>
                    @endif

                    <x-primary-button class="ms-3">
                        {{ __('Log in') }}
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-guest-layout>

<style>
    /* Custom Styles for Login Page */
    .bg-gray-100 {
        background: linear-gradient(135deg, #196ECD 0%, #0C3766 100%); /* Warna gradien biru */
    }

    .shadow-lg {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Shadow yang lebih kuat dan modern */
    }

    .sm\:rounded-lg {
        border-radius: 12px; /* Border radius lebih besar */
    }

    .bg-white {
        background-color: #ffffff; /* Latar belakang form putih */
    }

    /* Modifikasi tombol primary Laravel Breeze */
    .ms-3.inline-flex.items-center.px-4.py-2.bg-gray-800 {
        background-color: #196ECD !important; /* Warna biru primary */
        border-color: #196ECD !important;
        transition: background-color 0.3s ease;
    }

    .ms-3.inline-flex.items-center.px-4.py-2.bg-gray-800:hover {
        background-color: #0C3766 !important; /* Warna biru lebih gelap saat hover */
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

    /* Jika Anda ingin logo berada di tengah */
    .flex.justify-center.mb-6 img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>