<?php

use Illuminate\Database\Seeder;

class RoleMenuTableSeeder extends Seeder
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
                'role_id' => '1',
                'menu_id' => '1',
            ],
            [
                'role_id' => '1',
                'menu_id' => '2',
            ],
            [
                'role_id' => '1',
                'menu_id' => '3',
            ],
            [
                'role_id' => '1',
                'menu_id' => '4',
            ]
        ];

        foreach ($data as $val){
            DB::table('admin_role_menu')->insert($val);
        }
    }
}
