<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagItemRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('item_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            //$table->timestamps(); // without timestamp

            $table->foreign('item_id')
                ->references('id')->on('items');
                //->onDelete('cascade'); Do not delete item when removing tag from item

            $table->foreign('tag_id')
                ->references('id')->on('tags');
                //->onDelete('cascade'); Do not delete tag when removing tag from item
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_tag');
    }
}
