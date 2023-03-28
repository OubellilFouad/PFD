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
        Schema::create('chefdep', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('email')->unique();
            $table->string('password')->unique();
            $table->string('userID')->unique();
            $table->date('dateNaiss');
            $table->string('role');
            $table->string('depID');
        
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
        Schema::dropIfExists('chefdep');
    }
};