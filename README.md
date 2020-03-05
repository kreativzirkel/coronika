# Coronika App

## Fonts

Rename font files according to their PostScript name (e.g. `JetBrainsMono-Regular`) and copy them to a folder inside the project (e.g. `./src/assets/fonts/`).
Add `assets: ['./src/assets/fonts/']` to `react-native.config.js`. 
Run `react-native link` to add the fonts to the app resources.

## App Icons
Automatic generation using react-native-make.

`npm i -D @bam.tech/react-native-make`

`react-native set-icon --platform ios --path ./src/assets/images/app_icon.png`

`react-native set-icon --platform android --path ./src/assets/images/app_icon.png`

## Splash Screen

`react-native set-splash --path ./src/assets/images/splash_screen.png --resize cover --background "#17d9bd"`
