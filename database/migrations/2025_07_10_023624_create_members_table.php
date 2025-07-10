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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('photo_url')->nullable(); // URL foto anggota
            $table->text('bio')->nullable(); // Biografi singkat
            $table->string('linkedin_url')->nullable(); // Link LinkedIn
            $table->string('email_url')->nullable(); // Link email (contoh: mailto:email@example.com)
            $table->integer('order')->nullable(); // Urutan tampilan anggota
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};