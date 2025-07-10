<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'section_name',
        'content',
        'order',
    ];

    protected $casts = [
        'content' => 'json', // Otomatis cast content ke JSON
    ];

    public function page() // Relasi Many-to-One: Banyak Sections milik satu Page
    {
        // Eksplisit mendefinisikan foreign key (page_id) dan local key (id)
        return $this->belongsTo(Page::class, 'page_id', 'id');
    }
}