///<reference path="reference.ts"/>

require.config({
  paths: {
    text: "../lib/requirejs-text/text",
    jquery: "../lib/jquery/dist/jquery.min",
    jqueryMaskedInput: "../lib/jquery.maskedinput/jquery.maskedinput.min",
    bootstrap: "../lib/bootstrap/dist/js/bootstrap.min",
    angular: "../lib/angular/angular.min",
    angularRoute: "../lib/angular-route/angular-route.min",
    angularAnimate: "../lib/angular-animate/angular-animate.min",
    angularUi: "../lib/angular-ui/build/angular-ui.min",
    angularUiUtils: "../lib/angular-ui-utils/ui-utils",
    angularUiBootstrap: "../lib/angular-ui-bootstrap-bower/ui-bootstrap.min",
    underscore: "../lib/underscore-amd/underscore-min",
    dc: "../lib/dcjs/dc.min",
    d3: "../lib/d3/d3.min",
    crossfilter: "../lib/crossfilter/crossfilter.min",
    NProgress: "../lib/nprogress/nprogress"
  },
  map:{
    "*": {
      "urijs": "../lib/uri.js/src/URI",
      "fileupload": "../lib/jquery-file-upload/js/jquery.fileupload",
      "jquery.ui.widget": "../lib/jquery-file-upload/js/vendor/jquery.ui.widget",
      "jquery.iframe.transport": "lib/jquery-file-upload/js/jquery.iframe-transport.js"
    }
  },
  shim: {
    "angular": {
      deps: ["jquery", "bootstrap", "underscore"],
      exports: "angular"
    },
    "jqueryMaskedInput": {
      deps: ["jquery"],
      exports: "$.fn.mask"
    },
    "bootstrap": {
      deps: ["jquery"],
      exports: "$.fn.alert"
    },
    "angularRoute": ["angular"],
    "angularAnimate": ["angular"],
    "angularUi": ["angular"],
    "angularUiUtils": ["jqueryMaskedInput","angular"],
    "angularUiBootstrap": ["angular"],
    "NProgress": {
      deps: ["jquery"],
      exports: "NProgress"
    },
    "d3": { exports: "d3" },
    "crossfilter": { exports: "crossfilter" },
    "dc": {
      deps: ["jquery","text!../lib/dcjs/dc.css","d3","crossfilter"],
      exports: "dc",
      init: ($: JQueryStatic, css: any) => {
        var el = $("<style></style>").append(css);
        $("head").append(el);
      }
    },
    "urijs": {
      exports: "URI"
    }
  }
});

require(["angular",
         "angularRoute",
         "angularAnimate",
         "angularUi",
         "angularUiBootstrap",
         "angularUiUtils",
         "fileupload",
         "crossfilter",
         "d3",
         "dc",
         "urijs"
        ], () => {
  core.AppModuleConfig.bootstrap(document);
});
