'use strict';

var AppReloader = require('NativeModules').AppReloader;
var UserDefaults = require('react-native-userdefaults-ios');
var Chef = require('../Api/Chef');

/*
module.exports = (bundleUrl, bundlePath, moduleName, appName, urlParams) => {
  urlParams = urlParams ? urlParams : '{}';
  var params = JSON.parse(urlParams);

  UserDefaults.setObjectForKey(params, 'rnplayParams')
  .then(() => {
    console.log(bundleUrl);
    bundleUrl = 'http://192.168.255.230:32790/';
    bundlePath = 'index.ios.bundle';
    bundlePath += '?platform=ios';
    moduleName = 'EmployeeDirectory';
    appName = 'EmployeeDirectory';
    console.log(bundlePath);
    console.log(moduleName);
    console.log(appName);
    AppReloader.reloadAppWithURLString(bundleUrl + bundlePath,
                                       moduleName,
                                       appName);
  });
};
*/

module.exports = (user, app) => {
  var bundleUrlInRunner = 'http://localhost:8081/index.' + global.PLATFORM +
    '.bundle?platform=' + global.PLATFORM;
  var bundleUrl = Chef.url(app.runner['8081/tcp']) + '/index.' + global.PLATFORM +
    '.bundle?platform=' + global.PLATFORM;
  var params = {
    userId: user._id,
    courseId: app.rnapp._id,
    executable: app.rnapp.project.exec,
    localBundleUrl: bundleUrlInRunner
  };
  Chef.post(Chef.url(app.runner['3005/tcp'])+'/api/preview', params).then( (res) => {
    console.log(res);
    AppReloader.reloadAppWithURLString(bundleUrl,
                                       app.rnapp.module_name,
                                       app.rnapp.app_name);
  });
};
