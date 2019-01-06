@extends('base.app')

@section('content')
    <div class="container list">
               <div class="row">
                   <div class="col-md-10 col-md-offset-1">
                       @forelse ($articles as $item)
                           <div class="item">
                               <a href="{{ route('article',array('id'=>$item->id))  }}" class="item-left">
                                   <img src="{{ $item->cover }}">
                               </a>
                               <div class="item-right">
                                   <h6 class="item-right-title">
                                       <a href="{{ route('article',array('id'=>$item->id))  }}">{{$item->title}}</a>
                                   </h6>
                                   <div class="description">
                                       <span class="">{{$item->desc}}</span>
                                   </div>
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
               </div>
           </div>
    <div class="text-center">
        <div>
            {{ $articles->links() }}
        </div>
    </div>
@endsection

