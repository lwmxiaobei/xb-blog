<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>'rbac'], function () use($router) {
    //框架
    $router->get('/admin','Admin\IndexController@index');
    //控制台
    $router->get('/console','Admin\IndexController@console');
    //403无访问权限
    $router->get('/403','Admin\IndexController@noPermission');
    $router->group(['prefix' => 'admin'], function () use($router) {
        //菜单管理
        $router->get('/menu/list', 'Admin\AdministratorController@menuList');
        $router->any('/menu/add', 'Admin\AdministratorController@menuAdd');
        $router->any('/menu/update/{id}', 'Admin\AdministratorController@menuUpdate');
        $router->post('/menu/del/{id}', 'Admin\AdministratorController@menuDel');
        //角色管理
        $router->get('/role/list', 'Admin\AdministratorController@roleList');
        $router->any('/role/add', 'Admin\AdministratorController@roleAdd');
        $router->any('/role/update/{id}', 'Admin\AdministratorController@roleUpdate');
        $router->post('/role/del/{id}', 'Admin\AdministratorController@roleDel');
        //权限管理
        $router->get('/permission/list','Admin\AdministratorController@permissionList');
        $router->any('/permission/add','Admin\AdministratorController@permissionAdd');
        $router->any('/permission/update/{id}','Admin\AdministratorController@permissionUpdate');
        $router->post('/permission/del/{id}','Admin\AdministratorController@permissionDel');
        //管理员管理
        $router->get('/administrator/list','Admin\AdministratorController@administratorList');
        $router->any('/administrator/add','Admin\AdministratorController@administratorAdd');
        $router->any('/administrator/update/{id}','Admin\AdministratorController@administratorUpdate');
        $router->post('/administrator/del/{id}','Admin\AdministratorController@administratorDel');
        //配置管理
        $router->get('/config/list','Admin\ConfigController@configList');
        $router->any('/config/add','Admin\ConfigController@configAdd');
        $router->any('/config/update/{id}','Admin\ConfigController@configUpdate');
        $router->post('/config/del/{id}','Admin\ConfigController@configDel');
        //图片上传
        $router->post('/upload','Admin\IndexController@upload');
        $router->post('/wangeditor/upload','Admin\IndexController@wangeditorUpload');
        //文章管理
        $router->get('/article','Admin\ArticleController@index');
        $router->any('/article/add','Admin\ArticleController@add');
        $router->any('/article/update/{id}','Admin\ArticleController@update');
        $router->any('/article/del/{id}','Admin\ArticleController@del');
        $router->any('/article/top/{id}/{status}','Admin\ArticleController@top');
        $router->any('/article/publish/{id}/{status}','Admin\ArticleController@publish');
        //标签管理
        $router->get('/tags','Admin\TagsController@index');
        $router->any('/tags/add','Admin\TagsController@add');
        $router->any('/tags/update/{id}','Admin\TagsController@update');
        $router->any('/tags/del/{id}','Admin\TagsController@del');
        //分类管理
        $router->get('/cates','Admin\CatesController@index');
        $router->any('/cates/add','Admin\CatesController@add');
        $router->any('/cates/update/{id}','Admin\CatesController@update');
        $router->any('/cates/del/{id}','Admin\CatesController@del');
    });
    //修改个人信息
    $router->any('/edit/info/{id}','Admin\AdministratorController@editInfo');
    //退出登录
    $router->get('/admin/logout','Admin\AdministratorController@logout');

});

//前台
Route::group(['namespace' => 'Home'],function(){

    //首页
    Route::get('/', 'IndexController@index');
    Route::get('/article/{id}', 'IndexController@article')->name('article');
    Route::get('/cates/{id}', 'IndexController@cates')->name('cates');
    Route::get('/about', 'IndexController@about')->name('about');
    Route::get('/link', 'IndexController@link')->name('link');

});

$router->any('/admin/login','Admin\AdministratorController@login');
$router->get('/icon', function(){
    return view('admin.icon');
});



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
