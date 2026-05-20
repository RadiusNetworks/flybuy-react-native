const path = require('path');

/**
 * Point codegen to mono packages so RNRnFlybuy*Spec.h are generated during pod install.
 * Without this, "file:" deps are not always discovered and RNRnFlybuyCoreSpec.h is missing.
 */
module.exports = {
  dependencies: {
    '@radiusnetworks/react-native-flybuy-core': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'core'),
    },
    '@radiusnetworks/react-native-flybuy-livestatus': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'livestatus'),
    },
    '@radiusnetworks/react-native-flybuy-notify': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'notify'),
    },
    '@radiusnetworks/react-native-flybuy-pickup': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'pickup'),
    },
    '@radiusnetworks/react-native-flybuy-presence': {
      root: path.join(__dirname, '..', 'mono', 'packages', 'presence'),
    },
  },
};
