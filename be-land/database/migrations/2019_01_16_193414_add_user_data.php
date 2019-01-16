<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            DB::table('users')->insert([
                "id"=> 1,
                "name"=>"admin",
                "email"=>"roman.moravcik1@gmail.com",
                "password"=>"$2y$10$9uLsRJED2eDUsi.NxIEHxucRkkJNICCZ7Omn62fA1KRM3C0S8Z.4e",
                "remember_token"=>"7en77xVuEReOFGdiJT9bIgOWTBravL1mJWehkhiF8eqpc4ON7osbAS3IiUNb"
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('users')->delete(1);
    }
}
