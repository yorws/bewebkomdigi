<?php

//test 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // Import Str facade

class ContentController extends Controller
{
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
            // 'content_data.*.value' is not required here for file types, so we don't validate existence
        ]);

        $content = [];
        foreach ($request->input('content_data') as $index => $item) {
            $key = $item['key'];
            $type = $item['type'];
            // KOREKSI: Gunakan null coalescing operator untuk mengakses 'value' dengan aman
            $value = $item['value'] ?? null; 

            if ($type === 'image') {
                $fileKey = 'content_data_' . $index . '_value';
                if ($request->hasFile($fileKey)) {
                    $path = $request->file($fileKey)->store('uploads/sections', 'public');
                    $content[$key] = Storage::url($path);
                } else {
                    // Jika tidak ada file baru diupload saat store (misal field di create form tapi tidak diisi)
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
            // Tidak perlu validasi 'value' secara langsung di sini karena bisa null/file
        ]);

        $newContent = [];
        $oldContent = $section->content ?? []; // Ambil konten lama dari database

        // Proses data konten yang dikirim dari form
        foreach ($request->input('content_data') as $index => $item) {
            $key = $item['key'];
            $type = $item['type'];
            // KOREKSI: Gunakan null coalescing operator untuk mengakses 'value' dengan aman
            $value = $item['value'] ?? null; 

            if ($type === 'image') {
                $fileKey = 'content_data_' . $index . '_value';

                // Jika ada file baru diupload
                if ($request->hasFile($fileKey)) {
                    // Hapus gambar lama jika ada
                    if (isset($oldContent[$key]) && is_string($oldContent[$key])) {
                        $oldFilePath = str_replace(asset('storage/'), 'public/', $oldContent[$key]); // Use asset() for correct replacement
                        if (Storage::disk('public')->exists($oldFilePath)) {
                            Storage::disk('public')->delete($oldFilePath);
                        }
                    }
                    $path = $request->file($fileKey)->store('uploads/sections', 'public');
                    $newContent[$key] = Storage::url($path);
                } else {
                    // Jika tidak ada file baru diupload, pertahankan gambar lama jika ada
                    // Ini penting jika user tidak mengupload ulang gambar tapi tidak menghapusnya
                    $newContent[$key] = $oldContent[$key] ?? null;
                }
            } else {
                // Untuk tipe teks atau longtext, langsung gunakan nilai dari form
                $newContent[$key] = $value;
            }
        }

        // Hapus file gambar yang tidak lagi ada di newContent tapi ada di oldContent (jika field dihapus dari form)
        foreach ($oldContent as $key => $oldValue) {
            // Jika key ada di oldContent tapi tidak ada di newContent DAN itu adalah URL gambar
            if (!array_key_exists($key, $newContent) && is_string($oldValue) && Str::startsWith($oldValue, asset('storage/'))) {
                 $oldFilePath = str_replace(asset('storage/'), 'public/', $oldValue); // Use asset() for correct replacement
                 if (Storage::disk('public')->exists($oldFilePath)) {
                     Storage::disk('public')->delete($oldFilePath);
                 }
            }
        }

        $section->update([
            'section_name' => $request->section_name,
            'order' => $request->order,
            'content' => $newContent, // PENTING: Ganti seluruh konten, bukan merge
        ]);

        return redirect()->route('admin.content.show', $section->page)->with('success', 'Section updated successfully.');
    }


    public function destroy(Section $section)
    {
        $page = $section->page;

        // Hapus file gambar terkait jika ada
        if ($section->content) {
            foreach ($section->content as $key => $value) {
                if (is_string($value) && Str::startsWith($value, asset('storage/'))) { // Use asset() for correct check
                    $filePath = str_replace(asset('storage/'), 'public/', $value); // Use asset() for correct replacement
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