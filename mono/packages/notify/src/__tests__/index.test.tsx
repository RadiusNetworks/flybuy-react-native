jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RnFlybuyNotify = {
    configure: jest.fn().mockResolvedValue(undefined),
    clearNotifications: jest.fn().mockResolvedValue(undefined),
    createForSitesInRegion: jest.fn().mockResolvedValue([]),
    sync: jest.fn().mockResolvedValue(undefined),
    onPermissionChanged: jest.fn(),
  };
  return RN;
});

import * as FlyBuyNotify from '../index';

describe('Notify', () => {
  it('configure returns a Promise', () => {
    expect(FlyBuyNotify.configure('bg-task-id')).toBeInstanceOf(Promise);
  });

  it('configure works without arguments', () => {
    expect(FlyBuyNotify.configure()).toBeInstanceOf(Promise);
  });

  it('clearNotifications returns a Promise', () => {
    expect(FlyBuyNotify.clearNotifications()).toBeInstanceOf(Promise);
  });

  it('createForSitesInRegion returns a Promise', () => {
    expect(
      FlyBuyNotify.createForSitesInRegion(
        { latitude: 38.8977, longitude: -77.0365, radius: 100 },
        { title: 'Test', message: 'Test message', data: {} }
      )
    ).toBeInstanceOf(Promise);
  });

  it('sync returns a Promise', () => {
    expect(FlyBuyNotify.sync(false)).toBeInstanceOf(Promise);
  });

  it('onPermissionChanged is callable', () => {
    expect(() => FlyBuyNotify.onPermissionChanged()).not.toThrow();
  });
});
