@extends('layouts.admin') {{-- INI YANG BENAR! --}}

@section('header')
    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        {{ __('Manage Content for ') }} {{ $page->name }}
    </h2>
@endsection

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-bold mb-4">{{ $page->name }} Sections</h3>

                    @if(session('success'))
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span class="block sm:inline">{{ session('success') }}</span>
                        </div>
                    @endif
                    @if(session('error'))
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span class="block sm:inline">{{ session('error') }}</span>
                        </div>
                    @endif

                    <a href="{{ route('admin.content.create', $page) }}" class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 active:bg-gray-900 dark:active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mb-4">
                        Add New Section
                    </a>

                    @if($sections->isEmpty())
                        <p class="text-gray-600 dark:text-gray-400">No sections found for this page. Add one above!</p>
                    @else
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Section Name
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Content Preview
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    @foreach($sections as $section)
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {{ $section->order }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {{ $section->section_name }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {{-- LOGIKA BARU UNTUK MENAMPILKAN GAMBAR PREVIEW --}}
                                                @php
                                                    $hasImage = false;
                                                    $imageUrl = '';
                                                    // Loop melalui konten untuk mencari URL gambar
                                                    if (isset($section->content) && is_array($section->content)) {
                                                        foreach ($section->content as $key => $value) {
                                                            // Asumsi URL gambar selalu string dan dimulai dengan http://.../storage/
                                                            if (is_string($value) && Str::startsWith($value, asset('storage/'))) {
                                                                $imageUrl = $value;
                                                                $hasImage = true;
                                                                break; // Ambil gambar pertama yang ditemukan
                                                            }
                                                        }
                                                    }
                                                @endphp

                                                @if($hasImage)
                                                    <img src="{{ $imageUrl }}" alt="Preview" class="w-16 h-16 object-cover rounded">
                                                @elseif(isset($section->content) && is_array($section->content) && isset($section->content['main_heading']))
                                                    {{ Str::limit($section->content['main_heading'], 50) }}
                                                @elseif(isset($section->content) && is_array($section->content) && isset($section->content['section_title']))
                                                    {{ Str::limit($section->content['section_title'], 50) }}
                                                @elseif(isset($section->content) && is_array($section->content) && isset($section->content['title']))
                                                    {{ Str::limit($section->content['title'], 50) }}
                                                @elseif(isset($section->content) && is_array($section->content) && isset($section->content['contact_title']))
                                                    {{ Str::limit($section->content['contact_title'], 50) }}
                                                @elseif(isset($section->content) && is_array($section->content) && isset($section->content['description']))
                                                    {{ Str::limit($section->content['description'], 50) }}
                                                @else
                                                    N/A
                                                @endif
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="{{ route('admin.content.edit', $section) }}" class="text-indigo-600 hover:text-indigo-900 mr-4 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</a>
                                                <form action="{{ route('admin.content.destroy', $section) }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this section?');">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection