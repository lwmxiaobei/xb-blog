@extends('base.app')

@section('content')
    <div class="container list">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="blog_header">
                    <h4 class="title">{{$detail->title}}</h4>
                    @foreach ($detail->tagsList as $val)
                        <a href="javascript:;">
                            <div class="label">
                                <i class="fa fa-bookmark" aria-hidden="true"></i>&nbsp;&nbsp;
                                {{$val}}
                            </div>
                        </a>
                    @endforeach
                    <div class="info">
                        <i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;小北&nbsp;&nbsp;
                        <i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{\Carbon\Carbon::parse($detail->created_at)->diffForHumans()}}&nbsp;&nbsp;
                        <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;{{$detail->click}}&nbsp;&nbsp;
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="article-detail">
                    {!!$detail->content !!}
                </div>
            </div>
        </div>
    </div>
@endsection

