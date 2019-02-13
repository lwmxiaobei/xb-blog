<?php

use Illuminate\Database\Seeder;

class AdminConfigTableSeeder extends Seeder
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
                'name' => '网站描述',
                'config_key' => 'description',
                'config_value' => '小北博客, 一个基于laravel的个人技术博客,分享技术文章,与大家一起分享技术知识,欢迎大家收藏分享',
                'type' => 'string',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => '网站关键字',
                'config_key' => 'keywords',
                'config_value' => 'laravel博客,小北博客,laravel,laravel博客,PHP博客,小北,博客,个人技术博客',
                'type' => 'string',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];
        foreach ($data as $val){
            DB::table('admin_config')->insert($val);
        }

    }
}
