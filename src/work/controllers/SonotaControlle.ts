/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../view_models/SonotaViewModel.ts" />

module app.controller {
    'use strict';
    export class SonotaController {
        private view_model:app.view_model.SonotaViewModel;
        constructor(private SonotaViewModel:app.view_model.SonotaViewModel){
            /* DI された SonotaViewModel インスタンスを本インスタンスにバインドする */
            this.view_model = SonotaViewModel;
        }
    }
}

/* 
 * Injector への登録
 * app.controller モジュールに SonotaController を Controller として登録している。
 * ログインの view で ng-controller により SonotaController がバインドされると、
 * 以下の処理が行われて、SonotaControllerのインスタンスが返却される。
 */
angular.module('app.controller').controller("SonotaController", ['app.view_model.SonotaViewModel',
    (SonotaViewModel:app.view_model.SonotaViewModel):app.controller.SonotaController => {
        return new app.controller.SonotaController(SonotaViewModel);
    }
]);
