## React Native Playground Runner

Native app for iOS (and soon, Android), for running React Native apps from the [React Native
Playground](http://rnplay.org). This is also the app that powers the
in-browser simulators on the site.

![](https://raw.githubusercontent.com/rnplay/rnplay-ios/master/screenshot.png)

### Setup

- Clone the repo.
- `git checkout 319ea05325` (use react native 0.12, the one in master has dependencies issue)
- Run `npm install` in the project directory. (you may need to use sudo if there are errors)
- Run `pod install` (need to install cocapod first)

#### iOS
- Open the `RNPlayNative.xcodeproj` file in XCode.
- In build settings -> Search Paths -> Header Search Paths, remove all paths not in $SRCROOT
- Remove Google analytics from library path
- In General, Remove the last libRCRNPlay.a
- Set the XCode build target to a plugged-in device.
- Build the project for use on your phone.

#### Android
- Follow the instructions to [install the Android SDK & emulators](http://facebook.github.io/react-native/docs/android-setup.html).
- Open up your emulator/device. (`android avd`)
- Run `react-native run-android` in the root of the project to build the project, install on the emulator/device & start the packager.
- If using a device, follows [these instructions](http://facebook.github.io/react-native/docs/running-on-device-android.html).

### Usage

Just run the app and explore. To exit a running app, tap four times in the same spot.
