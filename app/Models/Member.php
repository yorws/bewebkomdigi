<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'photo_url',
        'bio',
        'linkedin_url',
        'email_url',
        'instagram_url', // Tambahkan ini
        'facebook_url',  // Tambahkan ini
        'github_url',    // Tambahkan ini
        'twitter_url',   // Tambahkan ini
        'order',
    ];
}