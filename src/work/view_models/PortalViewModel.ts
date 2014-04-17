/// <reference path="../../d.ts/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../d.ts/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />

'use strict';

module app.view_model {
    export class PortalViewModel {
        constructor(private $state:ng.ui.IStateService, private User:app.model.User) {
        }
	    /*login‰æ–Ê‚Å“ü—Í‚µ‚½Ž–¼‚ðŒÄ‚Ño‚·*/
	    authentication_Out(userName:string): string {
		userName = this.User.authentication_Out(userName);
		return userName;
	    }


    }
}

angular.module('app').factory("app.view_model.PortalViewModel", [ '$state', 'app.model.User',
    ($state:ng.ui.IStateService, User:app.model.User):app.view_model.PortalViewModel => {
        return new app.view_model.PortalViewModel($state, User)
    }
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $stateProvider
      .state("kisai", { url: "/kisai", templateUrl: 'views/kisai.html'})
}]);
