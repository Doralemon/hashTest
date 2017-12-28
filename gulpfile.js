var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');//html压缩组件
var babel = require('gulp-babel');
var jshint=require('gulp-jshint');
var removeEmptyLines = require('gulp-remove-empty-lines');
var cleanCSS = require('gulp-clean-css');//压缩css
    gulp.task('rjs', function(){
        return gulp.src('src/js/**/*.js')
        .pipe(
            requirejsOptimize({
                optimize: 'none',
                mainConfigFile: 'src/main.js'
            }))
        .pipe(gulp.dest('dist/js/'));
    });
    gulp.task('jshint', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    gulp.task('minifyjs', function() {
       gulp.src('src/*.js')
       .pipe(babel())
          .pipe(uglify())    //压缩
          .pipe(gulp.dest('dist/'));  //输出
   });
    gulp.task('mifyjs', function() {
        gulp.src(['src/js/**/*.js','!src/js/common/getPage.js'])
        .pipe(babel())
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js/'));  //输出
    });

    gulp.task('html',function(){
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src('src/*.html')
            .pipe(removeEmptyLines({removeComments: true}))//清除空白行
            .pipe(htmlmin(options))
            .pipe(gulp.dest('dist/'));
    });
    gulp.task('tplhtml',function(){
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src(['src/tpls/*.html','src/tpls/**/*.html','!src/tpls/cameraManagementBatchAll.html'])
            .pipe(removeEmptyLines({removeComments: true}))//清除空白行
            .pipe(htmlmin(options))
            .pipe(gulp.dest('dist/tpls/'));
    });
    gulp.task('csscompress', function() {
        // 1. 找到文件
    return  gulp.src('src/css/*.css')
        // 2. 压缩文件
            .pipe(cleanCSS())
            // 3. 另存压缩后的文件
            .pipe(gulp.dest('dist/css'));
    });
    gulp.task('watch',function(){
        gulp.watch('src/*.html');
        gulp.watch('src/js/**/*.js');
    })
    gulp.task('default',function(){
        gulp.run('mifyjs','minifyjs','html','tplhtml');
    })