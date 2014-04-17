/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../view_models/LoginViewModel.ts" />

module app.controller {
    'use strict';
    export class LoginController {
        private view_model:app.view_model.LoginViewModel;
        constructor(private LoginViewModel:app.view_model.LoginViewModel){
            /* DI された LoginViewModel インスタンスを本インスタンスにバインドする */
            this.view_model = LoginViewModel;
        }
    }
}

/* 
 * Injector への登録
 * app.controller モジュールに LoginController を Controller として登録している。
 * ログインの view で ng-controller により LoginController がバインドされると、
 * 以下の処理が行われて、LoginControllerのインスタンスが返却される。
 */
angular.module('app.controller').controller("LoginController", ['app.view_model.LoginViewModel',
    (LoginViewModel:app.view_model.LoginViewModel):app.controller.LoginController => {
        return new app.controller.LoginController(LoginViewModel);
    }
]);
