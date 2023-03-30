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
        Schema::create('gestionnaire', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('userID')->unique();
            $table->date('dateNaiss');
            $table->string('type');
            $table->integer('role');
            $table->string('domain')->nullable();
            
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