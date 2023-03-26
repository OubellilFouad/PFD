<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gestionnaire extends Model
{
    use HasFactory;

    protected $table = 'gestionnaire';
    protected $fillable = [
        'userName', 
        'email',
        'password',
        'userID', 
        'dateNaiss', 
        'type', 
        'role'
    ];
}