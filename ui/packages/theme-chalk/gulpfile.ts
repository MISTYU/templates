import { series, src, dest } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer'
import gulpCleanCss from 'gulp-clean-css'
import { projectRoot } from '../../build/utils/path'
import chalk from 'chalk'
import consola from 'consola'

function compile () {
  const sass = gulpSass(dartSass)
  return src('./src/**/*.scss')
    .pipe(sass.sync())
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(gulpCleanCss({}, (details) => {
      consola.success(
        `${chalk.cyan(details.name)}: ${chalk.yellow(
          details.stats.originalSize / 1000
        )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
      )
    }))
    .pipe(dest('./dist'))
}

function copyFont () {
  return src('./src/fonts/**')
    .pipe(gulpCleanCss())
    .pipe(dest('./dist/fonts'))
}

function copyFullStyle() {
  return src('./dist/**')
    .pipe(dest(projectRoot + '/dist/theme-chalk'))
}

export default series(
  compile,
  copyFont,
  copyFullStyle
)
