'use strict';

var AppReloader = require('NativeModules').AppReloader;
var UserDefaults = require('react-native-userdefaults-ios');

module.exports = (bundleUrl, bundlePath, moduleName, appName, urlParams) => {
  urlParams = urlParams ? urlParams : '{}';
  var params = JSON.parse(urlParams);

  UserDefaults.setObjectForKey(params, 'rnplayParams')
  .then(() => {
    console.log(bundleUrl);
    bundleUrl = 'http://192.168.255.230:32768/';
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
