<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
            $table->string("service_name");
            $table->string("provider_name");
            $table->date("contract_start");
            $table->string("customer_number");
            $table->string("contract_number");
            $table->text("additional_numbers");
            $table->text("annotations");
            $table->date("cancellation_date");
            $table->unsignedInteger("automatic_extension_period")->nullable();
            $table->unsignedInteger("cancellation_period")->nullable();
            $table->unsignedInteger('contract_document')->nullable();
            $table->foreign('contract_document')->references('id')->on('documents')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('services');
    }
}
