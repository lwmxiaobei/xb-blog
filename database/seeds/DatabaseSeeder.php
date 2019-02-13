<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(UsersTableSeeder::class);
         $this->call(AdminConfigTableSeeder::class);
         $this->call(ArticelTableSeeder::class);
         $this->call(CateTableSeeder::class);
         $this->call(MenusTableSeeder::class);
         $this->call(RoleMenuTableSeeder::class);
         $this->call(RolesTableSeeder::class);
         $this->call(UserRolesTableSeeder::class);
//         $this->call(TagsTableSeeder::class);
    }
}
