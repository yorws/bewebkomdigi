<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member; // Import model Member
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Untuk mengelola file
use Illuminate\Support\Str; // Tambahan, meskipun saat ini tidak digunakan, disertakan karena ada di kode asli

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     * Menampilkan daftar semua anggota.
     */
    public function index()
    {
        // Mengambil semua anggota dan mengurutkannya berdasarkan kolom 'order'
        $members = Member::orderBy('order')->get();
        // Mengirim data anggota ke view 'admin.members.index'
        return view('admin.members.index', compact('members'));
    }

    /**
     * Show the form for creating a new resource.
     * Menampilkan formulir untuk membuat anggota baru.
     */
    public function create()
    {
        // Mengirim ke view 'admin.members.create' yang berisi formulir penambahan anggota
        return view('admin.members.create');
    }

    /**
     * Store a newly created resource in storage.
     * Menyimpan anggota baru ke database.
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk dari request
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi file gambar
            'bio' => 'nullable|string',
            'linkedin_url' => 'nullable|url|max:255',
            'email_url' => 'nullable|email:rfc,dns|max:255', // Validasi email, nullable
            'instagram_url' => 'nullable|url|max:255', // Tambahan dari kode pertama
            'facebook_url' => 'nullable|url|max:255',  // Tambahan dari kode pertama
            'github_url' => 'nullable|url|max:255',    // Tambahan dari kode pertama
            'twitter_url' => 'nullable|url|max:255',    // Tambahan dari kode pertama
            'order' => 'nullable|integer',
        ]);

        $photoUrl = null;
        // Memeriksa apakah ada file 'photo' yang diupload
        if ($request->hasFile('photo')) {
            // Menyimpan file foto ke direktori 'uploads/members' di disk 'public'
            $path = $request->file('photo')->store('uploads/members', 'public');
            // Mendapatkan URL publik untuk foto yang disimpan
            $photoUrl = Storage::url($path);
        }

        // Membuat record anggota baru di database
        Member::create([
            'name' => $request->name,
            'position' => $request->position,
            'photo_url' => $photoUrl, // Menyimpan URL foto
            'bio' => $request->bio,
            'linkedin_url' => $request->linkedin_url,
            'email_url' => $request->email_url,
            'instagram_url' => $request->instagram_url, // Tambahan
            'facebook_url' => $request->facebook_url,  // Tambahan
            'github_url' => $request->github_url,    // Tambahan
            'twitter_url' => $request->twitter_url,    // Tambahan
            // Menentukan 'order': jika tidak ada di request, gunakan order tertinggi + 1
            'order' => $request->order ?? (Member::max('order') + 1),
        ]);

        // Redirect kembali ke halaman indeks anggota dengan pesan sukses
        return redirect()->route('admin.members.index')->with('success', 'Member created successfully.');
    }

    /**
     * Display the specified resource.
     * Menampilkan detail anggota tertentu.
     */
    public function show(Member $member)
    {
        return view('admin.members.show', compact('member'));
    }

    /**
     * Show the form for editing the specified resource.
     * Menampilkan formulir untuk mengedit anggota tertentu.
     */
    public function edit(Member $member)
    {
        // Mengirim data anggota yang akan diedit ke view 'admin.members.edit'
        return view('admin.members.edit', compact('member'));
    }

    /**
     * Update the specified resource in storage.
     * Memperbarui anggota tertentu di database.
     */
    public function update(Request $request, Member $member)
    {
        // Validasi data yang masuk dari request
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi file gambar
            'bio' => 'nullable|string',
            'linkedin_url' => 'nullable|url|max:255',
            'email_url' => 'nullable|email:rfc,dns|max:255', // Validasi email, nullable
            'instagram_url' => 'nullable|url|max:255', // Tambahan
            'facebook_url' => 'nullable|url|max:255',  // Tambahan
            'github_url' => 'nullable|url|max:255',    // Tambahan
            'twitter_url' => 'nullable|url|max:255',    // Tambahan
            'order' => 'nullable|integer',
        ]);

        // Pertahankan URL foto lama secara default
        $photoUrl = $member->photo_url;

        // Jika ada foto baru diupload
        if ($request->hasFile('photo')) {
            // Hapus foto lama dari penyimpanan jika ada
            if ($member->photo_url) {
                // Mengonversi URL publik menjadi path relatif untuk penghapusan
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo_url));
            }
            // Menyimpan foto baru
            $path = $request->file('photo')->store('uploads/members', 'public');
            $photoUrl = Storage::url($path);
        } elseif ($request->boolean('remove_photo')) { // Cek jika checkbox 'remove_photo' dicentang di form
            // Hapus foto lama jika ada
            if ($member->photo_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo_url));
            }
            $photoUrl = null; // Setel URL foto menjadi null
        }

        // Memperbarui record anggota di database
        $member->update([
            'name' => $request->name,
            'position' => $request->position,
            'photo_url' => $photoUrl, // Perbarui URL foto
            'bio' => $request->bio,
            'linkedin_url' => $request->linkedin_url,
            'email_url' => $request->email_url,
            'instagram_url' => $request->instagram_url, // Tambahan
            'facebook_url' => $request->facebook_url,  // Tambahan
            'github_url' => $request->github_url,    // Tambahan
            'twitter_url' => $request->twitter_url,    // Tambahan
            'order' => $request->order,
        ]);

        // Redirect kembali ke halaman indeks anggota dengan pesan sukses
        return redirect()->route('admin.members.index')->with('success', 'Member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     * Menghapus anggota tertentu dari database.
     */
    public function destroy(Member $member)
    {
        // Hapus foto anggota dari penyimpanan jika ada
        if ($member->photo_url) {
            // Mengonversi URL publik menjadi path relatif untuk penghapusan
            Storage::disk('public')->delete(str_replace('/storage/', '', $member->photo_url));
        }

        // Hapus record anggota dari database
        $member->delete();
        // Redirect kembali ke halaman indeks anggota dengan pesan sukses
        return redirect()->route('admin.members.index')->with('success', 'Member deleted successfully.');
    }
}