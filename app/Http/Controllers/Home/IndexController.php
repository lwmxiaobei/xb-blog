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

        return view('home.index',['articles' => $results, 'tags' => $tags]);
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

		return view('home.article',['detail' => $detail]);
	}


    /**
     * 通过分类获取文章
     *
     * @return \Illuminate\Http\Response
     */
    public function cates(Request $request, $id)
    {
        list($results, $tags)  = Article::getArticlesByCatesId($id);
        return view('home.index',['articles' => $results, 'tags' => $tags]);
    }
}
