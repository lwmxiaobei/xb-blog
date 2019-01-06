@extends('base.base')
@section('base')
    <!-- 内容区域 -->
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="page-header">
                <h3 class="page-title">
                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                        <i class="mdi mdi-wrench"></i>
                    </span>
                    文章
                </h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">文章管理</a></li>
                        <li class="breadcrumb-item active" aria-current="page">文章列表</li>
                    </ol>
                </nav>
            </div>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">文章列表</h4>
                            <p class="card-description">
                                <button type="button" class="btn btn-sm btn-gradient-success btn-icon-text" onclick="add()">
                                    <i class="mdi mdi-plus btn-icon-prepend"></i>
                                    发布文章
                                </button>
                            </p>
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>文章标题</th>
                                    <th>分类</th>
                                    <th>封面</th>
                                    <th width="20%">文章简介</th>
                                    <th>浏览量</th>
                                    <th>创建时间</th>
                                    <th>更新时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($list as $k=>$v)
                                    <tr>
                                        <td>{{ $v->title }}</td>
                                        <td>{{ $v->cate_id }}</td>
                                        <td>
                                            <div>
                                                <img src="{{ $v->cover }}" alt="" width="200" height="80">
                                            </div>
                                        </td>
                                        <td>{{ $v->desc }}</td>
                                        <td>{{ $v->click }}</td>
                                        <td>{{ $v->created_at }}</td>
                                        <td>{{ $v->updated_at }}</td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-gradient-dark btn-icon-text" onclick="update({{ $v->id }})">
                                                修改
                                                <i class="mdi mdi-file-check btn-icon-append"></i>
                                            </button>
                                            @if (!$v->top_at)
                                            <button type="button" class="btn btn-sm btn-gradient-primary btn-icon-text"
                                                    onclick="isTop({{ $v->id }} , 1)">
                                                置顶
                                                <i class="mdi mdi-file-check btn-icon-append"></i>
                                            </button>
                                            @else
                                            <button type="button" class="btn btn-sm btn-gradient-primary btn-icon-text"
                                                    onclick="isTop({{ $v->id }} , 0)">
                                                取消置顶
                                                <i class="mdi mdi-file-check btn-icon-append"></i>
                                            </button>
                                            @endif
                                            @if (!$v->is_show)
                                            <button type="button" class="btn btn-sm btn-gradient-danger
                                            btn-icon-text" onclick="publish({{ $v->id }},1)">
                                                <i class="mdi mdi-delete btn-icon-prepend"></i>
                                                发布
                                            </button>
                                            @else
                                                <button type="button" class="btn btn-sm btn-gradient-danger
                                            btn-icon-text" onclick="publish({{ $v->id }}, 0)">
                                                    <i class="mdi mdi-delete btn-icon-prepend"></i>
                                                    取消发布
                                                </button>
                                            @endif
                                            <button type="button" class="btn btn-sm btn-gradient-danger btn-icon-text" onclick="del({{ $v->id }})">
                                                <i class="mdi mdi-delete btn-icon-prepend"></i>
                                                删除
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            <div class="box-footer clearfix">
                                {{ $list->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function add(){
            var page = layer.open({
                type: 2,
                title: '发布文章',
                shadeClose: true,
                shade: 0.8,
                area: ['70%', '90%'],
                content: '/admin/article/add'
            });
        }
        function update(id){
            var page = layer.open({
                type: 2,
                title: '修改文章',
                shadeClose: true,
                shade: 0.8,
                area: ['70%', '90%'],
                content: '/admin/article/update/'+id
            });
        }
        function del(id){
            myConfirm("删除操作不可逆,是否继续?",function(){
                myRequest("/admin/article/del/"+id,"post",{},function(res){
                    layer.msg(res.msg)
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                },function(XMLHttpRequest, textStatus, errorThrown){
                    if (XMLHttpRequest.status == 422){
                        $.each(XMLHttpRequest.responseJSON.errors, function (field, errors) {
                            layer.msg(errors[0], function(){});
                        });
                    }
                });
            });
        }

        function isTop(id,status) {
            myRequest("/admin/article/top/"+id+ "/"+ status,"post",{},function(res){
                layer.msg(res.msg)
                setTimeout(function(){
                    window.location.reload();
                },1000)
            },function(XMLHttpRequest, textStatus, errorThrown){
                if (XMLHttpRequest.status == 422){
                    $.each(XMLHttpRequest.responseJSON.errors, function (field, errors) {
                        layer.msg(errors[0], function(){});
                    });
                }
            });
        }
        function publish(id,status) {
            myRequest("/admin/article/publish/"+id+ "/"+ status,"post",{},function(res){
                layer.msg(res.msg)
                setTimeout(function(){
                    window.location.reload();
                },1000)
            },function(XMLHttpRequest, textStatus, errorThrown){
                if (XMLHttpRequest.status == 422){
                    $.each(XMLHttpRequest.responseJSON.errors, function (field, errors) {
                        layer.msg(errors[0], function(){});
                    });
                }
            });
        }
    </script>
@endsection
