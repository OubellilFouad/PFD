<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ChefDep extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'chefdep';
    protected $fillable = ['userName', 'email', 'userID', 'dateNaiss','role','depID'];
}