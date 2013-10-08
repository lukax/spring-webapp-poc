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
        backbone: '../lib/backbone-amd/backbone',
        ngEkathuwa: '../lib/ngEkathuwa/ekathuwa',
        ngAnimateAnimateCss: '../lib/ngAnimate-animate.css/animate',
        packageLoader: 'util/package/PackageLoader'
	},
	baseUrl: 'scripts',
    shim: {
        'bootstrap': {
            deps: [ 'jquery' ],
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
        'moment': { 'exports': 'moment' },
        'ngAnimateAnimateCss': {
            deps: ['angularAnimate'],
            'exports': 'ngAnimateAnimateCss'
        }
	},
	priority: [
        'angular'
	]
});

require(['util/package/PackageLoader'], (loader: any) => {
    loader.util.PackageLoader.instance.load({
        // These frameworks are required for the preloader to run.
        jQuery: "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        domParent: document.body,
    }, {
        // These packages are not necessary to the running of the preloader, but have been used in this example.
        // In this example, base packages 2 is backbone - reliant on the loading of underscore in base packages 1. Each set of packages begins loading when the previous set has loaded.
        // The keys act as labels for the listing of currently loading packages.
        "Componentes Externos": [
            'jquery',
            'underscore',
        ],
        "Modulo App": [
            "modularity/AppModule",
        ],
    }, () => {
        require(['modularity/AppModule'], (app: any) => {
            new app.modularity.AppModule().bootstrap(document);
        });
    });
})

// hey Angular, we're bootstrapping manually!
// not necessary when not using ng-app in index.html
//window.name = "NG_DEFER_BOOTSTRAP!";

//require(['modularity/AppModule'], (app: any) => {
//    new app.modularity.AppModule().bootstrap(document);
//});