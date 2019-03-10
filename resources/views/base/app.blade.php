<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="author" content="小北" />
    <meta name="description" content="{{ getConfig('description') }}" />
    <meta name="keywords" content="{{ getConfig('keywords') }}" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" id="page_favionc">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/home_app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    @yield('styles')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        @foreach(getArticlesClass() as $k=>$v)
                            @if(request()->route('id' ) == $v->id)
                            <li><a style="color: black" href="{{route('cates',array('id'=>$v->id))}}">{{$v->name}}</a></li>
                            @else
                                <li><a href="{{route('cates',array('id'=>$v->id))}}">{{$v->name}}</a></li>
                            @endif
                        @endforeach
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @guest
                            <li><a href="{{ route('login') }}">登陆</a></li>
                            <li><a href="{{ route('register') }}">注册</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            退出登陆
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <div class="main">
            @yield('content')
        </div>

        <footer class="footer">
            <div class="container text-center">
                <div class="content">
                    <div class="col-md-4 col-md-offset-4">
                        <div class="link">
                            <a href="{{ route('about') }}">关于我</a>
                            <a href="{{ route('link') }}">友情链接</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copy-right text-center">
                <span>© xiaobei lin 2017 <a href="{{config('app.url')}}">小北博客</a> All rights reserved. </span>
                <span>闽ICP备17031629号-1<span>
            </div>
        </footer>
        <div id="wrapper">
            <a href="javascript:void(0)" id="toTop" style="display: none;">
            </a>
        </div>

    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></a>
</body>
</html>
<script>
(function(){
var bp = document.createElement('script');
var curProtocol = window.location.protocol.split(':')[0];
if (curProtocol === 'https') {
bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
}
else {
bp.src = 'http://push.zhanzhang.baidu.com/push.js';
}
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(bp, s);
})();
</script>
<script>
    $(function(){
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>80){
                    $("#toTop").fadeIn(1000);
                }
                else
                {
                    $("#toTop").fadeOut(1000);
                }
                console.log($(window).scrollTop())
            });
            //当点击跳转链接后，回到页面顶部位置
            $("#toTop").click(function(){
                $('body,html').animate({scrollTop:0},1000);
                return false;
            });
        });
    });
</script>
