/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var plugin = 'bootstrap';
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '/scripts/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:core.umd.js',
      '@angular/common': 'npm:common.umd.js',
      '@angular/compiler': 'npm:compiler.umd.js',
      '@angular/platform-browser': 'npm:platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:http.umd.js',
      '@angular/router': 'npm:router.umd.js',
      '@angular/forms': 'npm:forms.umd.js',
      // other libraries
      'rxjs': 'npm:',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',

      'ng2-charts': 'npm:ng2-charts',
      'ng2-charts' : 'npm:ng2-charts',
      'angular2-modal': 'npm:angular2-modal/bundles/angular2-modal.umd.js',
      'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/bundles/angular2-modal.' + plugin + '.umd.js',
      'ng2-pagination': 'npm:ng2-pagination',
      'angular2-tag-input': 'npm:angular2-tag-input/dist/angular2-tag-input.bundle.js',
      'ng2-tag-input': 'npm:ng2-tag-input/dist/ng2-tag-input.bundle.js',
      'socket.io-client': "npm:socket.io-client/socket.io.js"
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-pagination': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'angular2-tag-input': {
        // main: './dist/index.js',
        defaultExtension: 'js'
      },
      'ng2-tag-input': {
        defaultExtension: 'js'
      },
      'socket.io-client': {
        defaultExtension: 'js'
      }
    }
  });
})(this);
