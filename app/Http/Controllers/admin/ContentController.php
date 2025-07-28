<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // Import Str facade

class ContentController extends Controller
{
    /**
     * Display a listing of the resource (all pages/content sections).
     * Ini adalah method yang dicari oleh rute admin.content.index.
     */
    public function index()
    {
        // Ambil semua halaman yang ingin Anda tampilkan di daftar "Manage Content"
        // Sesuaikan query ini jika Anda hanya ingin menampilkan beberapa jenis halaman
        $pages = Page::orderBy('name')->get(); // Mengambil semua halaman dari tabel 'pages'

        // Mengembalikan view Blade untuk menampilkan daftar halaman
        // Pastikan Anda memiliki file resources/views/admin/content/index.blade.php
        return view('admin.content.index', compact('pages'));
    }

    public function show(Page $page)
    {
        $sections = $page->sections()->orderBy('order')->get();
        return view('admin.content.show', compact('page', 'sections'));
    }

    public function create(Page $page)
    {
        return view('admin.content.create', compact('page'));
    }

    public function store(Request $request, Page $page)
    {
        $request->validate([
            'section_name' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'content_data.*.key' => 'required|string|max:255',
            'content_data.*.type' => 'required|in:text,image,longtext',
        ]);

        $content = [];
        foreach ($request->input('content_data') as $index => $item) {
            $key = $item['key'];
            $type = $item['type'];
            $value = $item['value'] ?? null;

            if ($type === 'image') {
                $fileKey = 'content_data_' . $index . '_value';
                if ($request->hasFile($fileKey)) {
                    $path = $request->file($fileKey)->store('uploads/sections', 'public');
                    $content[$key] = Storage::url($path);
                } else {
                    $content[$key] = null;
                }
            } else {
                $content[$key] = $value;
            }
        }

        $section = $page->sections()->create([
            'section_name' => $request->section_name,
            'order' => $request->order ?? $page->sections()->max('order') + 1,
            'content' => $content,
        ]);

        return redirect()->route('admin.content.show', $page)->with('success', 'Section created successfully.');
    }

    public function edit(Section $section)
    {
        $page = $section->page;
        return view('admin.content.edit', compact('section', 'page'));
    }

    public function update(Request $request, Section $section)
    {
        $request->validate([
            'section_name' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'content_data.*.key' => 'required|string|max:255',
            'content_data.*.type' => 'required|in:text,image,longtext',
        ]);

        $newContent = [];
        $oldContent = $section->content ?? [];

        foreach ($request->input('content_data') as $index => $item) {
            $key = $item['key'];
            $type = $item['type'];
            $value = $item['value'] ?? null;

            if ($type === 'image') {
                $fileKey = 'content_data_' . $index . '_value';

                if ($request->hasFile($fileKey)) {
                    if (isset($oldContent[$key]) && is_string($oldContent[$key])) {
                        $oldFilePath = str_replace(asset('storage/'), 'public/', $oldContent[$key]);
                        if (Storage::disk('public')->exists($oldFilePath)) {
                            Storage::disk('public')->delete($oldFilePath);
                        }
                    }
                    $path = $request->file($fileKey)->store('uploads/sections', 'public');
                    $newContent[$key] = Storage::url($path);
                } else {
                    $newContent[$key] = $oldContent[$key] ?? null;
                }
            } else {
                $newContent[$key] = $value;
            }
        }

        foreach ($oldContent as $key => $oldValue) {
            if (!array_key_exists($key, $newContent) && is_string($oldValue) && Str::startsWith($oldValue, asset('storage/'))) {
                $oldFilePath = str_replace(asset('storage/'), 'public/', $oldValue);
                if (Storage::disk('public')->exists($oldFilePath)) {
                    Storage::disk('public')->delete($oldFilePath);
                }
            }
        }

        $section->update([
            'section_name' => $request->section_name,
            'order' => $request->order,
            'content' => $newContent,
        ]);

        return redirect()->route('admin.content.show', $section->page)->with('success', 'Section updated successfully.');
    }


    public function destroy(Section $section)
    {
        $page = $section->page;

        if ($section->content) {
            foreach ($section->content as $key => $value) {
                if (is_string($value) && Str::startsWith($value, asset('storage/'))) {
                    $filePath = str_replace(asset('storage/'), 'public/', $value);
                    if (Storage::disk('public')->exists($filePath)) {
                        Storage::disk('public')->delete($filePath);
                    }
                }
            }
        }

        $section->delete();
        return redirect()->route('admin.content.show', $page)->with('success', 'Section deleted successfully.');
    }
}