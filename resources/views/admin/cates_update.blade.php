@extends('base.base')
@section('base')
    <!-- 内容区域 -->
    <div class="main-panel">
        <div class="content-wrapper">
            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">请填写分类信息</h4>
                            <form class="forms-sample" id="form">
                                <div class="form-group">
                                    <label >* 分类名称</label>
                                    <input type="text"  class="form-control required"  value="{{ $detail->name }}"
                                           name="name" placeholder="分类名称">
                                </div>
                                <div class="form-group">
                                    <label >* 分类排序</label>
                                    <input type="text"  class="form-control required"  value="{{ $detail->sort }}"
                                           name="sort" placeholder="">
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
        function commit(){
            if(!checkForm()){
                return false;
            }
            var data = $("#form").serializeObject();
            var id = $('input[name=id]').val();
            myRequest("/admin/cates/update/"+id,"post",data,function(res){

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
