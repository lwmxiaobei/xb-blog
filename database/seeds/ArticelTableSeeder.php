<?php

use Illuminate\Database\Seeder;

class ArticelTableSeeder extends Seeder
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
                'cate_id' => 1,
                'title' => 'hello,world!欢迎来到小北博客',
                'content' => 'hello,world!欢迎来到小北博客',
                'md_content' => 'hello,world!欢迎来到小北博客',
                'tags' => '1',
                'keywords' => 'laravel,小北博客',
                'desc' => 'hello,world!欢迎来到小北博客',
                'cover' => '/uploads/articles/20181208/5c0bc1c96e7d9.png',
                'click' => '0',
                'is_show' => '1',
                'top_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        DB::table('articles')->insert($data);
    }
}
