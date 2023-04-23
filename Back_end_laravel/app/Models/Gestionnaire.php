<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Gestionnaire extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'gestionnaire';
    protected $fillable = [
        'userName', 
        'email',
        'password',
        'userID', 
        'dateNaiss', 
        'type', 
        'role',
    ];
}