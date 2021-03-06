"use strict";

// Подключение зависимостей
var gulp = require("gulp"); //GULP
var sass = require("gulp-sass"); //Преобразование файлов SCSS в CSS
var plumber = require("gulp-plumber"); //Обработчик ошибок (не останавливает работу сборщика)
var postcss = require("gulp-postcss"); //PostCSS
var autoprefixer = require("autoprefixer"); //Автопрефексер
var server = require("browser-sync").create(); //
var csso = require("gulp-csso"); //Минификация CSS
var rename = require("gulp-rename"); //Переименование файлов
var imagemin = require("gulp-imagemin"); //Оптимизация изображений
var webp = require("gulp-webp"); //Конвертация изображений в WebP
var sprite = require("gulp-svgstore"); //Сборка SVG-спрайтов
var posthtml = require("gulp-posthtml"); //PostHTML
var include = require("posthtml-include"); //Преобразование тега include в SVG код в HTML
var del = require("del"); //Удаление файлов (очистка папки)
var htmlmin = require("gulp-htmlmin"); //Минификация HTML
var jsmin = require("gulp-uglify"); //Минификация JS


// Преобразование стилей из SCSS в CSS, автопрефексер, минификация
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss") //Выбор файла для обработки
    .pipe(plumber()) // Продолжает обработку файлов, если встретит ошибку и указывает в консоли на ошибку
    .pipe(sass()) //Преобразование из SCSS в CSS
    .pipe(postcss([ //Подключение PostCSS
      autoprefixer() //Автопрефексер входящий в PostCSS
    ]))
    .pipe(gulp.dest("build/css")) //Запись результата в папку CSS файла style.css
    .pipe(csso()) //Минификация стилевого файла style.css
    .pipe(rename("style.min.css")) //Переименование минифицированного style.css в style.min.css
    .pipe(gulp.dest("build/css")) //Запись style.min.css в папку CSS (Итог 2 файла со сттилями: обычный и минифицированный)
    .pipe(server.stream());
});

// Минификация HTML
gulp.task("minify", function () {
  return gulp.src("build/*.html") //Выбор всех HTML файлов для обработки
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build")); //запись результатов в папку build
  });

// Минификация JavaScript
gulp.task("jsmini", function () {
  return gulp.src("source/js/script.js") //Выбор файла script.js для обработки
    .pipe(jsmin())
    .pipe(rename("script.min.js")) //Переименование результирующего файла в script.min.js
    .pipe(gulp.dest("build/js")); //Запись результата в паку build
});

// Оптимизация изображений
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}") //Выбор всех файлов для обработки с расширениями png, jpg, svg
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}), //Оптимизация изображений png с количеством проходов 16 (3 = 16 проходам)
      imagemin.jpegtran({progressive: true}), //Оптимизация изображений jpg (преобразование в прогрессивный jpg)
      imagemin.svgo() //Оптимизация SVG
    ]))
    .pipe(gulp.dest("source/img")) //Запись результатов в папку img
})

// Конвертация изображений в WebP
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}") //Выброр всех изображений для обработки с расширениеями png и jpg
    .pipe(webp({quality: 80})) //Конвертация выбранных изображений в формат WebP с качеством 80%
    .pipe(gulp.dest("source/img")); //Запись результатов в папку img
})

// Сборка спрайта SVG
gulp.task("sprite", function () {
  return gulp.src("source/img/sprite-*.svg") //Выбор изображений SVG содержащих icon- в начале
    .pipe(sprite({
      inLineSvg: true  //параметр указывающий на то что спрайт будет встраиваться инлайново в HTML файл
    }))
    .pipe(rename("svg-sprite.svg")) //Файл будет переименован в sprite.svg
    .pipe(gulp.dest("build/img")); //Запись результатов в папку img
})

// Преобразование в HTML файлах тега include для вставки SVG
gulp.task("html", function () {
  return gulp.src("source/*.html") //Выбор всех HTML файлов для преобразования
    .pipe(posthtml([
      include() //Преобразование тега include в спрайт SVG
    ]))
    .pipe(gulp.dest("build")); //Запись результатов в папку source
})

//Удаляет папку build для последуещего создания новой версии
gulp.task("clean", function () {
  return del("build"); //Удаляет папку build
});

// Запуск копирования необходимого содержимого содержимого в папку build
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}", //Вибирает для копирования шрифты с указанным форматом
    "source/img/**", //Вибирает для копирования все изображения в папке img
    "source/js/*.min.js" //Вибирает для копирования все JS файлы с min.js в названии, в папке js
  ], {
    base: "source" //Базовая папка, указывается для того что бы при копировании сохранить внутреннию систему папок
  })
  .pipe(gulp.dest("build")); //Копирование всего перечисленного в папку build
});

// Перезапуск сервера (обноввление страницы при изменениях в коде)
gulp.task("reload", function (done) {
  server.reload();
  done();
});

// Запуск локальног сервера
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/sprite-*.svg", gulp.series("sprite", "html", "reload"));
  gulp.watch("source/js/*.js", gulp.series("jsmini", "reload"));
  gulp.watch("source/*.html", gulp.series("html", "minify", "reload"));
});

// Сборка CSS, SVG-спрайтов, вставка SVG в include HTML
gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html", "minify", "jsmini"));

// Сборка CSS из SCSS и запуск локального сервера
gulp.task("start", gulp.series("build", "server"));
