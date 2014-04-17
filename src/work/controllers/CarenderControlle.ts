/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../view_models/CarenderViewModel.ts" />

module app.controller {
    'use strict';
    export class CarenderController {
        private view_model:app.view_model.CarenderViewModel;
        constructor(private CarenderViewModel:app.view_model.CarenderViewModel){
            /* DI された CarenderViewModel インスタンスを本インスタンスにバインドする */
            this.view_model = CarenderViewModel;
	    
        }
    }


/** 子windowのwindowフォーカスが外れた場合 **/
/** 子window(自分)をcloseする     (jQuery) **/
    $(window).bind("blur",function(){  /*フォーカスが外れた(blur)*/
      window.close();
    });

/** 親windowが存在しない場合               **/
/** 子window(自分)をcloseする     (jQuery) **/
    $(window).bind(function(){  /**/
						/*親ウィンドウが存在しない */
	   if(!window.opener || window.opener.closed){
　　　　	window.close();                 /*子ウィンドウ(自分)をclose */
　　	   } 
    });

}

/* 
 * Injector への登録
 * app.controller モジュールに CarenderController を Controller として登録している。
 * ログインの view で ng-controller により CarenderController がバインドされると、
 * 以下の処理が行われて、CarenderControllerのインスタンスが返却される。
 */
angular.module('app.controller').controller("CarenderController", ['app.view_model.CarenderViewModel',
    (CarenderViewModel:app.view_model.CarenderViewModel):app.controller.CarenderController => {
        return new app.controller.CarenderController(CarenderViewModel);
    }
]);
