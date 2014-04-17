/*!
 * WeinExperte App's Gruntfile
 *
 */


var SERVER_PORT = 9000+Math.round(Math.random()*100),
    LIVERELOAD_PORT = 35730+Math.round(Math.random()*100),
    lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    }),
    livereloadMiddleware = function(connect, options) {
        return [
            // Inject a livereloading script into static files.
            lrSnippet,
            // Serve static files.
            connect.static(options.base[0]),
            // Make empty directories browsable.
            connect.directory(options.base[0])
        ];
    };


module.exports = function(grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
            ' */\n',

        // Task configuration.
        clean: {
            options: {
                force: true
            },
            dist:   ["<%= pkg.compilePath %>**/*.html", "<%= pkg.compilePath %>css/"],
            bin:    ["bin/**/*"]
        },

        less: {
            compileCore: {
                options: {
                    strictMath: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'grid.css.map',
                    sourceMapFilename: 'bin/grid.css.map'
                },
                files: {
                    'bin/grid.css': 'less/grid.less'
                }
            },
            minifyCore: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'bin/grid.min.css': 'bin/grid.css'
                }
            },
            compileDemo: {
                options: {
                    strictMath: true,
                    sourceMap: false
                },
                files: {
                    'bin/demo.css': 'less/demo.less'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    "bin/demo.html": ["jade/demo.jade"]
                }
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        'bin/demo.css',
                        'bin/grid.css',
                        'bin/grid.min.css'
                    ]
                }
            }
        },

        csscomb: {
            sort: {
                options: {
                    config: 'less/.csscomb.json'
                },
                files: {
                    'css/styles.css': 'css/styles.css'
                }
            }
        },

        copy: {
            css: {
                expand: true,
                cwd:"bin/",
                src: ['*.css', '*.css.map'],
                dest: '<%= pkg.compilePath %>css/'
            },
            html: {
                expand: true,
                cwd:"bin/",
                src: '**/*.html',
                dest: '<%= pkg.compilePath %>'
            }
        },


        watch: {
            css: {
                files: 'less/**/*.less',
                tasks: 'deploy-css'
            },
            html: {
                files: 'jade/**/*.jade',
                tasks: 'deploy-html'
            },
            dist: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                tasks: [],
                files: [
                    '<%= pkg.compilePath %>*.html',
                    '<%= pkg.compilePath %>css/*.css'
                ]
            }
        },

        connect: {
            dist: {
                options: {
                    port: SERVER_PORT,
                    hostname: '0.0.0.0',
                    base: '<%= pkg.compilePath %>',
                    middleware: livereloadMiddleware
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.dist.options.port %>'
            }
        }
    });



    // HTML Compilation task.    
    grunt.registerTask('compile-html', ['jade']);
    // CSS Compilation task.    
    grunt.registerTask('compile-css', ['less', 'csscomb', 'usebanner']);

    // HTML distribution task.
    grunt.registerTask('deploy-html', ['compile-html', 'copy:html']);
    // CSS distribution task.    
    grunt.registerTask('deploy-css', ['compile-css', 'copy:css']);


    // Full Compilation task.    
    grunt.registerTask('compile', ['clean:bin', 'compile-html', 'compile-css']);
    // Full distribution task.
    grunt.registerTask('deploy', ['clean:dist', 'compile', 'copy']);

    // Live server for development
    grunt.registerTask('server', ['deploy', 'connect:dist', 'open', 'watch']);

};
