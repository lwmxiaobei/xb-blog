<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use DB;
class Article extends Model
{
    /**
     * 获取列表
     */
    public static function getList()
    {
        $list = DB::table('articles')->orderBy('top_at', 'DESC')->orderBy('updated_at','DESC')->paginate(10);

        return $list;
    }

    /**
     * 获取单篇文章
     */
    public static function getOne($id)
    {
        $info = DB::table('articles')->find($id);

        return $info;
    }

    /**
     * 前台文章列表
     */
    public static function getArticles()
    {
        $list = DB::table('articles')->where('is_show',1)->orderBy('top_at', 'DESC')->orderBy('created_at','DESC')
                ->paginate(10);
        $tags = "";
        foreach ($list as $item){
           $tags .= $item->tags.',';
        }

        $tagsId = array_unique(array_filter(explode(',', $tags)));
        //取得标签名称
        $tags = DB::table('tags')->wherein('id', $tagsId)->get();

        $tagsList = [];
        foreach ($tags as $k => $item){
            $tagsList[$item->id] = $item->name;
        }

        return [$list, $tagsList];
    }

    /**
     * 前端获取单篇文章
     */
    public static function getDetail($id)
    {
        $info = DB::table('articles')->find($id);
        $tagsId = explode(',', $info->tags);
        $info->tags = $tagsId;
        //取得标签名称
        $info->tagsList = self::getTags($tagsId);
        return $info;
    }

    /**
     * @param array $tagsId
     */
    public static function getTags($tagsId = []){
        //取得标签名称
        $tags = DB::table('tags')->wherein('id', $tagsId)->get();
        $tagsList = [];
        foreach ($tags as $k => $item){
            $tagsList[$item->id] = $item->name;
        }
        return $tagsList;
    }

    public function getCreatedAtAttribute($date)
    {
        if (Carbon::now() < Carbon::parse($date)->addDays(10)) {
            return Carbon::parse($date);
        }

        return Carbon::parse($date)->diffForHumans();
    }

    /**
     * 分类下的文章列表
     */
    public static function getArticlesByCatesId($cateId)
    {
        $list = DB::table('articles')->where('is_show',1)->where('cate_id',$cateId)->orderBy('top_at', 'DESC')->orderBy('created_at','DESC')
            ->paginate(10);
        $tags = "";
        foreach ($list as $item){
            $tags .= $item->tags.',';
        }

        $tagsId = array_unique(array_filter(explode(',', $tags)));
        //取得标签名称
        $tags = DB::table('tags')->wherein('id', $tagsId)->get();

        $tagsList = [];
        foreach ($tags as $k => $item){
            $tagsList[$item->id] = $item->name;
        }

        return [$list, $tagsList];
    }

}
