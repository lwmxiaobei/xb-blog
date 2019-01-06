<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'avatar' => '',
                'password' => password_hash('admin', PASSWORD_DEFAULT),
                'account' => 'admin',
                'nickname' => 'admin',
                'clear_password'  => 'admin',
            ]
        ];

        DB::table('admin_user')->insert($users);
    }
}
