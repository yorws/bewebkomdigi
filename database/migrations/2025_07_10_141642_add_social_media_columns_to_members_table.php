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
        Schema::table('members', function (Blueprint $table) {
            // Tambahkan kolom-kolom baru, pastikan nullable() karena opsional
            $table->string('instagram_url')->nullable()->after('email_url');
            $table->string('facebook_url')->nullable()->after('instagram_url');
            $table->string('github_url')->nullable()->after('facebook_url');
            $table->string('twitter_url')->nullable()->after('github_url'); // Atau 'x_url' jika ingin spesifik
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            // Hapus kolom-kolom ini jika migrasi di-rollback
            $table->dropColumn('instagram_url');
            $table->dropColumn('facebook_url');
            $table->dropColumn('github_url');
            $table->dropColumn('twitter_url'); // Atau 'x_url'
        });
    }
};