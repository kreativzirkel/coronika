module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    ['@wordpress/babel-plugin-makepot', { output: 'src/assets/translations/template.pot' }],
  ],
};
