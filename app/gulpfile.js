const gulp = require("gulp");
const browserSync = require("browser-sync");
const exec = require('child_process').exec;

/**
 * browserSyncを最初に初期化しておきます。
 */
gulp.task("bs", () => {
  browserSync.init({
    server:{
      baseDir:["build/html"]
    }
  })
})

/**
 * browserSyncを利用して、画面を再描画します
 * build→reloadの順番で実行する想定です。
 */
gulp.task('reload', () => {
  return browserSync.reload();
})

/**
 * sphinxの make html を実行します。
 */
gulp.task('build', (callback) => {
  exec("make html", (err,stdout,stderr) => {
    console.log(stdout)
    callback(err)
  })
})

/**
 * watchが走ってる状態でreloadが呼ばれる
 * →watchが消えたので、ここでもwatchを実行しています。なんか間違ってそうだけど動いてます。
 */
gulp.task('watch', () => {
  gulp.watch("source/**/*.rst", gulp.series('build',gulp.parallel('reload','watch')))
})

/**
 * 最初に呼ばれる処理です。
 * seriesは直列処理
 * parallelは並列処理
 */
gulp.task('default', gulp.series('build',gulp.parallel('bs','watch')))