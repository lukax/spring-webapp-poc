'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    var yeomanConfig = {
        app: 'src',
        dist: 'dist',
        test: 'test',
        tmp: '.tmp'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        watch: {
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
            less:{
                files: ['<%= yeoman.app %>/css/**/*.less'],
                tasks: ['less:dev']
            },
            css: {
                files: ['<%= yeoman.app %>/css/**/*.css'],
                tasks: ['copy:css']
            },

            tsdev: {
                files: '<%= yeoman.app %>/script/**/*.ts',
                tasks: ['ts:dev']
            },
            tstest: {
                files: '<%= yeoman.test %>/**/*.ts',
                tasks: ['ts:test', 'karma']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {                        
                        '^/api': '/lobwebapp-core'
                    }
                }
            ],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            // HTML5 SUPPORT
                            // modRewrite(['!\\.html|\\.js|\\.css|\\.eot|\\.jpeg|\\.svg|\\.ttf|\\.woff|\\.ico|\\.gif|\\.otf|\\.png$ /index.html [L]']),
                            lrSnippet,
                            proxySnippet,
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
                            proxySnippet,
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
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt,html}',
                        '.htaccess',
                        'lib/**/*',
                        'img/**/*.{gif,webp,png,ico}',
                        'template/**/*.html',
                        'view/**/*.html'
                    ]
                }]
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['<%= yeoman.app %>/css']
                },
                files: {
                    '<%= yeoman.app %>/css/main.css': '<%= yeoman.app %>/css/main.less'
                }
            },
            dist: {
                options: {
                    paths: ['<%= yeoman.app %>/css']
                },
                files: {
                    '<%= yeoman.dist %>/css/main.css': '<%= yeoman.app %>/css/main.less'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
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
                }
            },
            dist: {
                src: ['<%= yeoman.app%>/script/**/*.ts'],
                options: {
                    target: 'es5'
                }
            },
            test: {
                src: ['<%= yeoman.test%>/**/*.ts'],
                options: {
                    target: 'es5'
                }
            }
        }

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'less:dev',
            'ts:dev',
            'configureProxies',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (target) {
        if(target === 'watch'){
            return grunt.task.run('watch');
        }
        grunt.task.run([
            'clean:server',
            'ts:dev',
            'ts:test',
            'karma:unit'
        ]);
    });

    grunt.registerTask('build', function (target) {
        grunt.task.run([
            'clean:dist',
            'less:dist',
            'ts:dist',
            'uglify:dist',
            'copy:dist'
        ]);
    });

    grunt.registerTask('default', [
        'build'
    ]);
    
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-ts");
};
