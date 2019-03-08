<?php

namespace App\Http\Controllers\Home;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        list($results, $tags) = Article::getArticles();
        // 最近文章
        $recList = DB::table('articles')->where('is_show',1)->orderBy('created_at','DESC')->limit(10)->get();
        // 置顶文章
        $topList = DB::table('articles')->where('is_show',1)->where('top_at','<>',null)->orderBy('top_at','DESC')
            ->limit
        (10)->get();
        return view('home.index', [
            'articles' => $results,
            'tags' => $tags,
            'recList' => $recList,
            'topList' => $topList,
        ]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function article(Request $request, $id)
    {
        $detail = Article::getDetail($id);
        //访问一次增加一次点击量
        DB::table('articles')->where('id',$id)->increment('click');
        // 最近文章
        $recList = DB::table('articles')->where('is_show',1)->orderBy('created_at','DESC')->limit(10)->get();
        // 置顶文章
        $topList = DB::table('articles')->where('is_show',1)->where('top_at','<>',null)->orderBy('top_at','DESC')
            ->limit
            (10)->get();
        return view('home.article', [
            'detail' => $detail,
            'recList' => $recList,
            'topList' => $topList,
            ]);
    }


    /**
     * 通过分类获取文章
     *
     * @return \Illuminate\Http\Response
     */
    public function cates(Request $request, $id)
    {
        list($results, $tags)  = Article::getArticlesByCatesId($id);
        // 最近文章
        $recList = DB::table('articles')->where('is_show',1)->orderBy('created_at','DESC')->limit(10)->get();
        // 置顶文章
        $topList = DB::table('articles')->where('is_show',1)->where('top_at','<>',null)->orderBy('top_at','DESC')
            ->limit
            (10)->get();
        return view('home.index', [
            'articles' => $results,
            'tags' => $tags,
            'recList' => $recList,
            'topList' => $topList,
        ]);
    }

    /**
     * 关于我
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function about()
    {
        return view('home.about');
    }
    /**
     * 友情链接
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function link()
    {
        return view('home.link');
    }

}
