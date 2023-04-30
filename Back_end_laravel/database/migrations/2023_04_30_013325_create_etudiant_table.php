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
        Schema::create('etudiant', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('email');
            $table->string('userID');
            $table->date('dateNaiss');
            $table->integer('dep');
            $table->integer('role');
            $table->integer('specialite');
            $table->integer('section');
            $table->integer('group');
            $table->integer('pallier');
            $table->integer('password');

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
        Schema::dropIfExists('etudiant');
    }
};