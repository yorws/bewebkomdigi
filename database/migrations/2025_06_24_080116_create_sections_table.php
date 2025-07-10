<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            // Foreign key ke tabel 'pages'. Jika page dihapus, section ikut dihapus.
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->string('section_name'); // e.g., 'hero_section', 'about_team_section'
            $table->jsonb('content'); // Menggunakan JSONB untuk menyimpan konten dinamis
            $table->integer('order')->default(0); // Untuk menentukan urutan section di suatu halaman
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};