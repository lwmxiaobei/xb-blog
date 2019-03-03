@extends('base.app')

@section('content')
    <div class="container list">
        <div class="col-md-8">
            @forelse ($articles as $item)
                <div class="item">
                    <a href="{{ route('article',array('id'=>$item->id))  }}" class="item-left">
                        <img src="{{ $item->cover }}">
                    </a>
                    <div class="item-right">
                        <h6 class="item-right-title">
                            <a href="{{ route('article',array('id'=>$item->id))  }}">{{$item->title}}</a>
                        </h6>
                        <div class="other">
                            @foreach ( explode(',',$item->tags) as $val)
                                <a href="javascript:;">
                                    <div class="label">
                                        <i class="fa fa-bookmark" aria-hidden="true"></i>&nbsp;&nbsp;
                                        {{$tags[$val]}}
                                    </div>
                                </a>
                            @endforeach
                            <div class="info">
                                <i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;小北&nbsp;&nbsp;
                                <i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{\Carbon\Carbon::parse($item->created_at)->diffForHumans()}}&nbsp;&nbsp;
                                <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;{{$item->click}}&nbsp;&nbsp;
                                <a class="more" href="{{ route('article',array('id'=>$item->id)) }}">
                                    More
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                <p>博主太懒了~~~</p>
            @endforelse

        </div>
        <div class="col-md-4 slide">
            <div class="widget rec-article" >
                <h4>推荐文章</h4>
                <div>
                    @forelse ($topList as $item)
                        <a href="{{ route('article',array('id'=>$item->id))  }}" class="rec-list">{{$item->title}}</a>
                        @endforeach
                </div>
            </div>
            <div class="widget rec-article" >
                <h4>最近文章</h4>
                <div>
                    @forelse ($recList as $item)
                        <a href="{{ route('article',array('id'=>$item->id))  }}" class="rec-list">{{$item->title}}</a>
                    @endforeach
                </div>
            </div>

        </div>
           </div>
    <div class="text-center">
        <div>
            {{ $articles->links() }}
        </div>
    </div>
@endsection

