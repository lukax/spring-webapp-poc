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

require(['util/package/PackageLoader'], function (loader) {
    loader.util.PackageLoader.instance.load({
        jQuery: "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        domParent: document.body
    }, {
        "Componentes Externos": [
            'jquery',
            'underscore'
        ],
        "Modulo App": [
            "modularity/AppModule"
        ]
    }, function () {
        require(['modularity/AppModule'], function (app) {
            new app.modularity.AppModule().bootstrap(document);
        });
    });
});
