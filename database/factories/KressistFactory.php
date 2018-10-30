<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Kressist::class, function (Faker $faker) use ($factory) {
    $user = $factory->raw(App\User::class);
    $is_turnover_tax = $faker->boolean();
    $krempler = DB::table('users')->where("role", "krempler")->inRandomOrder()->first();
//    $number = DB::table('users')->where("role", "kressist")->andWhere("krempler", $krempler)->max('number') + 1;
    return array_merge($user,
        [
            'tax_number' => !$is_turnover_tax ? "" : $faker->numerify("############"),
            'is_turnover_tax_subject' => $is_turnover_tax,
//            'number' => $number,
            'krempler_id' => $krempler->id,
            'role' => "customer"
        ]);
});
