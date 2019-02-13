<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
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
                'name' => '超级管理员',
                'des' => '系统最高权限',
                'created_at' => date('Y-m-d'),
                'updated_at' => date('Y-m-d'),
            ]
        ];

        DB::table('admin_role')->insert($data);

        $data = [
            [
                'name' => 'PHP',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        DB::table('tags')->insert($data);
    }
}
