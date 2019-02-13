<?php

use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'admin_user_id' => '1',
                'role_id' => '1',
            ]
        ];

        DB::table('admin_user_role')->insert($data);
    }
}
