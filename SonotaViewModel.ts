/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../models/User.ts" />

'use strict';

module app.view_model {
    export class SonotaViewModel {
        constructor(private $state:ng.ui.IStateService, private User:app.model.User) {
        }

        forms = [
  	  {"name":"hoge","score":33},
	  {"name":"fuga","score":44},
	  {"name":"piyo","score":55}
        ];

        authentication(login:string, password:string): void {
            /* promiseのthen内のfunctionではthis(SonotaViewModelインスタンス)が仕様できないため、ローカル変数thatに代入している */
            var that = this;
            var promise:ng.IPromise<boolean> = this.User.authentication(login, password);

            /* promiseにはUserモデルで行われたREST通信の状態が保持されている */
            /* then で評価(遅延評価)することで、REST通信の結果とreponseオブジェクトを取得している */
            promise.then(function(response) {/**応答*/
               that.$state.go('portal');
            }, function(reason) {	     /*理由*/
                that.$state.go('Sonota');
            }, function(update) {	　　 /*更新*/
                that.$state.go('Sonota'); 
            });
        }

/****                                              ***/
/**** TEXTボタン押下時、nameをTEXTキーの下に表示   ***/
/**** TEXTボタンを”表示中”ボタンに表示変更       ***/
/**** ”表示中”ボタンを押下すると"非表示中"ボタンに表示変更*/
	msg(login:string,msg:string,btn,obj):void{
		/*alert(login);*/
		var txtbtn = document.getElementById(btn);

		/*”TEXT”ボタンを”表示中”ボタンに変更*/
		if(txtbtn.textContent != "表示中"){
		   txtbtn.textContent = "表示中";
		   msg = login;
		} else {
		   txtbtn.textContent = "非表示中";
		   msg = "";
		}
		alert(msg);
		/*txtbtn.value=msg;*/
		/*obj.innerText = "表示中";*/
		/*obj.textContent = "TEXT表示中";*/

		/*msg = login;*/
		/*return msg;*/
	}

/****                                              ***/
/**** Enterキー押下時、次のTEXTBOXにフォーカス移動 ***/
/****                                              ***/
	next_text(i:SonotaViewModel,next):void{
		/*alert(i);*/
		console.log(i);

		if(event.keyCode == 13){/*Enterキー押下？*/
		    document.getElementById(next).focus();
		    /* i.Window.FocusEvent();*/
		    /*alert(FocusEvent.FOCUS_OUT);*/
		} 
	}

/****                                              ***/
/**** パスワードが８文字以下でEnterキー押下時、    ***/
/**** 次のTEXTBOXにフォーカス移動しない            ***/
/****                                              ***/

	next_text_loginps(i, next, moji, logps):string{
		var msg = "";
		/*Enterキー押下？*/

						/*画面内のオブジェクト取得*/
　	    	var doc = document.getElementById('text02');
		/*var obj_menu = angular.element(doc);/**/

		if(event.keyCode == 13){

		   /* パスワード文字数は８文字？*/
		   if(logps.length == moji){
			/* フォーカスを移動する */
			document.getElementById(next).focus();
			msg = "";
		   }
		   else
		   {
			msg="パスワードは８文字です。";
			doc.textContent="パスワードは８文字です。";
			/*doc.value="";*/
  	           }
		} 

		/*alert(msg);*/
		/*document.getElementById(next).textContent=msg;*/

	　　return msg;
	}

/****                                              ***/
/**** カレンダー表示                               ***/
/****                                              ***/

	carender(cren):void{
	    var i;
	    var winEnt;
				/* 子window(ポップアップ画面)を呼び出す*/
	    winEnt=window.open("http://localhost:9001/#/carender","","width=200,height=250,scrollbars=1");

	    /*while (winEnt.document.readyState != "complete"){*/
	    /*   for(i=0;i>200000;i++)*/
	    /*}*/
						/*子ウィンドウの状態を確認*/
	   /* winEnt.focus(); */




	}
/****                                              ***/
/****       日付け表示                             ***/
/****                                              ***/

     	hizuke(myMonth,myDat):string{
	   var hi;
	   hi = "指定日付:"+myMonth+"月"+myDat+"日";
	   /*alert(hi);*/

	   return hi;
    	}

/****                                              ***/
/****  親ウィンドウが存在しない場合                ***/
/****  子ウィンドウ(自分)をcloseする(未使用)       ***/
/****                                              ***/

     	oya_window_chk():void{
						/*親ウィンドウが存在しない */
	   if(!window.opener || window.opener.closed){
　　　　	window.close();                 /*子ウィンドウ(自分)をclose */
　　	   } 

	}

     }
}

/*
 * Injector への登録
 * app モジュールに app.view_model.SonotaViewModel という名前で ViewModel を登録している。
 * LoginController の初期化時に以下の処理が行われ、SonotaControllerのインスタンスに本ViewModelのインスタンスがDIでバインドされる。
 *
 * $stateProviderに"portal"ステートを追加している。
 */
angular.module('app').factory("app.view_model.SonotaViewModel", [ '$state', 'app.model.User',
    ($state:ng.ui.IStateService, User:app.model.User):app.view_model.SonotaViewModel => {
        return new app.view_model.SonotaViewModel($state, User)
    }
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $stateProvider
      .state("sonota", { url: "/sonota", templateUrl: 'views/sonota.html'})
}]);
