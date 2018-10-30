<?php

use Faker\Generator as Faker;

$factory->define(App\Folder::class, function (Faker $faker) {
    $parentFolder = $faker->boolean(60) ? DB::table('folders')->inRandomOrder()->first() : null;

    return [
        "name" => $faker->word,
        "parent_id" => $parentFolder ? $parentFolder->id : null,
        "folder_path" => $parentFolder ? $parentFolder->folder_path : "",
    ];
});
