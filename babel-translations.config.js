module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module:babel-gettext-extractor',
      {
        baseDirectory: process.cwd(),
        fileName: 'src/assets/translations/template.pot',
        functionNames: {
          __: ['msgid'],
        },
        headers: {
          'content-type': 'text/plain; charset=UTF-8',
        },
      },
    ],
  ],
};
