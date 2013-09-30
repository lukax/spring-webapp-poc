///<reference path='./../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./lwa/reference.d.ts'/>

require.config({
    paths: {
        text: '../components/requirejs-text/text',
        jquery: '../components/jquery/jquery',
        bootstrap: '../components/bootstrap-sass/dist/js/bootstrap',
		angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        angularMocks: '../components/angular-mocks/angular-mocks',
        angularAnimate: '../components/angular-animate/angular-animate',
        angularUi: '../components/angular-ui/build/angular-ui',
        angularUiBootstrap: 'plugins/ui-bootstrap',
        underscore: '../components/underscore-amd/underscore',
        underscoreString: '../components/underscore.string/dist/underscore.string.min',
        backbone: '../components/backbone-amd/backbone',
        ekathuwa: 'plugins/ekathuwa',
        moment: '../components/moment/moment'
	},
	baseUrl: 'scripts',
    shim: {
        'bootstrap': {
            deps: [ 'jquery' ],
            'exports': 'bootstrap'
        },
        'angular': { 'exports': 'angular' },
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
        'angularUiBootstrap': {
            deps: ['angular', 'jquery'],
            'exports': 'angularUiBootstrap'
        },
        'underscoreString': {
            deps: ['underscore'],
            'exports': 'underscoreString'
        },
        'moment': { 'exports': 'moment' }
	},
	priority: [
        'angular'
	]
});



// hey Angular, we're bootstrapping manually!
// not necessary when not using ng-app in index.html
//window.name = "NG_DEFER_BOOTSTRAP!";

require(['lwa/modularity/AppModule'], (app: any) => {
    new app.modularity.AppModule().bootstrap(document);
});