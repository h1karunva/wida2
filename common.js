// file : common.js

$(function()
{
  load();
  $(window).on("load resize", function() {load();});
  $(".questions > li:not(:first-child)").css({display: "none"});
  $(".questions li").addClass("opas");

  // 診断テストページで、部品を追加.
  var num_bar;
  var num_barNum = ["0%"];
  var q_list = $(".questions li");

  // プログレスバーを追加.
  if($(".questions").length)
  {
    $('body').prepend('<div class="progress-bar"><span></span></div>');
  }

  q_list.each(function(i)
  {
    q_list.eq(i).find(".select").addClass("s-" + i);
    num_barNum.push( 100 / (q_list.length-1) * (String(i+1)) + "%" );
    if( i != q_list.length-1 )
    {
      // 問題の数「Q,1、Q,2、Q,3、Q,4、Q,5....」を追加.
      q_list.eq(i).prepend('<p>Q,' + String(i+1) + '</p>');

      // 各問題に[Yes]、[No]ボタンを追加
      q_list.eq(i).append('<div class="select"><p>Yes</p><p>No</p></div>');

    }
    if( 0 != i )
    {
      q_list.eq(i).addClass("right");

      // 2問目以降の「←戻る」ボタンを追加.
      q_list.eq(i).append('<div class="back-list">&#x2B05; 戻る</div>');
    }
  });


  // 診断テストページで、「Yes」または「No」を押した時.
  var num = 0;
  $(".select p").on("click", function()
  {
    var btn = $(this);
    localStorage.setItem(num, $(".questions li:eq("+num+") .select p").index(this)+1);
    $(".progress-bar > span").css({width: num_barNum[num+1]});
    btn.addClass("click");

    setTimeout(function()
    {
      q_list.eq(num).addClass("left");
      setTimeout(function()
      {
        q_list.eq(num).hide();
        q_list.eq(num + 1).show();
        btn.removeClass("click");
        setTimeout(function()
        {
          q_list.eq(num + 1).removeClass("right");
          num++
        },40);
      },360);
    },260);
  });

  // 診断テストページで、「←戻る」を押した時.
  $(".back-list").on("click", function()
  {
    $(".progress-bar > span").css({width: num_barNum[num-1]});
    q_list.eq(num).addClass("right");
    setTimeout(function()
    {
      q_list.eq(num).hide();
      num = num-1;
      q_list.eq(num).show();
      setTimeout(function()
      {
        q_list.eq(num).removeClass("left");
      },40);
    },360);
  });

  // 診断テストページで、Yesの数をローカルストレージに追加.
  if($(".questions").length)
  {
    localStorage.setItem("q-length", $(".questions li").length-1);
  }

  const strTitle1 = "計算ミスをしていませんか？";
  const strText1 = "あなたは自身の基礎代謝を理解し、食事管理を行い、さらに継続もできています。もしあなたがダイエットに失敗しているのであれば、1日の摂取カロリー、もしくは自身の消費カロリーを見誤っている可能性が高いです。今一度自身の持つ数字を見直してみましょう。";

  const strTitle2 = "あなたにおすすめのアプリは「SmartDiet」";
  const strText2 = "基礎代謝を把握した上で食事管理ができているあなたは、後は継続するだけでダイエットは成功します。SmartDietは体重を記録して推移を見る事ができます。毎日体重を記録しましょう。モチベーションを上げ、継続する事に効果的です。";

  const strTitle3 = "あなたへのおすすめは「マクロ栄養計算機」";
  const strText3 = "食事管理の継続ができているあなたは、アプリの補助が必要無いかもしれません。しかし、1日の消費カロリーを知っていないと、効果的なダイエットにはつながりません。WEB版マクロ栄養計算機を利用して、自身の基礎代謝を測定しましょう。それに合わせて食事管理をすれば確実に体重は落ちていくでしょう。下記のURLをコピーしてマクロ栄養計算サイトを使用してみてください　https://promo.kadokawa.co.jp/macro-nutrient-calculator/";

  const strTitle4 = "なたにおすすめのアプリは「SmartDiet」";
  const strText4 = "あなたの食事に関する意識は完璧です。しかし、継続が苦手なあなたは、SmartDietを利用して毎日体重を記録してみましょう！非常に高いモチベーションUPが見込めます。これでダイエット成功間違い無しですね！";

  const strTitle5 = "あなたにおすすめのアプリは「SmartDiet」";
  const strText5 = "自分の食事をしっかり管理しているようですね、さらにそれをWEB版マクロ栄養計算機を利用して自身の基礎代謝を把握してみましょう。それに沿った食事をすることであなたの食事管理は完成します。そして継続が苦手なあなたは、SmartDietを利用して毎日体重を測り、記録してみましょう。非常に高いモチベーションUP効果が見込めます。アプリをDLして、マクロ栄養計算サイトを使用してみましょう→→https://promo.kadokawa.co.jp/macro-nutrient-calculator/";

  const strTitle6 = "あなたにおすすめのアプリは「カロミル」";
  const strText6 = "自身の基礎代謝を知っているようですね。後はそれに合わせた食事を継続するだけでダイエットは成功します。カロミルを利用して、自身の基礎代謝に対して摂取する1日の食事によるカロリーを把握しましょう。カロミルには体重をグラフ化し、推移を見る機能もあるので、継続へのモチベーションUPの効果も期待できます。毎日体重を測って記録しましょう。これでダイエット成功間違い無しですね！";

  const strTitle7 = "あなたにおすすめのアプリは「カロミル」";
  const strText7 = "継続ができているので、あとは自身の摂取カロリーと消費カロリーを理解するだけです。WEB版マクロ栄養計算機で自身の基礎代謝を測り、それに合わせてカロミルで食事による摂取カロリーを管理しましょう。これでダイエット成功間違い無しですね。アプリをDLした後、下記のURLをコピーしてマクロ栄養計算サイトを使用してみてください　https://promo.kadokawa.co.jp/macro-nutrient-calculator/";

  const strTitle8 = "あなたにおすすめのアプリは「カロミル」";
  const strText8 = "消費カロリーと摂取カロリーが把握、継続ができていないようですね、この3つはダイエットにおいて最も重要です。カロミルは1日の摂取カロリーを理解、管理できます。これに加えて自身の基礎代謝がわかるサイト　を利用し、それに合わせてカロリーを管理しましょう。カロミルには体重をグラフ化し、推移を見る機能もあるので、継続へのモチベーションUPの効果も期待できます。毎日体重を測って記録しましょう。これでダイエット成功間違い無しですね！下記のURLをコピーしてマクロ栄養計算サイトを使用してみてください　https://promo.kadokawa.co.jp/macro-nutrient-calculator/";

  // 診断結果ページで、Yesの数をローカルストレージから取り出して変数に格納.
  if($(".ansewer").length)
  {
    var Title;
    var Text;
    var yes = "";
    for( var i = 1 ; i <= localStorage.getItem("q-length") ; i++ )
    {
      yes += (localStorage.getItem(i-1) == 1) ? "Y" : "N";
    }

    // 診断テスト結果.
    switch(yes)
    {
      case 'YYY':
        Title = strTitle1;
        Text = strText1;
        break;
      case 'YYN':
        Title = strTitle2;
        Text = strText2;
        break;
      case 'YNY':
        Title = strTitle3;
        Text = strText3;
        break;
      case 'YNN':
        Title = strTitle4;
        Text = strText4;
        break;
      case 'NYY':
        Title = strTitle5;
        Text = strText5;
        break; 
      case 'NYN':
        Title = strTitle6;
        Text = strText6;
        break;
      case 'NNY':
        Title = strTitle7;
        Text = strText7;
        break;
      case 'NNN':
        Title = strTitle8;
        Text = strText8;
        break;
      default :
        Title = "条件不一致";
        Text = yes;
        break;
    }

    $(".ansewer__title").text(Title);
    $(".ansewer__txt").html(Text);

  }

});


function load()
{
  // 初回読み込み時と読み込み完了後、ウィンドウサイズの変更の時.
  var q_height = [];
  $(".questions li").each(function(i)
  {
    q_height.push(Number($(".questions li").eq(i).css('height').slice(0,-2)) + 54);
  });

  // 質問全体で一番高さの有るコンテンツに合わせて高さ調整.
  $(".questions").css({height: Math.max.apply(null,q_height)});
}

//
// // easing
// $(function(){jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin((e*a-r)*(2*Math.PI)/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=a*(.3*1.5)),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*(e*e*(((r*=1.525)+1)*e-r))+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?u*(7.5625*e*e)+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}})})
