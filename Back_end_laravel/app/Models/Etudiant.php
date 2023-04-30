<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Etudiant extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'etudiant';
    protected $fillable = [ 'userName' , 'password' , 'userID' , 'email', 'dateNaiss','specialite','dep','section','groupe','pallier' ];
}