jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RnFlybuyPickup = {
    onPermissionChanged: jest.fn().mockResolvedValue(undefined),
  };
  return RN;
});

import * as FlyBuyPickup from '../index';

describe('Pickup', () => {
  it('onPermissionChanged returns a Promise', () => {
    expect(FlyBuyPickup.onPermissionChanged()).toBeInstanceOf(Promise);
  });
});
