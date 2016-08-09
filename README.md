# Business Directory Ionic
This application categorizes businesses into their business/industry domain and provides a listing. Presents information about each business promoting their activity and includes various search filters enabling the easier finding of the business which the user is interested in.

## Dependecies, Run and Build

### Install NodeJS dependencies

Run `npm install` to install all needed dependencies.

### Install Plugins and Javascript dependencies
#### Linux/MacOX
Run `./install.sh` to install all needed plugins and dependencies

#### Windows Users
Similarly, Windows users should run `install.bat`.

### Run the app
Use `grunt serve -l` to run the app in browser and watch for changes in code

or

use `grunt serve` to just run the app for a browser preview

or

use `grunt serve --lab` to run the app in a browser on two platforms at the same time.

### Add a platform

```bash
$ grunt platform:add:<platform>
```

Supported Cordova platforms:

```bash
$ grunt platform:add:ios
$ grunt platform:add:android
```

### Build the app

```bash
$ grunt build
```

### Εmulate the app on simulator
iOS:

```bash
$ grunt emulate:ios
```

Android:

```bash
$ grunt emulate:android
```

For more information, see [Ionic Framework Generator's instructions](https://github.com/diegonetto/generator-ionic).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

#### Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security.
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes.
* **ionic-plugin-keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **com.phonegap.plugins.PushPlugin** - This plugin is for use with Cordova, and allows your application to receive push notifications on Amazon Fire OS, Android, iOS, Windows Phone and Windows8 devices (https://github.com/phonegap-build/PushPlugin.git).
* **de.appplant.cordova.plugin.email-composer@0.8.2** - The plugin provides access to the standard interface that manages the editing and sending an email message (https://github.com/katzer/cordova-plugin-email-composer.git).
* **nl.x-services.plugins.socialsharing** - Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git).

## Demo
Install [Ionic View](http://view.ionic.io/) and preview the app on your mobile device using the following Ionic View ID: `E1F02EDD`

## Documentation
* [Business Directory Quick Start Guide](https://docs.google.com/document/d/1GLfwfzz6ip2pCkKbtB0tdwWkyIVIn6lXgDTDWnvjivw/edit?usp=sharing)

## Changelog
```
1.9 - June 15, 2016
- Fix of business details and contact us screens failure in case that open hours are not defined
- Fix of typo of products collection name

1.8 - May 26, 2016
- Addition of a full working Push notification example

1.7 - May 16, 2016
- Improved data structure, changed "categories" structure for Firebase data.

1.6 - May 05, 2016
- Ionic update to v1.3.0
- Fix on showing a pin and setting the destination on Android's maps app
- Fix of the ionic keyboard plugin id

1.5 - March 24, 2016
- New feature: Users ratings

1.4 - March 18, 2016
- New feature: Users read and write reviews

1.3 - March 10, 2016
- Addition of ten new color themes

1.2 - March 03, 2016
- Connection with Firebase as a backend. Additional option to use Firebase as a data provider.
- Fix of "Add to favorites" button
- SASS support added
- Improvement of the time the loading indicator stays active

1.1 - February 09, 2016
- Ionic update to v1.2.4 as Ionic 1.2 uses native scrolling by default.
- Ionic CLI update to v1.7.13
- Addition of task in Gruntfile to minify and obfuscate CSS, HTML and Javascript files

1.0 - January 29, 2016
- Initial Release
```

## Credits

* [Yeoman](http://yeoman.io/)
* [Yeoman's Ionic Framework generator](https://github.com/diegonetto/generator-ionic)

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
