@extends('base.app')

@section('content')
    <div class="container list" style="text-align: center;margin-top: 100px">
        <div>
            <h3>如果想交换链接, 请联系我</h3>
        </div>
              <div>
                  <p>微信: {{ getConfig('wechat') }}</p>
                  <p>Email: {{ getConfig('email') }}</p>
              </div>
    </div>
@endsection

