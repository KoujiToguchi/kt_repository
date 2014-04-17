/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../view_models/PortalViewModel.ts" />

module app.controller {
    'use strict';
    export class PortalController {
        private view_model:app.view_model.PortalViewModel;
        constructor(private PortalViewModel:app.view_model.PortalViewModel){
	    /*alert("test00");*/

            this.view_model = PortalViewModel;
        }
    }


}

angular.module('app.controller').controller("PortalController", ['app.view_model.PortalViewModel',
    (PortalViewModel:app.view_model.PortalViewModel):app.controller.PortalController => {
        return new app.controller.PortalController(PortalViewModel);
    }
]);
