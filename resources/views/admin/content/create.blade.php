@extends('layouts.admin') {{-- INI YANG BENAR! --}}

@section('header')
    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        {{ __('Add New Section for ') }} {{ $page->name }}
    </h2>
@endsection

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-bold mb-4">Section Details</h3>

                    @if ($errors->any())
                        <div class="mb-4">
                            <ul class="font-medium text-red-600 dark:text-red-400">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('admin.content.store', $page) }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="mb-4">
                            <label for="section_name" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Section Name (e.g., hero_section, why_we_exist_section)</label>
                            <input id="section_name" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="text" name="section_name" value="{{ old('section_name') }}" required autofocus placeholder="e.g., hero_section" />
                            @error('section_name')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="order" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Order (Optional)</label>
                            <input id="order" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="number" name="order" value="{{ old('order') }}" placeholder="e.g., 1, 2, 3" />
                            @error('order')
                                <p class="text-sm text-red-600 dark:text-red-400 mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <h4 class="font-semibold text-lg mb-2 mt-6">Content Data</h4>
                        <div id="content-fields">
                            {{-- Initial content field --}}
                            <div class="content-field-item border border-gray-300 dark:border-gray-700 p-4 rounded-md mb-2">
                                <div class="mb-2">
                                    <label for="content_data[0][key]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Key (e.g., title, description, image_url)</label>
                                    <input name="content_data[0][key]" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="text" value="{{ old('content_data.0.key') }}" required placeholder="e.g., main_heading, illustration_url" />
                                </div>
                                <div class="mb-2">
                                    <label for="content_data[0][type]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Type</label>
                                    <select name="content_data[0][type]" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm content-type-select">
                                        <option value="text" {{ old('content_data.0.type') == 'text' ? 'selected' : '' }}>Text</option>
                                        <option value="image" {{ old('content_data.0.type') == 'image' ? 'selected' : '' }}>Image</option>
                                        <option value="longtext" {{ old('content_data.0.type') == 'longtext' ? 'selected' : '' }}>Long Text</option>
                                    </select>
                                </div>
                                <div class="mb-2 content-value-field">
                                    @if(old('content_data.0.type') == 'image')
                                        <label for="content_data_0_value_file" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Upload Image</label>
                                        <input type="file" name="content_data_0_value" id="content_data_0_value_file" class="block mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800" />
                                    @else
                                        <label for="content_data[0][value]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Value</label>
                                        <textarea name="content_data[0][value]" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">{{ old('content_data.0.value') }}</textarea>
                                    @endif
                                </div>
                                <button type="button" class="remove-content-field text-red-600 hover:text-red-800 mt-2 dark:text-red-400 dark:hover:text-red-600">Remove</button>
                            </div>
                        </div>
                        <button type="button" id="add-content-field" class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 mb-4 mt-4 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:bg-blue-600 dark:active:bg-blue-800">
                            Add More Content Field
                        </button>

                        <div class="flex items-center justify-end mt-4">
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-800">
                                {{ __('Create Section') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let fieldCounter = {{ old('content_data') ? count(old('content_data')) : 1 }};
            const contentFields = document.getElementById('content-fields');
            const addContentFieldButton = document.getElementById('add-content-field');

            addContentFieldButton.addEventListener('click', function() {
                const newItem = document.createElement('div');
                newItem.classList.add('content-field-item', 'border', 'border-gray-300', 'dark:border-gray-700', 'p-4', 'rounded-md', 'mb-2');
                newItem.innerHTML = `
                    <div class="mb-2">
                        <label for="content_data[${fieldCounter}][key]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Key (e.g., title, description, image_url)</label>
                        <input name="content_data[${fieldCounter}][key]" class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full" type="text" value="" required placeholder="e.g., main_heading, illustration_url" />
                    </div>
                    <div class="mb-2">
                        <label for="content_data[${fieldCounter}][type]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Type</label>
                        <select name="content_data[${fieldCounter}][type]" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm content-type-select">
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="longtext">Long Text</option>
                        </select>
                    </div>
                    <div class="mb-2 content-value-field">
                        <label for="content_data[${fieldCounter}][value]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Value</label>
                        <textarea name="content_data[${fieldCounter}][value]" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"></textarea>
                    </div>
                    <input type="hidden" name="content_data[${fieldCounter}][name]" value="content_data_${fieldCounter}_value">
                    <button type="button" class="remove-content-field text-red-600 hover:text-red-800 mt-2 dark:text-red-400 dark:hover:text-red-600">Remove</button>
                `;
                contentFields.appendChild(newItem);
                fieldCounter++;
                attachEventListeners(newItem);
            });

            function attachEventListeners(element) {
                element.querySelector('.remove-content-field').addEventListener('click', function() {
                    element.remove();
                });

                element.querySelector('.content-type-select').addEventListener('change', function() {
                    const valueField = element.querySelector('.content-value-field');
                    const keyInput = element.querySelector('input[name^="content_data"][name$="[key]"]');
                    const nameAttr = keyInput.getAttribute('name');
                    const currentIndexMatch = nameAttr.match(/\[(\d+)\]/);
                    const currentIndex = currentIndexMatch ? currentIndexMatch[1] : fieldCounter -1 ;

                    if (this.value === 'image') {
                        valueField.innerHTML = `
                            <label for="content_data_${currentIndex}_value_file" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Upload Image</label>
                            <input type="file" name="content_data_${currentIndex}_value" id="content_data_${currentIndex}_value_file" class="block mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800" />
                        `;
                    } else {
                        valueField.innerHTML = `
                            <label for="content_data[${currentIndex}][value]" class="block font-medium text-sm text-gray-700 dark:text-gray-300">Content Value</label>
                            <textarea name="content_data[${currentIndex}][value]" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">${old('content_data.' + currentIndex + '.value') || ''}</textarea>
                        `;
                    }
                });
            }

            // Attach event listeners to existing items (for old data on validation error)
            document.querySelectorAll('.content-field-item').forEach(attachEventListeners);
        });
    </script>
@endsection