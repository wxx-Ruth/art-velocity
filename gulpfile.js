var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
gulp.task('run', function() {
	nodemon({
		script: './bin/www',
		ignore: ['node_modules']
	}).on('start', function() {
		browserSync.init({
			proxy: 'localhost:3000',
			port:9999
		});
		gulp.watch("./public/js/*.js").on('change', browserSync.reload);
	});
});