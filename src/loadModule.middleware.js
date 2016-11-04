"use strict";
var express = require('express');
var path = require('path');
var angularModule = [
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'core', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'common', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'compiler', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'platform-browser', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'platform-browser-dynamic', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'http', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'router', 'bundles')),
    express.static(path.join(__dirname, '..', 'node_modules', '@angular', 'forms', 'bundles'))
];
exports.angularModule = angularModule;
var javaScripts = [
    express.static(path.join(__dirname, '..', 'node_modules', 'core-js', 'client')),
    express.static(path.join(__dirname, '..', 'node_modules', 'zone.js', 'dist')),
    express.static(path.join(__dirname, '..', 'node_modules', 'reflect-metadata')),
    express.static(path.join(__dirname, '..', 'node_modules', 'systemjs', 'dist')),
    express.static(path.join(__dirname, 'client', 'app', 'assets')),
    express.static(path.join(__dirname))
];
exports.javaScripts = javaScripts;
var htmlFiles = [
    express.static(path.join(__dirname, 'client', 'app'))
];
exports.htmlFiles = htmlFiles;
var cssFiles = [
    express.static(path.join(__dirname, 'client', 'app', 'assets'))
];
exports.cssFiles = cssFiles;
var othersLib = [
    express.static(path.join(__dirname, '..', 'node_modules', 'rxjs'))
];
exports.othersLib = othersLib;
