<?php

use Illuminate\Database\Seeder;

class RootUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = factory(App\Admin::class)->make();
        $admin->email = "admin@test.com";
        $admin->role = "admin";
        $admin->password = bcrypt("dummy");
        $admin->save();

        $krempler = factory(App\Krempler::class)->make();
        $krempler ->email = "krempler@test.com";
        $krempler->role = "krempler";
        $krempler->password = bcrypt("dummy");
        $krempler->save();

        $kressist = factory(App\Kressist::class)->make();
        $kressist ->email = "kressist@test.com";
        $kressist->role = "kressist";
        $kressist->password = bcrypt("dummy");
        $kressist->save();

        $customer = factory(App\Customer::class)->make();
        $customer ->email = "customer@test.com";
        $customer->role = "customer";
        $customer->password = bcrypt("dummy");
        $customer->save();

    }
}
