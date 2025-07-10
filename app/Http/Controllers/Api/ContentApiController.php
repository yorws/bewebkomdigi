<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Section;
use Illuminate\Http\Request;

class ContentApiController extends Controller
{
    /**
     * Get all pages with their sections.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPages()
    {
        $pages = Page::with('sections')->get(); // Mengambil semua halaman beserta sections
        return response()->json($pages);
    }

    /**
     * Get content for a specific page by its slug.
     *
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPageContentBySlug($slug)
    {
        $page = Page::where('slug', $slug)->with('sections')->first(); // Cari halaman berdasarkan slug

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json($page);
    }

    // Anda bisa menambahkan endpoint untuk mendapatkan section tertentu jika diperlukan
    // public function getSectionContent(Section $section)
    // {
    //     return response()->json($section);
    // }
}