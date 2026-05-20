module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    'react-native-permissions':
      '<rootDir>/__mocks__/react-native-permissions.js',
    '@radiusnetworks/react-native-flybuy-core':
      '<rootDir>/__mocks__/@radiusnetworks/react-native-flybuy-core.js',
    '@radiusnetworks/react-native-flybuy-notify':
      '<rootDir>/__mocks__/@radiusnetworks/react-native-flybuy-notify.js',
    '@radiusnetworks/react-native-flybuy-pickup':
      '<rootDir>/__mocks__/@radiusnetworks/react-native-flybuy-pickup.js',
    '@radiusnetworks/react-native-flybuy-presence':
      '<rootDir>/__mocks__/@radiusnetworks/react-native-flybuy-presence.js',
    '@radiusnetworks/react-native-flybuy-livestatus':
      '<rootDir>/__mocks__/@radiusnetworks/react-native-flybuy-livestatus.js',
  },
};
