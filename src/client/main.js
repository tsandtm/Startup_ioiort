"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app/app.module');
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(app_module_1.AppModule).then(function (result) {
    console.log('Boot Strap success');
})
    .catch(function (error) {
    console.error(error.message);
});
