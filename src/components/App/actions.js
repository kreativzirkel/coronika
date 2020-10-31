export const setColorScheme = (colorScheme) => ({ type: 'SET_COLOR_SCHEME_APP', colorScheme });

export const setScreenDimensions = (screenHeight, screenWidth) => ({
  type: 'SET_SCREEN_DIMENSIONS_APP',
  screenHeight,
  screenWidth,
});
