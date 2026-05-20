module.exports = {
  PERMISSIONS: {
    ANDROID: {
      ACCESS_BACKGROUND_LOCATION:
        'android.permission.ACCESS_BACKGROUND_LOCATION',
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
    IOS: {
      LOCATION_ALWAYS: 'ios.permission.LOCATION_ALWAYS',
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    },
  },
  RESULTS: {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    GRANTED: 'granted',
    BLOCKED: 'blocked',
  },
  check: jest.fn().mockResolvedValue('granted'),
  request: jest.fn().mockResolvedValue('granted'),
  requestMultiple: jest.fn().mockResolvedValue({}),
  requestNotifications: jest
    .fn()
    .mockResolvedValue({status: 'granted', settings: {}}),
  checkMultiple: jest.fn().mockResolvedValue({}),
  openSettings: jest.fn().mockResolvedValue(undefined),
};
