module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
