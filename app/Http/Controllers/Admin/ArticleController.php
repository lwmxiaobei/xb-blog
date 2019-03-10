<?php
/**
 * Created by PhpStorm.
 * Author: xiaobei <806641926@qq.com>
 * Date: 18-10-26下午1:23
 * Desc: 管理员
 */
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPost;
use Illuminate\Http\Request;
use Chenhua\MarkdownEditor\Facades\MarkdownEditor;
use DB;
use App\Models\Article;
use Validator;
class ArticleController extends Controller
{
    /**
     * @Desc: 文章列表
     * @Author: xiaobei <806641926@qq.com>
     * @return \Illuminate\View\View
     */
    public function index()
    {
        //获取文章
        $list = Article::getList();
        //获取所有标签
        return view('admin.article',['list'=>$list]);
    }

    /**
     * @Desc: 发布文章
     * @Author: xiaobei <806641926@qq.com>
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function add(Request $request)
    {
        if($request->isMethod('post')){
            $this->_validate($request);
            $data = $request->post();
            $data['tags'] = implode(',', $data['tags']);
            $data['created_at'] = date("Y-m-d H:i:s");
            $data['updated_at'] = date("Y-m-d H:i:s");
            $data['md_content'] = $data['content'];
            $data['content'] = MarkdownEditor::parse($data['content']);
            $id = DB::table('articles')->insertGetId($data);
            if(!$id){
                return $this->json(500,'添加失败');
            }
            return $this->json(200,'添加成功');
        }else{
            $tagsList = DB::table('tags')->get();
            $catesList = DB::table('cates')->get();
            return view('admin.article_add',['tagsList' => $tagsList, 'catesList' => $catesList]);
        }
    }

    /**
     * @Desc: 修改菜单
     * @Author: xiaobei <806641926@qq.com>
     * @param Request $request
     * @param $id
     * @return \Illuminate\View\View
     */
    public function update(Request $request,$id)
    {
        if($request->isMethod('post')){
            $this->_validate($request);
            $data = $request->post();
            $data['tags'] = implode(',', $data['tags']);
            unset($data['id']);
            $data["updated_at"] = date("Y-m-d H:i:s");
            $data['md_content'] = $data['content'];
            $data['content'] = MarkdownEditor::parse($data['content']);
            $res = DB::table('articles')->where('id',$id)->update($data);
            if(!$res){
                return $this->json(500,'修改失败');
            }
            return $this->json(200,'修改成功');
        }else{
            $detail = Article::getOne($id);
            $detail->tags = explode(',', $detail->tags);
            $tagsList = DB::table('tags')->get();
            $catesList = DB::table('cates')->get();
            return view('admin.article_update',['detail'=>$detail, 'catesList' => $catesList, 'tagsList' =>
                $tagsList]);
        }
    }

    /**
     * @Desc: 删除菜单
     * @Author: xiaobei <806641926@qq.com>
     * @param $id
     * @return mixed
     */
    public function del($id)
    {
        $res = DB::table('articles')->delete($id);
        if(!$res){
            return $this->json(500,'删除失败');
        }

        return $this->json(200,'删除成功');
    }

    /**
     * @Desc: 置顶
     * @Author: xiaobei <806641926@qq.com>
     * @param $id
     * @param $status
     * @return mixed
     */
    public function top($id,$status)
    {
        if ($status == 1){
            $data = ['top_at' => date('Y-m-d H:i:s')];
        }else{
            $data = ['top_at' => null];
        }
        $res = DB::table('articles')->where('id',$id)->update($data);
        if(!$res){
            return $this->json(500,'操作失败');
        }

        return $this->json(200,'操作成功');
    }

    /**
     * @Desc: 发布
     * @Author: xiaobei <806641926@qq.com>
     * @param $id
     * @param $status
     * @return mixed
     */
    public function publish($id,$status)
    {
        if ($status == 1){
            $data = ['is_show' => 1];
        }else{
            $data = ['is_show' => 0];
        }
        $res = DB::table('articles')->where('id',$id)->update($data);
        if(!$res){
            return $this->json(500,'操作失败');
        }

        return $this->json(200,'操作成功');
    }

    /**
     *验证
     */
    private function _validate($request)
    {
        $this->validate($request, [
            'title' => 'bail|required|between:1,50',
            'content' => 'required|string',
            'cate_id' => 'required|min:1',
            'desc' => 'required|string|between:1,100',
            'tags.*' => 'numeric|exists:tags,id',
            'keywords' => 'required|string|between:1,50',
        ], [
            'title.required' => '标题字段不能为空',
            'title.between' => '标题长度必须介于1-50之间',
            'content.required' => '文章内容不能为空',
            'cate_id.required' => '分类不能为空',
            'cate_id.min' => '分类ID错误',
            'desc.required' => '描述不能为空',
            'desc.between' => '标题长度必须介于1-100之间',
            'keywords.required' => '关键字不能为空',
            'keywords.between' => '关键字长度必须介于1-50之间',
        ]);
    }
}
