///<reference path='../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../ts-definitions/requirejs/require.d.ts'/>

require.config({
    paths: {
		angular: '../components/angular/angular',
		angularRoute: '../components/angular-route/angular-route',
        angularMocks: '../components/angular-mocks/angular-mocks',
        angularUi: '../components/angular-ui/build/angular-ui',
        angularUiBootstrap: '../components/angular-ui-bootstrap/dist/ui-bootstrap-0.6.0',
        angularStrap: 'plugins/angular-strap',
        text: '../components/requirejs-text/text'
	},
	baseUrl: 'scripts',
	shim: {
        'angular': { 'exports': 'angular' },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'angularUi': { 'exports': 'angularUi' },
        'angularUiBootstrap': { 'exports': 'angularUiBootstrap' },
        'angularStrap': { 'exports': 'lib/angular-strap' },
        'ekathuwa': { 'exports': 'lib/ekathuwa' } 
	},
	priority: [
		"angular"
	]
});

// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    'angular',
    'app'
], function (angular, app) {
        'use strict';
        new app.module.App();
        angular.resumeBootstrap();
        //angular.element().ready(function () {
          //  $html.addClass('ng-app');
          //  angular.bootstrap($html, 'lwa');
        //});
        //angular.element(document).ready(function () {
        //    angular.bootstrap(document, ['lwa']);
        //});
    });
