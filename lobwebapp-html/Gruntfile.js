// Generated on 2013-08-20 using generator-angular 0.3.1
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// HTML5 REDIRECT
// var modRewrite = require('connect-modrewrite');

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
      css: {
        files: ['<%= yeoman.app %>/css/**/*.css'],
        tasks: ['copy:css', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/css/**/*.css',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/script/**/*.js',
          '<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      ts: {
        files: 'src/main/script/**/*.ts',
        tasks: ['ts:dev']
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/css/',
          src: '**/*.css',
          dest: '<%= yeoman.tmp %>/css/'
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
              // HTML5 SUPPORT
              // modRewrite(['!\\.html|\\.js|\\.css|\\.eot|\\.jpeg|\\.svg|\\.ttf|\\.woff|\\.ico|\\.gif|\\.otf|\\.png$ /index.html [L]']),
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
        '<%= yeoman.app %>/script/**/*.js'
      ]
    },
    // not used since Uglify task does concat,
    // but still available if needed
    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: [],
    //     dest: '<%= yeoman.app %>/script/app.js'
    //   }
    // },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/script/**/*.js',
            '<%= yeoman.dist %>/css/**/*.css',
            '<%= yeoman.dist %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/css/fonts/*'
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
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },
    // cssmin: {
    //   By default, your `index.html` <!-- Usemin Block --> will take care of
    //   minification. This option is pre-configured if you do not wish to use
    //   Usemin blocks.
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/css/main.css': [
    //         '<%= yeoman.tmp %>/css/**/*.css',
    //         '<%= yeoman.app %>/css/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // htmlmin: {
    //   dist: {
    //     options: {
    //       removeCommentsFromCDATA: true,
    //       // https://github.com/yeoman/grunt-usemin/issues/44
    //       //collapseWhitespace: true,
    //       collapseBooleanAttributes: true,
    //       removeAttributeQuotes: true,
    //       removeRedundantAttributes: true,
    //       useShortDoctype: true,
    //       removeEmptyAttributes: true,
    //       removeOptionalTags: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.app %>',
    //       src: ['*.html', 'views/**/*.html'],
    //       dest: '<%= yeoman.dist %>'
    //     }]
    //   }
    // },
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
            'img/**/*.{gif,webp,png}',
            'css/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.tmp %>/img',
          dest: '<%= yeoman.dist %>/img',
          src: [
            'generated/*'
          ]
        }]
      },
      css: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '<%= yeoman.dist %>/css/',
        src: '**/*.css'
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
      ],
      test: [
        'copy:css'
      ],
      dist: [
        'copy:css',
        'copy:template',
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
          cwd: '<%= yeoman.app %>/script',
          src: '*.js',
          dest: '<%= yeoman.dist %>/script'
        }]
      }
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//,
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>/script/',
                src: '**/*.js',
                dest: '<%= yeoman.dist %>/script/'
               }]
        }
    },
    ts: {
    	watch: {
    		src: ['<%= yeoman.app%>/script/**/*.ts'],
    		watch: '<%= yeoman.app%>/script',  
    		options: {
                target: 'es5',
                declaration: false,                
                comments: false
            },
    	},
      dev: {
      	src: ['<%= yeoman.app%>/script/**/*.ts'],        // The source typescript files, http://gruntjs.com/configuring-tasks#files
          //html: [], // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
          //reference: './test/reference.ts',  // If specified, generate this file that you can use for your reference management
          //out: 'test/out.js',                // If specified, generate an out.js file which is the merged js file                     
          //outDir: 'test/outputdirectory',    // If specified, the generate javascript files are placed here. Only works if out is not specified
          //watch: '<%= yeoman.app%>/script',   // If specified, watches this directory for changes, and re-runs the current target  
          options: {
              module: 'amd',       // 'amd' (default) | 'commonjs'
              target: 'es5',            // 'es3' (default) | 'es5'
              sourcemap: false,          // true  (default) | false
              declaration: false,       // true | false  (default)                
              comments: false           // true | false (default)
          },
      }
    },
    requirejs: {
        compile: {
            options: {
                baseUrl: "<%= yeoman.app %>/script",
                mainConfigFile: "<%= yeoman.app %>/script/main.js",
                out: "<%= yeoman.dist %>/script/app.min.js",
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
	  'ts:dev',
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
      'ts:dev',
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


  grunt.loadNpmTasks('grunt-ts');
};
