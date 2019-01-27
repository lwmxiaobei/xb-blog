<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('articles')) {
            Schema::create('articles', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('cate_id')->unsigned()->comment('分类ID');
                $table->integer('user_id')->unsigned()->comment('作者ID');
                $table->string('title', 50)->comment('文章标题');
                $table->text('content')->comment('内容');
                $table->text('md_content')->comment('markdown内容');
                $table->string('tags',10)->nullable()->comment('标签');
                $table->string('keywords',50)->nullable()->comment('关键字');
                $table->string('desc',100)->nullable()->comment('描述');
                $table->string('cover', 100)->comment('封面图');
                $table->integer('click')->unsigned()->comment('浏览量');
                $table->tinyInteger('is_show')->unsigned()->comment('是否显示')->default(0);
                $table->dateTime('top_at');
                $table->dateTime('deleted_at');
                $table->dateTime('created_at');
                $table->dateTime('updated_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
