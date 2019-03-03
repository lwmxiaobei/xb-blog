@extends('base.app')

@section('content')
    <div class="container list" style="text-align: center;margin-top: 100px">
        <div>
            <h3>小北</h3>
            <h3>PHPER</h3>
            <h3>略懂GO</h3>
            <h3>欢迎骚扰</h3>
        </div>
              <div>
                  <p>微信: {{ getConfig('wechat') }}</p>
                  <p>Email: {{ getConfig('email') }}</p>
                  <p>GitHup: <a href="{{ getConfig('githup') }}">linxiaobei</a></p>
              </div>
    </div>
@endsection

