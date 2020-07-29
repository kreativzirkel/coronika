# Development

## Setup
TBD

## Fonts
Rename font files according to their PostScript name (e.g. `JetBrainsMono-Regular`) and copy them to a folder inside the project (e.g. `./src/assets/fonts/`).
Add `assets: ['./src/assets/fonts/']` to `react-native.config.js`.
Run `react-native link` to add the fonts to the app resources.

## App Icons
Automatic generation using react-native-make.

### iOS
`react-native set-icon --platform ios --path ./src/assets/images/app_icon.png`

### Android
Use Android Studio to create app icon. `Right click on app -> New -> Image Asset`

## Splash Screen
Automatic generation using react-native-make.

`react-native set-splash --path ./src/assets/images/splash_screen.png --resize cover --background "#17d9bd"`

## Platform specific steps

### Android
Link necessary packages:

`react-native link lottie-ios`

`react-native link lottie-react-native`

`react-native link react-native-fs`

`react-native link react-native-interactable`

`react-native link react-native-push-notification`

`react-native link react-native-safe-area-context`

`react-native link react-native-screens`

`react-native link react-native-splash-screen`

### iOS
`cd ios && pod install`

## Build

### Update version number
Update version in `package.json` and run `increase-build-number` to update all necessary files.

## Translations
Download translations from Google sheet with three columns: location (empty), source (identifier), target (translation).
Wrap column headlines with `"`. Use `csv2po` for conversion.

Run `csv2po -i input.csv -o output.po` to create PO-file. Replace header section with existing PO-file of this language.
Copy new PO-file to the translation folder.

Run `npm run generate-translation-files` to generate JSON-files.
