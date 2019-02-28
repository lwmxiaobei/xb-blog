@extends('base.base')
@section('base')
    <!-- 内容区域 -->
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">请填写文章信息</h4>
                            {{--<p class="card-description">--}}
                            {{--Basic form elements--}}
                            {{--</p>--}}
                            <form class="forms-sample" id="form">
                                <div class="form-group">
                                    <label >* 文章标题</label>
                                    <input type="text"  class="form-control required" name="title"
                                           value="{{ $detail->title }}"
                                           placeholder="文章标题">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword4">* 分类</label>
                                    <select class="form-control required" id="cate_id" name="cate_id">
                                        <option value="1">PHP</option>
                                        <option value="2">Mysql</option>
                                        <option value="3">GO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label >* 描述</label>
                                    <textarea type="text"  class="form-control required" name="desc"
                                              placeholder="描述">{{ $detail->desc }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label >* 标签</label>
                                     <div>
                                         @foreach($tagsList as $k=>$v)
                                             <label style="margin-left: 15px;">
                                                 <input type="checkbox" @if (in_array($v->id,$detail->tags)) checked  @endif
                                                 name="tags[]" value="{{$v->id}}" />
                                                 {{$v->name }}
                                             </label>
                                         @endforeach
                                     </div>

                                </div>
                                <div class="form-group" id="string">
                                    <label >* 关键字</label>
                                    <input type="text" name="keyword" value="{{ $detail->keywords }}"
                                           class="form-control value-input required"
                                           placeholder="关键字">
                                </div>
                                <div class="form-group " id="text">
                                    <label >* 内容</label>
                                    <textarea  placeholder="请在此处编辑内容" class="required" name="content" id="editor"
                                               style="height:400px;
                                    max-height:400px;overflow: hidden">{{ $detail->content }}</textarea >
                                </div>
                                <div class="form-group" id="image">
                                    <label>* 封面图</label>
                                    <input type="file" class="file-upload-default img-file" data-path="articles">
                                    <input type="hidden" class="image-path value-input" value="{{ $detail->cover }}"  name="cover">
                                    <div class="input-group col-xs-12">
                                        <input type="text" class="form-control file-upload-info required" value="{{ $detail->cover }}" disabled="">
                                        <span class="input-group-append">
                                            <button class="file-upload-browse btn btn-gradient-primary" onclick="upload($(this))" type="button">上传</button>
                                        </span>
                                    </div>
                                    <div class="img-yl" style="display: block">
                                        <img src="{{ $detail->cover }}">
                                    </div>
                                </div>
                                <button type="button" onclick="commit()" class="btn btn-sm btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-file-check btn-icon-prepend"></i>
                                    提交
                                </button>
                                <button type="button" onclick="cancel()" class="btn btn-sm btn-gradient-warning btn-icon-text">
                                    <i class="mdi mdi-reload btn-icon-prepend"></i>
                                    取消
                                </button>
                                <input type="hidden" name="id" value="{{ $detail->id }}">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var editor = new wangEditor('editor');
        // 上传图片（举例）
        editor.config.uploadImgUrl = "/admin/wangeditor/upload";
        // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
        editor.config.hideLinkImg = false;
        editor.create();
        function commit(){
            if(!checkForm()){
                return false;
            }
            var data = $("#form").serialize();
            console.log(data);
            var id = $('input[name=id]').val();
            myRequest("/admin/article/update/"+id,"post",data,function(res){

                layer.msg(res.msg)
                setTimeout(function(){
                    parent.location.reload();
                },1000)
            },function(XMLHttpRequest, textStatus, errorThrown){
                if (XMLHttpRequest.status == 422){
                    $.each(XMLHttpRequest.responseJSON.errors, function (field, errors) {
                        layer.msg(errors[0], function(){});
                    });
                }
            });
        }
        function cancel() {
            parent.location.reload();
        }
    </script>
@endsection
