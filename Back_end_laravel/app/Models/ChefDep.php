<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChefDep extends Model
{
    use HasFactory;
    protected $table = 'chefdep';
    protected $fillable = ['userName', 'email', 'userID', 'dateNaiss','role','depID'];
}