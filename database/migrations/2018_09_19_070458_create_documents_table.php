<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
            $table->string("name");
            $table->string("extension");
            $table->string("path");
            $table->string("folder");
            $table->string("mime_type");
            $table->integer("size");
            $table->string("company");
            $table->string("tags")->nullable();
            $table->string("date_relevance")->nullable();
            $table->boolean("is_locker");
            $table->boolean("is_visible");
            $table->boolean("is_sos");
            $table->boolean("is_tax_relevant");
            $table->boolean("is_favorite");
            $table->boolean("is_encrypted");
            $table->boolean("is_machine_readable");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
