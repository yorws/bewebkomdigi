<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'title',
        'description',
    ];

    public function sections() // Relasi One-to-Many: Satu Page punya banyak Sections
    {
        return $this->hasMany(Section::class)->orderBy('order');
    }
}