<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enseignant', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->integer('userID')->unique();
            $table->date('dateNaiss');
            $table->integer('depID');
            $table->string('grad');
            $table->integer('role');
            $table->string('cours')->nullable();
            $table->string('choix')->nullable();
            $table->string('disponibilité')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gestionnaire');
    }
};