<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Validator;
/**
 * Created by PhpStorm.
 * Author: xiaobei <806641926@qq.com>
 * Date: 18-10-26下午1:23
 * Desc: 标签管理
 */
class TagsController extends Controller
{
    /**
     * @name: 列表
     * @Author: xiaobei <806641926@qq.com>
     * @return \Illuminate\View\View
     */
    public function index()
    {
        //获取文章
        $list = DB::table('tags')->orderBy('updated_at','DESC')->paginate(10);
//        var_dump($list);
        return view('admin.tags',['list'=>$list]);
    }

    /**
     * @name: 新增标签
     * @Author: xiaobei <806641926@qq.com>
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function add(Request $request)
    {
        if($request->isMethod('post')){
            $this->_validate($request);
            $data = $request->post();
            $data['created_at'] = date("Y-m-d H:i:s");
            $data['updated_at'] = date("Y-m-d H:i:s");
            $id = DB::table('tags')->insertGetId($data);
            if(!$id){
                return $this->json(500,'添加失败');
            }
            return $this->json(200,'添加成功');
        }else{
            return view('admin.tags_add',[]);
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
            unset($data['id']);
            $data["updated_at"] = date("Y-m-d H:i:s");
            $res = DB::table('tags')->where('id',$id)->update($data);
            if(!$res){
                return $this->json(500,'修改失败');
            }
            return $this->json(200,'修改成功');
        }else{
            $detail = DB::table('tags')->find($id);
            return view('admin.tags_update',['detail'=>$detail]);
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
        $res = DB::table('tags')->delete($id);
        if(!$res){
            return $this->json(500,'删除失败');
        }

        return $this->json(200,'删除成功');
    }

    /**
     *
     */
    private function _validate($request)
    {
        $this->validate($request, [
            'name' => 'bail|required|between:1,10',
        ], [
            'name.required' => '标签名称不能为空',
            'name.between' => '标签名称长度必须介于1-10之间',
        ]);
    }

}
