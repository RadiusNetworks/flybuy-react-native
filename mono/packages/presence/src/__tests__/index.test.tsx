jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RnFlybuyPresence = {
    startLocatorWithIdentifier: jest.fn().mockResolvedValue('started'),
    stopLocator: jest.fn().mockResolvedValue('stopped'),
  };
  return RN;
});

import * as FlyBuyPresence from '../index';

describe('Presence', () => {
  it('startLocatorWithIdentifier returns a Promise', () => {
    expect(
      FlyBuyPresence.startLocatorWithIdentifier('locator-id', 'payload')
    ).toBeInstanceOf(Promise);
  });

  it('stopLocator returns a Promise', () => {
    expect(FlyBuyPresence.stopLocator()).toBeInstanceOf(Promise);
  });
});
