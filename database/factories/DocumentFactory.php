<?php

use Faker\Generator as Faker;

$factory->define(App\Document::class, function (Faker $faker) {
    $parentFolder = DB::table('folders')->inRandomOrder()->first();
    $customer = DB::table('users')->where("role", "customer")->inRandomOrder()->first();

    for ($i = 0; $i <= 10; $i++) {
        $authors[] = $faker->name;
        $authors[] = $faker->company;
    }

    $dateRelevance = $faker->numberBetween(2016, 2018);
    if ($faker->boolean) {
        $dateRelevance .= "-".str_pad($faker->numberBetween(1, 12), 2, "0", STR_PAD_LEFT);
        if ($faker->boolean) {
            $dateRelevance .= "-".str_pad($faker->numberBetween(1, 28), 2, "0", STR_PAD_LEFT);
        }
    }


    return [
        "name" => $faker->word,
        "folder_id" => $parentFolder->id,
        "customer_id" => $customer->id,
        "extension" => $faker->fileExtension,
        "path" => "public/dummy.pdf",
        "mime_type" => $faker->mimeType,
        "size" => $faker->numberBetween(500, 12500),
        "author" => $faker->randomElement($authors),
        "tags" => $faker->words($faker->numberBetween(0, 10)) ,
        "date_relevance" => $dateRelevance,
        "is_locker" => $faker->boolean(20),
        "is_sos" => $faker->boolean(20),
        "is_visible" => $faker->boolean(20),
        "is_favorite" => $faker->boolean(20),
        "is_tax_relevant" => $faker->boolean(20),
        "is_encrypted" => $faker->boolean(20),
        "is_machine_readable" => $faker->boolean(20),
    ];
});
