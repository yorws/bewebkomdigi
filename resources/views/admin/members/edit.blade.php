<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Member: ') }} {{ $member->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h3 class="text-lg font-bold mb-4">Member Details</h3>

                    {{-- Menampilkan pesan error validasi jika ada --}}
                    @if ($errors->any())
                        <div class="mb-4">
                            <ul class="font-medium text-red-600">
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
                            <x-input-label for="name" :value="__('Name')" />
                            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name', $member->name)" required autofocus />
                            <x-input-error :messages="$errors->get('name')" class="mt-2" />
                        </div>

                        {{-- Input Posisi --}}
                        <div class="mb-4">
                            <x-input-label for="position" :value="__('Position')" />
                            <x-text-input id="position" class="block mt-1 w-full" type="text" name="position" :value="old('position', $member->position)" required />
                            <x-input-error :messages="$errors->get('position')" class="mt-2" />
                        </div>

                        {{-- Input Biografi / Deskripsi --}}
                        <div class="mb-4">
                            <x-input-label for="bio" :value="__('Biography / Description')" />
                            <textarea id="bio" name="bio" rows="4" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">{{ old('bio', $member->bio) }}</textarea>
                            <x-input-error :messages="$errors->get('bio')" class="mt-2" />
                        </div>

                        {{-- Input Foto Anggota --}}
                        <div class="mb-4">
                            <x-input-label for="photo" :value="__('Member Photo')" />
                            @if($member->photo_url)
                                <div class="mt-2">
                                    <p class="text-sm text-gray-600">Current Photo:</p>
                                    <img src="{{ asset($member->photo_url) }}" alt="Current Member Photo" class="w-32 h-32 object-cover rounded mt-1 mb-2">
                                    <label for="remove_photo" class="inline-flex items-center">
                                        <input type="checkbox" name="remove_photo" id="remove_photo" value="1" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500">
                                        <span class="ml-2 text-sm text-gray-600">Remove current photo</span>
                                    </label>
                                </div>
                            @endif
                            <input id="photo" type="file" name="photo" class="block mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                            <p class="text-sm text-gray-500 mt-1">Upload new photo (optional, max 2MB). If a new photo is uploaded, it will replace the current one.</p>
                            <x-input-error :messages="$errors->get('photo')" class="mt-2" />
                        </div>

                        {{-- Input URL LinkedIn --}}
                        <div class="mb-4">
                            <x-input-label for="linkedin_url" :value="__('LinkedIn Profile URL (Optional)')" />
                            <x-text-input id="linkedin_url" class="block mt-1 w-full" type="url" name="linkedin_url" :value="old('linkedin_url', $member->linkedin_url)" placeholder="e.g., https://linkedin.com/in/johndoe" />
                            <x-input-error :messages="$errors->get('linkedin_url')" class="mt-2" />
                        </div>

                        {{-- Input Alamat Email --}}
                        <div class="mb-4">
                            <x-input-label for="email_url" :value="__('Email Address (Optional)')" />
                            <x-text-input id="email_url" class="block mt-1 w-full" type="email" name="email_url" :value="old('email_url', $member->email_url)" placeholder="e.g., john.doe@example.com" />
                            <x-input-error :messages="$errors->get('email_url')" class="mt-2" />
                        </div>

                        {{-- NEW OPTIONAL SOCIAL MEDIA FIELDS --}}
                        {{-- Input URL Instagram --}}
                        <div class="mb-4">
                            <x-input-label for="instagram_url" :value="__('Instagram URL (Optional)')" />
                            <x-text-input id="instagram_url" class="block mt-1 w-full" type="url" name="instagram_url" :value="old('instagram_url', $member->instagram_url)" placeholder="e.g., https://instagram.com/username" />
                            <x-input-error :messages="$errors->get('instagram_url')" class="mt-2" />
                        </div>

                        {{-- Input URL Facebook --}}
                        <div class="mb-4">
                            <x-input-label for="facebook_url" :value="__('Facebook URL (Optional)')" />
                            <x-text-input id="facebook_url" class="block mt-1 w-full" type="url" name="facebook_url" :value="old('facebook_url', $member->facebook_url)" placeholder="e.g., https://facebook.com/username" />
                            <x-input-error :messages="$errors->get('facebook_url')" class="mt-2" />
                        </div>

                        {{-- Input URL GitHub --}}
                        <div class="mb-4">
                            <x-input-label for="github_url" :value="__('GitHub URL (Optional)')" />
                            <x-text-input id="github_url" class="block mt-1 w-full" type="url" name="github_url" :value="old('github_url', $member->github_url)" placeholder="e.g., https://github.com/username" />
                            <x-input-error :messages="$errors->get('github_url')" class="mt-2" />
                        </div>

                        {{-- Input URL Twitter (X) --}}
                        <div class="mb-4">
                            <x-input-label for="twitter_url" :value="__('Twitter (X) URL (Optional)')" />
                            <x-text-input id="twitter_url" class="block mt-1 w-full" type="url" name="twitter_url" :value="old('twitter_url', $member->twitter_url)" placeholder="e.g., https://twitter.com/username" />
                            <x-input-error :messages="$errors->get('twitter_url')" class="mt-2" />
                        </div>
                        {{-- END NEW OPTIONAL SOCIAL MEDIA FIELDS --}}

                        {{-- Input Urutan Tampilan --}}
                        <div class="mb-4">
                            <x-input-label for="order" :value="__('Display Order (Optional)')" />
                            <x-text-input id="order" class="block mt-1 w-full" type="number" name="order" :value="old('order', $member->order)" placeholder="e.g., 1, 2, 3" />
                            <x-input-error :messages="$errors->get('order')" class="mt-2" />
                        </div>

                        {{-- Tombol Submit --}}
                        <div class="flex items-center justify-end mt-4">
                            <x-primary-button>
                                {{ __('Update Member') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
