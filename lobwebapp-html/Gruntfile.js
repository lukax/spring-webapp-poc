// Generated on 2013-08-20 using generator-angular 0.3.1
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

//LUCAS'S VARS
var modRewrite = require('connect-modrewrite');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'src/main',
    dist: 'build',
    test: 'src/test',
    tmp: '.tmp'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yeoman: yeomanConfig,
    watch: {
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      typescript: {
        files: 'src/main/scripts/**/*.ts',
        tasks: ['typescript']
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= yeoman.tmp %>/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              //HTML5 SUPPORT
              //modRewrite(['!\\.html|\\.js|\\.css|\\.eot|\\.jpeg|\\.svg|\\.ttf|\\.woff|\\.ico|\\.gif|\\.otf|\\.png$ /index.html [L]']),
              lrSnippet,
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.test)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    // not used since Uglify task does concat,
    // but still available if needed
    concat: {
      // options: {
      //   separator: ';',
      // },
      // dist: {
      //   src: [//'<%= yeoman.app %>/config/**/*.js', 
      //         //'<%= yeoman.app %>/controller/**/*.js',
      //         //'<%= yeoman.app %>/domain/**/*.js', 
      //         //'<%= yeoman.app %>/repository/**/*.js', 
      //         //'<%= yeoman.app %>/service/**/*.js'
      //         ],
        
      //   dest: '<%= yeoman.app %>/scripts/app.js'
      // }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '<%= yeoman.tmp %>/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'lib/**/*',
            'img/{,*/}*.{gif,webp,png}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.tmp %>/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '<%= yeoman.dist %>/styles/',
        src: '{,*/}*.css'
      },
      template: {
        expand: true,
        cwd: '<%= yeoman.app %>/template',
        dest: '<%= yeoman.dist %>/template/',
        src: '**/*.html'
      }
    },
    concurrent: {
      server: [
        //,'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        //'copy:template',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//,
            //mangle: true,
            //beautify: true,
            //wrap: true
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>/scripts/',
                src: '**/*.js',
                dest: '<%= yeoman.dist %>/scripts/'
               }]
        }
    },
    typescript: {
        base: {
            src: ['<%= yeoman.app%>/scripts/**/*.ts' ],
            options: {
                module: 'amd',
                target: 'es5'//,
                //base_path: '<%= yeoman.app %>'//,
                //sourcemap: true,
                //fullSourceMapPath: true,
                //declaration: true
            }
        }
    },
    requirejs: {
        compile: {
            options: {
                baseUrl: "<%= yeoman.app %>/scripts",
                name: 'lwa/modularity/App',
                mainConfigFile: "<%= yeoman.app %>/scripts/AppConfig.js",
                out: "<%= yeoman.dist %>/scripts/app.min.js",
                preserveLicenseComments: false
            }
        }
    }

  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'typescript',
      'concurrent:server',
      //'autoprefixer',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    //'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', function (target) {
    if(target === 'requirejs') {
      return grunt.task.run(['requirejs']);
    }

    grunt.task.run([
      'clean:dist',
      'typescript',
      'uglify:dist',
      //'requirejs',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'copy',
      'ngmin',
      'cssmin',
      'rev',
      'usemin'
    ])
  });

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('host', [
    'open',
    'connect:dist:keepalive'
  ]);

};
