/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var plugin = 'bootstrap';
  System.config({
    paths: {
      // paths serve as alias
      'npm:':  '/scripts/'
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
      'rxjs':                      'npm:',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'angular2-modal': 'npm:angular2-modal/bundles/angular2-modal.umd.js',
      'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/bundles/angular2-modal.' + plugin + '.umd.js',
      'ng2-pagination': 'npm:ng2-pagination',
      'ng2-file-upload':'npm:ng2-file-upload',
      'ng2-datetime':'ng2-datetime'
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
      'ng2-pagination':{
         main: './index.js',
         defaultExtension: 'js'
    },
    'ng2-file-upload':{
         main: './index.js',
         defaultExtension: 'js'
    },
    'ng2-datetime':{
         main: './index.js',
         defaultExtension: 'js'
    }
  }
  });
})(this);
