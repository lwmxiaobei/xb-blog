<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    /**
     * @Author xiaobei <806641926@qq.com>
     * @param int $code
     * @param string $msg
     * @param array $data
     * @return mixed
     * @description 接口返回数据格式
     */
    protected function json($code = 200,$msg = '',$data = [])
    {
        if ($data == []) {
            $res = [
                'code'  =>$code,
                'msg'   =>$msg,
            ];
        }else{
            $res = [
                'code'  =>$code,
                'msg'   =>$msg,
                'data'  =>$data
            ];
        }
        return response()->json($res)->header('Content-Type', 'text/html; charset=UTF-8');
    }
}
