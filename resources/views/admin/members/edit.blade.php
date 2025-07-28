@extends('layouts.admin') {{-- INI YANG BENAR! --}}

@section('header')
    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        {{ __('Edit Member: ') }} {{ $member->name }}
    </h2>
@endsection

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-bold mb-4">Member Details</h3>

                    {{-- Menampilkan pesan error validasi jika ada --}}
                    @if ($errors->any())
                        <div class="mb-4">
                            <ul class="font-medium text-red-600 dark:text-red-400">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    {{-- Form untuk memperbarui anggota --}}
                    <form action="{{ route('admin.members.update', $member) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT') {{-- Menggunakan metode PUT untuk update --}}

                        {{-- Input Nama --}}
                        <div class="mb-4">
                            <label for="name" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Name</label>
                            <input id="name" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="text" name="name" value="{{ old('name', $member->name) }}" required autofocus />
                            @error('name')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input Posisi --}}
                        <div class="mb-4">
                            <label for="position" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Position</label>
                            <input id="position" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="text" name="position" value="{{ old('position', $member->position) }}" required />
                            @error('position')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input Biografi / Deskripsi --}}
                        <div class="mb-4">
                            <label for="bio" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Biography / Description</label>
                            <textarea id="bio" name="bio" rows="4" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">{{ old('bio', $member->bio) }}</textarea>
                            @error('bio')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input Foto Anggota --}}
                        <div class="mb-4">
                            <label for="photo" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Member Photo</label>
                            @if($member->photo_url)
                                <div class="mt-2">
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Current Photo:</p>
                                    <img src="{{ asset($member->photo_url) }}" alt="Current Member Photo" class="w-32 h-32 object-cover rounded mt-1 mb-2">
                                    <label for="remove_photo" class="inline-flex items-center">
                                        <input type="checkbox" name="remove_photo" id="remove_photo" value="1" class="rounded border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600">
                                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remove current photo</span>
                                    </label>
                                </div>
                            @endif
                            <input id="photo" type="file" name="photo" class="block mt-1 w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"/>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload new photo (optional, max 2MB). If a new photo is uploaded, it will replace the current one.</p>
                            @error('photo')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input URL LinkedIn --}}
                        <div class="mb-4">
                            <label for="linkedin_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">LinkedIn Profile URL (Optional)</label>
                            <input id="linkedin_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="url" name="linkedin_url" value="{{ old('linkedin_url', $member->linkedin_url) }}" placeholder="e.g., https://linkedin.com/in/johndoe" />
                            @error('linkedin_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input Alamat Email --}}
                        <div class="mb-4">
                            <label for="email_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Email Address (Optional)</label>
                            <input id="email_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="email" name="email_url" value="{{ old('email_url', $member->email_url) }}" placeholder="e.g., john.doe@example.com" />
                            @error('email_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }} }}</p>
                            @enderror
                        </div>

                        {{-- NEW OPTIONAL SOCIAL MEDIA FIELDS --}}
                        {{-- Input URL Instagram --}}
                        <div class="mb-4">
                            <label for="instagram_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Instagram URL (Optional)</label>
                            <input id="instagram_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="url" name="instagram_url" value="{{ old('instagram_url', $member->instagram_url) }}" placeholder="e.g., https://instagram.com/username" />
                            @error('instagram_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input URL Facebook --}}
                        <div class="mb-4">
                            <label for="facebook_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Facebook URL (Optional)</label>
                            <input id="facebook_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="url" name="facebook_url" value="{{ old('facebook_url', $member->facebook_url) }}" placeholder="e.g., https://facebook.com/username" />
                            @error('facebook_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input URL GitHub --}}
                        <div class="mb-4">
                            <label for="github_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">GitHub URL (Optional)</label>
                            <input id="github_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="url" name="github_url" value="{{ old('github_url', $member->github_url) }}" placeholder="e.g., https://github.com/username" />
                            @error('github_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Input URL Twitter (X) --}}
                        <div class="mb-4">
                            <label for="twitter_url" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Twitter (X) URL (Optional)</label>
                            <input id="twitter_url" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="url" name="twitter_url" value="{{ old('twitter_url', $member->twitter_url) }}" placeholder="e.g., https://twitter.com/username" />
                            @error('twitter_url')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>
                        {{-- END NEW OPTIONAL SOCIAL MEDIA FIELDS --}}

                        {{-- Input Urutan Tampilan --}}
                        <div class="mb-4">
                            <label for="order" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Display Order (Optional)</label>
                            <input id="order" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="number" name="order" value="{{ old('order', $member->order) }}" placeholder="e.g., 1, 2, 3" />
                            @error('order')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Tombol Submit --}}
                        <div class="flex items-center justify-end mt-4">
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 active:bg-gray-900 dark:active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                {{ __('Update Member') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection