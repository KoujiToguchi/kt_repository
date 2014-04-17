/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../models/User.ts" />

'use strict';

module app.view_model {
    export class LoginViewModel {
        constructor(private $state:ng.ui.IStateService, private User:app.model.User) {
        }

        authentication(login:string, password:string): void {
            /* promiseのthen内のfunctionではthis(LoginViewModelインスタンス)が仕様できないため、ローカル変数thatに代入している */
            var that = this;
            var promise:ng.IPromise<boolean> = this.User.authentication(login, password);

            /* promiseにはUserモデルで行われたREST通信の状態が保持されている */
            /* then で評価(遅延評価)することで、REST通信の結果とreponseオブジェクトを取得している */
            promise.then(function(response) {/**応答*/
               that.$state.go('portal');
               /*that.$state.go('kisai');*/
            }, function(reason) {	     /*理由*/
                that.$state.go('login');
            }, function(update) {	　　 /*更新*/
                that.$state.go('login'); 
            });
        }

/****                                              ***/
/**** TEXTボタン押下時、nameをTEXTキーの下に表示   ***/
/**** TEXTボタンを”表示中”ボタンに表示変更       ***/
/**** ”表示中”ボタンを押下すると"非表示中"ボタンに表示変更*/
	msg(login:string,msg:string,btn,obj):string{
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
		
		/*obj.innerText = "表示中";*/
		/*obj.textContent = "TEXT表示中";*/

		/*msg = login;*/
		return msg;
	}

/****                                              ***/
/**** Enterキー押下時、次のTEXTBOXにフォーカス移動 ***/
/****                                              ***/
	next_text(i,next):void{
		/*Enterキー押下？*/
		if(event.keyCode == 13){
		    document.getElementById(next).focus();
		} 
	}

/****                                              ***/
/**** パスワードが８文字以下でEnterキー押下時、    ***/
/**** 次のTEXTBOXにフォーカス移動しない            ***/
/****                                              ***/

	next_text_loginps(i, next, moji, logps):string{
		var msg;
		/*Enterキー押下？*/
		if(event.keyCode == 13){

		   /* パスワード文字数は８文字？*/
		   if(logps.length == moji){
			/* フォーカスを移動する */
			document.getElementById(next).focus();
			msg = "";
		   }
		   else
		   {
			msg = "パスワードは８文字です。";
  	           }
		} 

	　　return msg;
	}


	carender(cren):void{
		/*alert(cren);*/
            var txt ="<table border='1'><tr><td colspan='7' bgcolor='#7fffd4'>sdcsdcdd</td></tr></table>"
	    document.getElementById(cren).innerHTML=txt
	}


     }

}

/*
 * Injector への登録
 * app モジュールに app.view_model.LoginViewModel という名前で ViewModel を登録している。
 * LoginController の初期化時に以下の処理が行われ、LoginControllerのインスタンスに本ViewModelのインスタンスがDIでバインドされる。
 *
 * $stateProviderに"portal"ステートを追加している。
 */
angular.module('app').factory("app.view_model.LoginViewModel", [ '$state', 'app.model.User',
    ($state:ng.ui.IStateService, User:app.model.User):app.view_model.LoginViewModel => {
        return new app.view_model.LoginViewModel($state, User)
    }
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $stateProvider
      .state("portal", { url: "/portal", templateUrl: 'views/portal.html'})
}]);
