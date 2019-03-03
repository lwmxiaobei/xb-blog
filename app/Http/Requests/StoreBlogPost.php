<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'bail|required|between:1,50',
            'content' => 'required|string',
            'cate_id' => 'required|min:1',
            'desc' => 'required|string|between:1,100',
            'tags' => 'required|min:1',
            'keywords' => 'required|string|between:1,50',
        ];
    }

    /**
     * 获取被定义验证规则的错误消息
     *
     * @return array
     * @translator laravelacademy.org
     */
    public function messages(){
        return [
            'title.required' => '标题字段不能为空',
            'title.between' => '标题长度必须介于1-50之间',
            'content.required' => '文章内容不能为空',
            'cate_id.required' => '分类不能为空',
            'cate_id.min' => '分类ID错误',
            'desc.required' => '描述不能为空',
            'desc.between' => '标题长度必须介于1-100之间',
            'tags.required' => '标签不能为空',
            'tags.min' => '标签ID错误',
            'keywords.required' => '关键字不能为空',
            'keywords.between' => '关键字长度必须介于1-50之间',
        ];
    }
}
