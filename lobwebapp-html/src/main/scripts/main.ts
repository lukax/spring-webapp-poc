///<reference path='reference.d.ts'/>

require.config({
    paths: {
        text: '../lib/requirejs-text/text',
        jquery: '../lib/jquery/jquery',
        bootstrap: '../lib/bootstrap-sass/dist/js/bootstrap',
		angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route',
        angularMocks: '../lib/angular-mocks/angular-mocks',
        angularAnimate: '../lib/angular-animate/angular-animate',
        angularUi: '../lib/angular-ui/build/angular-ui',
        angularUiRouter: '../lib/angular-ui-router/release/angular-ui-router',
        angularUiBootstrap: '../lib/angular-ui-bootstrap/ui-bootstrap',
        underscore: '../lib/underscore-amd/underscore',
        underscoreString: '../lib/underscore.string/dist/underscore.string.min',
        backbone: '../lib/backbone-amd/backbone',
        ngEkathuwa: '../lib/ngEkathuwa/ekathuwa',
        moment: '../lib/moment/moment',
        ngAnimateAnimate: '../lib/ngAnimate-animate.css/animate'
	},
	baseUrl: 'scripts',
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            'exports': 'bootstrap'
        },
        'angular': {
            deps: ['jquery'],
            'exports': 'angular'
        },
        'angularRoute': {
            deps: ['angular'],
            'exports': 'angularRoute'
        },
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'angularAnimate': {
            deps: ['angular'],
            'exports': 'angularAnimate'
        },
        'angularUi': {
            deps: ['angular', 'jquery'],
            'exports': 'angularUi'
        },
        'angularUiRouter': {
            deps: ['angular'],
            'exports': 'angularUiRouter'
        },
        'angularUiBootstrap': {
            deps: ['angular', 'jquery'],
            'exports': 'angularUiBootstrap'
        },
        'underscoreString': {
            deps: ['underscore'],
            'exports': 'underscoreString'
        },
        'moment': { 'exports': 'moment' },
        'ngAnimateAnimate': {
            deps: ['angularAnimate'],
            'exports': 'ngAnimateAnimate'
        }
	},
	priority: [
        'angular'
	]
});



// hey Angular, we're bootstrapping manually!
// not necessary when not using ng-app in index.html
//window.name = "NG_DEFER_BOOTSTRAP!";

require(['modularity/AppModule'], (app: any) => {
    new app.modularity.AppModule().bootstrap(document);
});