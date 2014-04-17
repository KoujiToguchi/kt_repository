/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../models/User.ts" />

'use strict';

module app.view_model {
    export class CarenderViewModel {
        constructor(private $state:ng.ui.IStateService, private User:app.model.User) {
        }
        authentication(login:string, password:string): void {
            /* promiseのthen内のfunctionではthis(CarenderViewModelインスタンス)が仕様できないため、ローカル変数thatに代入している */
            var that = this;
            var promise:ng.IPromise<boolean> = this.User.authentication(login, password);

            /* promiseにはUserモデルで行われたREST通信の状態が保持されている */
            /* then で評価(遅延評価)することで、REST通信の結果とreponseオブジェクトを取得している */
            promise.then(function(response) {/**応答*/
               that.$state.go('portal');
            }, function(reason) {	     /*理由*/
                that.$state.go('Carender');
            }, function(update) {	　　 /*更新*/
                that.$state.go('Carender'); 
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
		
		/*obj.innerText = "表示中";*/
		/*obj.textContent = "TEXT表示中";*/

		/*msg = login;*/
		/*return msg;*/
	}

/****                                              ***/
/**** Enterキー押下時、次のTEXTBOXにフォーカス移動 ***/
/****                                              ***/
	next_text(i:CarenderViewModel,next):void{
		alert("asasasas");
		console.log(i);

		if(event.keyCode == 13){/*Enterキー押下？*/
		    document.getElementById(next).focus();
		    /* i.Window.FocusEvent();*/
		    /*alert(FocusEvent.FOCUS_OUT);*/
		    /*i.FocusEvent.FOCUS_OUT;*/
		} 
	}

/****                                              ***/
/**** パスワードが８文字以下でEnterキー押下時、    ***/
/**** 次のTEXTBOXにフォーカス移動しない            ***/
/****                                              ***/

	next_text_loginps(i, next, moji, logps):void{
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
			msg = "パスワードは８文字です。"
  	           }
		} 

	　　/*return msg;*/
	}

/****                                              ***/
/**** カレンダー表示                               ***/
/****                                              ***/

	carender(cren):void{

	    /* 初期設定 */
	    var i,j;
	    var myDate = new Date(); /*現在の日付（年月日時刻曜日）を取得*/
	    var myWeekTbl= new Array("日","月","火","水","木","金","土");
	    var myMonthTbl= new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	    var myYear = myDate.getFullYear();
	    if (((myYear%4)==0 && (myYear%100)!=0) || (myYear%400)==0){ 
						/* うるう年だったら... */
		myMonthTbl[1] = 29; /* 　２月を２９日とする */
	    } 
	    var myMonth = myDate.getMonth();      /* 月を取得(0月～11月) */
	    var myToday = myDate.getDate();          /* 今日の'日'を退避 */
	    myDate.setDate(1); 		/* 日付を'１日'に変えて、 */
	    var myWeek = myDate.getDay();        /* 　'１日'の曜日を取得 */
	    var myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7); 							/* カレンダーの行数（端数切上げ）*/
	    var myTable = new Array(7*myTblLine); /* 表のセル数分定義 */
	    
	    for(i=0; i<7*myTblLine; i++) myTable[i]="　"; /*myTableを掃除する*/
	    for(i=0; i<myMonthTbl[myMonth]; i++)myTable[i+myWeek]=i+1;
							/*日付を埋め込む */

	    /*カレンダー表示*/

            var txt ="";         /* カレンダーBufer */
	    txt +="<table border='1'>";
	    txt +="<tr><td colspan='7' bgcolor='#7fffd4' align='center'>";
	  /*txt +="<strong>"+myYear+"年"+(myMonth+1)+"月カレンダー</strong>";*/
	    txt +="<strong>"+myYear+"年"+(myMonth+1)+"月</strong>";
	    txt +="</td></tr>";

	    txt +="<tr>";       /* 曜日見出しセット */
	    for(i=0; i<7; i++){ /* 一行(１週間)ループ */
		txt +="<td align='center' ";  
		if(i==0)txt+="bgcolor='#fa8072'>";
							/* 日曜のセルの色 */
		else txt+="bgcolor='#ffebcd'>"; 
							/* 月～土のセルの色 */
		txt +="<strong>"+myWeekTbl[i]+"</strong>"; 
						      /* '日'から'土'の表示 */
		txt +="</td>";  
	    } 

	    txt +="</tr>"; /* */

	    var myDat;
	    for(i=0; i<myTblLine; i++){		 /* 表の「行」のループ */
		txt +="<tr>"; 				   /* 行の開始 */
		for(j=0; j<7; j++){ /* 表の「列」のループ */
		  txt+="<td align='center' "; /* 列(セル)の作成 */
		  myDat = myTable[j+(i*7)]; /* 書きこむ内容の取得 */
		  if (myDat==myToday)txt+="bgcolor='#00ffff'>";
							   /* 今日のセルの色 */
		  else if(j==0) txt+="bgcolor='#ffb6c1'>"; /* 日曜のセルの色 */
		  else txt+="bgcolor='#ffffe0'>"; 	   /* 平日のセルの色 */


		  txt+="<strong ng-click=\"hi=carender.view_model.hizuke("+(myMonth+1)+","+myDat+");\">"+myDat+"</strong>"; /* 日付セット*/

		  txt+="</td>"; /* 列(セル)の終わり */
		}  
		txt+="</tr>"; /* 行の終わり */
	    } 


	    txt +="</table>";
	    
	    /*document.getElementById(cren).innerHTML=txt;*/

/* Angularjsの再コンパイル                              */
/* 作成したhtml(txt)はAngularjsを認識していないので     */
/* Angularjsの再コンパイルを行いAngularjsを再認識させる */

				　/* カレンダー画面のオブジェクト取得*/
　	    var doc = document.getElementById(cren);
				　/* 画面のオブジェクトにhtmlのテキストを設定*/
    	    angular.element(doc).html(txt);

						/* Angularjsの再コンパイル */
            angular.element(document).injector().invoke(function($compile) {  
		var obj_menu = angular.element(doc);
		var scope = obj_menu.scope();     /*画面のオブジェクト取得*/
		$compile(obj_menu.contents())(scope);/* Angularjsのコンパイル */
    	    });


	}
/****                                              ***/
/****       日付け表示                             ***/
/****                                              ***/

     	hizuke(myMonth,myDat):string{
	   var hi;
				        /* 親windowのオブジェクトを設定する  */
	   var oyawindow = window.opener.document.getElementById('textdate');
	/* var oyawindow = window.opener.document.createAttribute("textdate");*/

	   hi = "指定日付:"+myMonth+"月"+myDat+"日";

	   /*alert(hi);*/
	　 oyawindow.value = hi;          /*日付を親windowのTEXTBOXにセット*/

	   window.close();		  /* 子window*(自分)をclose */

	   return hi;
    	}

/****                                              ***/
/****  親windowが存在しなかった場合                ***/
/****  子window(自分)を画面closeする (未使用)      ***/
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
 * app モジュールに app.view_model.CarenderViewModel という名前で ViewModel を登録している。
 * CarenderinController の初期化時に以下の処理が行われ、CarenderControllerのインスタンスに本ViewModelのインスタンスがDIでバインドされる。
 *
 * $stateProviderに"portal"ステートを追加している。
 */
angular.module('app').factory("app.view_model.CarenderViewModel", [ '$state', 'app.model.User',
    ($state:ng.ui.IStateService, User:app.model.User):app.view_model.CarenderViewModel => {
        return new app.view_model.CarenderViewModel($state, User)
    }
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $stateProvider
      .state("carender", { url: "/carender", templateUrl: 'views/carender.html'})
}]);
