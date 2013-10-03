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
        angularUiRouter: '../components/angular-ui-router/release/angular-ui-router',
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
            deps: ['jquery'],
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
        'moment': { 'exports': 'moment' }
    },
    priority: [
        'angular'
    ]
});

require(['lwa/modularity/AppModule'], function (app) {
    new app.modularity.AppModule().bootstrap(document);
});
