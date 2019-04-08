  /*
  	让gulp做任务
   */
  const gulp = require("gulp");

  //拷贝所有html
  gulp.task("copy-html",function(){
  	return gulp.src("*.html")
  	.pipe(gulp.dest("dist/html"))
  	.pipe(connect.reload());
  })

  gulp.task("data", function(){
  	return gulp.src(["*.json","!package.json"])
  	.pipe(gulp.dest("dist/data"))
  	.pipe(connect.reload());
  })
 
  //拷贝所有的js文件
  gulp.task("script",function(){
  	return gulp.src([".js", "!gulpfile.js"])
  	.pipe(gulp.dest("dist/js"))
  	.pipe(connect.reload());
  })

  //压缩 index.js
  const uglify = require("gulp-uglify");
  const rename = require("gulp-rename");
  gulp.task("index-script",function(){
  	return gulp.src("index.js")
  	.pipe(uglify())
  	.pipe(rename("index.min.js"))
  	.pipe(gulp.dest("dist/js"))
  	.pipe(connect.reload());
  })

  //scss gulp-sass
  
  const scss = require("gulp-sass");
  const minifyCSS = require("gulp-minify-css");
  gulp.task("scss",function(){
  	return gulp.src("stylesheet/index.scss")
  	.pipe(scss())
  	.pipe(gulp.dest("dist/css"))
  	.pipe(minifyCSS())
  	.pipe(rename("index.min.css"))
  	.pipe(gulp.dest("dist/css"))
  	.pipe(connect.reload());
  })

  //图片
  gulp.task("images",function(){
  	return gulp.src(["*.{png,jpg}","images/*.jpg"])
  	.pipe(gulp.dest("dist/images"))
  	.pipe(connect.reload());
  })

  //一次性执行多个任务
  gulp.task("build",["copy-html",'images','script','index-script','data','scss'],function(){
  	console.log("编译完成，项目建立成功");
  })
 
 //编写监听
 gulp.task("watch",function(){
 	gulp.watch("*.html",['copy-html']);
 	gulp.watch(["*.json", "!package.json"], ['data']);
 	gulp.watch(["*.js", "!gulpfile.js"], ['script']);  
 	gulp.watch("stylesheet/index.scss", ['scss']);
 	gulp.watch(["*.{png,jpg}", "images/*.jpg"], ['images']);
 	gulp.watch("index.js", ['index-script']);
 })

 //启动服务
 
 const connect = require("gulp-connect");

 gulp.task("server",function(){
 	connect.server({
 		root: "dist",
 		port: 8888,
 		livereload: true
 	})
 })

 gulp.task("default",["watch", 'server']);