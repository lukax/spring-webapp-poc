'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var modRewrite = require('connect-modrewrite');
var rewriteRules = [
    '^/api/(.*)$ http://lobwebapp.herokuapp.com/$1 [P]', /* API Proxy */
    '!\\.html|\\.js|\\.css|\\.eot|\\.jpeg|\\.svg|\\.ttf|\\.woff|\\.ico|\\.gif|\\.otf|\\.png$ /index.html [L]' /* HTML5 Redirect */
];
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    var yeomanConfig = {
        app: 'src',
        dist: 'dist',
        test: 'test'
    };

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
                '<%= yeoman.app %>/css/**/*.css',
                '<%= yeoman.app %>/script/**/*.js',
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
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite(rewriteRules),
                            lrSnippet,
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite(rewriteRules),
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.test)
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
                    src: ['<%= yeoman.dist %>/*']
                }]
            }
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
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: true,
                preserveComments: false
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
                src: ['<%= yeoman.app%>/script/**/*.ts'],
                options: {
                    target: 'es5',
                    declaration: false,
                    removeComments: false
                }
            },
            dist: {
                src: ['<%= yeoman.app%>/script/**/*.ts'],
                options: {
                    target: 'es5',
                    sourcemap: false
                }
            },
            test: {
                src: ['<%= yeoman.app%>/script/**/*.ts', '<%= yeoman.test%>/**/*.ts'],
                options: {
                    target: 'es5'
                }
            }
        }

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'less:dev',
            'ts:dev',
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
            'ts:test',
            'karma:unit'
            ]);
    });

    grunt.registerTask('build', function (target) {
        grunt.task.run([
            'clean:dist',
            'copy:dist',
            'less:dist',
            'ts:dist',
            'uglify:dist'
            ]);
    });

    grunt.registerTask('default', [
        'build'
        ]);

    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-ts");
};
