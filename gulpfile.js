var gulp = require('gulp'); 
var inject = require('gulp-inject');

gulp.task('index', function () {
  var target = gulp.src('./gulpsrc/sidebar.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./data/vendor/jquery-1.11.3.min.js', './data/vendor/angular.js', './data/vendor/*.js', './data/sidebar/modules/*.js', './data/sidebar/*.js', './data/sidebar/**/*.js', './data/css/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./data'));
});


// Задача по умолчанию, вызывается запуском `gulp`
gulp.task('default', function() { 
	gulp.run('index');
});