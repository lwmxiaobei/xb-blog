<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_user', function (Blueprint $table) {
            $table->increments('id');
            $table->string('avatar', 100)->comment('头像');
            $table->string('nickname', 50)->comment('昵称');
            $table->string('account', 30)->comment('账号');
            $table->string('password', 500)->comment('密码');
            $table->string('clear_password', 20)->comment('原密码');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_user');
    }
}
