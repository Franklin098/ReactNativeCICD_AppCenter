# ReactNativeCICD_AppCenter

ReactNative App for Testing AppCenter & GitHub CI/CD Features

iOS: [![Build status](https://build.appcenter.ms/v0.1/apps/9f78b1cc-3980-45e3-a99f-30bdbc8d5cc6/branches/dev/badge)](https://appcenter.ms)

Android: [![Build status](https://build.appcenter.ms/v0.1/apps/5e912b08-118e-4c74-99b1-785bb7ac14d4/branches/dev/badge)](https://appcenter.ms)

# Running UI Tests on Real Devices

```
npm i -S appcenter


npx appcenter login
```

## Android UI Tests with Expresso

Record and create the tests using Android Studio.

Go to example :

>  android/app/src/androidTest/java/com/reactnativecicd/MainActivityTest.java

Then execute the following commands:

```
cd android

./gradlew assembleRelease

./gradlew assembleAndroidTest

npx appcenter test run espresso --app "Franklin-Organization/ReactNativeCICD_AppCenter" --devices "Franklin-Organization/androiddeviceset1" --app-path "app/build/outputs/apk/release/app-release.apk" --test-series "test-series" --locale "en_US" --build-dir "app/build/outputs/apk/androidTest/debug"
```

## iOS UI Tests

Record and create the tests usign XCode

Go to example :

>  ios/ReactNativeCICDUITests/ReactNativeCICDUITests.m

```
cd ios
```

Go to XCode and configure:

![](/images/ios/iosTest1.png)

![](/images/ios/iosTest2.png)

![](/images/ios/iosTest3.png)

![](/images/ios/iosTest4.png)


Then run :

```
cd ios

# look at the Targets and Build Configurations
xcrun xcodebuild -list

# clean, build for testing and select configuration

xcrun xcodebuild clean build-for-testing -configuration Release -workspace  ReactNativeCICD.xcworkspace -sdk iphoneos -scheme ReactNativeCICD -derivedDataPath DerivedData

appcenter test run xcuitest --app "Franklin-Organization/ReactNativeCICD_AppCenter-1" --devices "Franklin-Organization/iosdeviceset1" --test-series "iostestseries1" --locale "en_US" --build-dir DerivedData/Build/Products/Release-iphoneos
```