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

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

//    $is_turnover_tax = $faker->boolean();
//    tax_number' => !$is_turnover_tax ? "" : $faker->numerify("############"),
//        'is_turnover_tax' => !$is_turnover_tax ? "" : $faker->numerify("############"),

    return [
        'last_name' => $faker->lastName,
        'first_name' => $faker->firstName,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'gender' => $faker->randomElement(["male", "female"]),
        'birthday' => $faker->dateTimeInInterval("-60 years", "-18 years"),
        'street' => $faker->streetAddress,
        'postal_code' => $faker->postcode,
        'city' => $faker->city,
        'phone' => $faker->phoneNumber,
        'contract_state' => "start",
        'contract_start' => $faker->dateTimeInInterval("-1 days", "+5 days"),
        'account_holder' => $faker->name,
        'account_iban' => $faker->iban("DE"),
        'account_bic' => $faker->swiftBicNumber,
    ];
});
