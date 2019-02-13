<?php

use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
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
                'pid' => '0',
                'name' => '文章管理',
                'url' => '/',
                'icon' => 'mdi mdi-book-open-variant',
                'sort' => '0',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'pid' => '1',
                'name' => '文章列表',
                'url' => '/admin/article',
                'icon' => '',
                'sort' => '1',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'pid' => '1',
                'name' => '标签管理',
                'url' => '/admin/tags',
                'icon' => '',
                'sort' => '3',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'pid' => '1',
                'name' => '分类管理',
                'url' => '/admin/cates',
                'icon' => '',
                'sort' => '2',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        foreach ($data as $val){
            DB::table('admin_menu')->insert($val);
        }
    }
}
