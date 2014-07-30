/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/app/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js', 'src/app/app.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    ts: [ 'src/**/*.ts', '!src/**/*.spec.ts' ],
    tshtml: [ 'src/app/**/*.html' ],
    tsreference: 'src/app/reference.ts',
    tsout: 'src/app/app.js',
    tsunit: [ 'src/**/*.spec.ts' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery-file-upload/js/vendor/jquery.ui.widget.js',
      'vendor/jquery-file-upload/js/jquery.fileupload.js',
      'vendor/angular/angular.js',
      'vendor/angular-route/angular-route.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-animate-sequence/angular-animate-stylers.js',
      'vendor/angular-animate-sequence/angular-animate-sequence.js',
      'vendor/material/material-design.js',
      'vendor/nprogress/nprogress.js',
      'vendor/uri.js/src/URI.js',
      //'vendor/d3/d3.js',
      //'vendor/crossfilter/crossfilter.js'
    ],
    css: [
      'vendor/nprogress/nprogress.css',
      'vendor/material/material-design.css'
    ],
    assets: [
    ]
  }

};
