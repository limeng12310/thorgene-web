(function () {
    var path = require('path');
    var gulp = require('gulp');
    var less = require('gulp-less');
    var connect = require('gulp-connect');
    var ConnectProxy = require('gulp-connect-proxy');
    var uglify = require('gulp-uglify');
    var htmlmin = require('gulp-htmlmin');
    var rename = require('gulp-rename');
    var sourcemaps = require('gulp-sourcemaps');

    paths = {
        root: './',
        common: {
            root: 'common',
            less: 'common/less/*.less',
            js: 'common/js/*.js',
            resource: 'common/resource/*'
        },
        pages: {
            // 新增页面时,需要追加list
            list: ['demo-page', 'summarize'],
            js: 'js/*.js',
            less: 'less/*.less',
            img: 'img/*',
            html: '*.html'
        },
        dependencies: [
            // {
            //     name: 'framework7',
            //     root: 'node_modules/framework7/dist/',
            //     css: [
            //         'node_modules/framework7/dist/css/framework7.ios.colors.min.css',
            //         'node_modules/framework7/dist/css/framework7.ios.min.css',
            //         'node_modules/framework7/dist/css/framework7.material.colors.min.css',
            //         'node_modules/framework7/dist/css/framework7.material.min.css'
            //     ],
            //     js: [
            //         'node_modules/framework7/dist/js/framework7.min.js'
            //     ]
            //
            // }
        ],
        build: {
            root: 'build/',
            styles: 'build/css/',
            scripts: 'build/js/',
            img: 'build/img',
            resource: 'build/resource'
        },
        dist: {
            root: '../public/',
            styles: 'public/css/',
            scripts: 'public/js/'
        }
    };

    gulp.task('dependencies', function (cb) {
        var subTasks = 4;
        var cbs = 0;

        // bootstrap
        gulp.src(['node_modules/bootstrap/dist/css/*'])
            .pipe(gulp.dest(paths.build.styles))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        gulp.src(['node_modules/bootstrap/dist/js/*'])
            .pipe(gulp.dest(paths.build.scripts))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        gulp.src(['node_modules/bootstrap/dist/fonts/*'])
            .pipe(gulp.dest(path.join(paths.build.root, 'fonts')))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // jquery
        gulp.src(['node_modules/jquery/dist/jquery.min.js'])
            .pipe(gulp.dest(paths.build.scripts))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

    });

    gulp.task('common', function (cb) {
        var subTasks = 4;
        var cbs = 0;

        // common js
        gulp.src([paths.common.js])
            .pipe(gulp.dest(paths.build.scripts))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // common css
        gulp.src([paths.common.less])
            .pipe(less())
            .on('error', function (error) {
                console.log(error.toString());
                this.emit('end');
            })
            .pipe(gulp.dest(paths.build.styles))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // common resource
        gulp.src([paths.common.resource])
            .pipe(gulp.dest(paths.build.resource))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // others
        gulp.src([path.join(paths.common.root, '*.*')])
            .pipe(gulp.dest(paths.build.root))
            .on('end', function () {
                if (++cbs === subTasks) {
                    cb();
                }
            });
    });

    gulp.task('pages', function (cb) {
        var totalCbs = paths.pages.list.length * 4;
        var cbs = 0;

        paths.pages.list.forEach(function (pageName) {
            // page js
            gulp.src([path.join(pageName, paths.pages.js)])
                .pipe(gulp.dest(paths.build.scripts))
                .on('end', function () {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // page css
            gulp.src([path.join(pageName, paths.pages.less)])
                .pipe(less())
                .on('error', function (error) {
                    console.log(error.toString());
                    this.emit('end');
                })
                .pipe(gulp.dest(paths.build.styles))
                .on('end', function () {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // page img
            gulp.src([path.join(pageName, paths.pages.img)])
                .pipe(gulp.dest(paths.build.img))
                .on('end', function () {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // html
            gulp.src([path.join(pageName, paths.pages.html)])
                .pipe(gulp.dest(paths.build.root))
                .on('end', function () {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });
        });
    });


    gulp.task('build', ['dependencies', 'common', 'pages'], function (cb) {
        cb();
    });

    gulp.task('dist', function (cb) {
        cb('TODO in dist');
    });

    gulp.task('watch', function () {
        // watch dependencies
        paths.dependencies.forEach(function (dependency) {
            gulp.watch(dependency.js, ['dependencies']);
            gulp.watch(dependency.css, ['dependencies']);
        });

        // watch common
        gulp.watch(paths.common.js, ['common']);
        gulp.watch(paths.common.less, ['common']);

        // watch pages
        paths.pages.list.forEach(function (pageName) {
            gulp.watch(path.join(pageName, paths.pages.js), ['pages']);
            gulp.watch(path.join(pageName, paths.pages.less), ['pages'])
                .on('error', function (e) {
                    console.log(e);
                });
            gulp.watch(path.join(pageName, paths.pages.html), ['pages']);
        });

        // reload
        gulp.watch(paths.build.scripts, function () {
            gulp.src(paths.build.scripts)
                .pipe(connect.reload());
        });
        gulp.watch(paths.build.styles, function () {
            gulp.src(paths.build.styles)
                .pipe(connect.reload());
        });
        gulp.watch(path.join(paths.build.root, '*.html'), function () {
            gulp.src(path.join(paths.build.root, '*.html'))
                .pipe(connect.reload());
        })

    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ './build' ],
            livereload: true,
            port:'3000',
            middleware: function (connect, opt) {
                opt.route = '/api';
                var proxy = new ConnectProxy(opt);
                return [proxy];
            }
        });
    });

    gulp.task('server', [ 'watch', 'connect' ]);

})();