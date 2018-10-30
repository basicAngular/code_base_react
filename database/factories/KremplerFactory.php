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

$factory->define(App\Krempler::class, function (Faker $faker) use ($factory) {
    static $password;
    $user = $factory->raw(App\User::class);
    $is_turnover_tax = $faker->boolean();
    $number = DB::table('users')->where("role", "krempler")->max('number') + 1;
    return array_merge($user,
        [
            'tax_number' => !$is_turnover_tax ? "" : $faker->numerify("############"),
            'is_turnover_tax_subject' => $is_turnover_tax,
            'number' => $number,
            'role' => "krempler"
        ]);
});
