jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RnFlybuyLivestatus = {
    configure: jest.fn().mockResolvedValue('configured'),
  };
  return RN;
});

import * as FlyBuyLivestatus from '../index';

describe('LiveStatus', () => {
  it('configure returns a Promise', () => {
    expect(FlyBuyLivestatus.configure('icon-name')).toBeInstanceOf(Promise);
  });

  it('configure accepts optional color arguments', () => {
    expect(
      FlyBuyLivestatus.configure('icon-name', '#A162F7', '#00E5C8')
    ).toBeInstanceOf(Promise);
  });

  it('configureWithOptions returns a Promise', () => {
    expect(FlyBuyLivestatus.configureWithOptions('icon-name')).toBeInstanceOf(
      Promise
    );
  });

  it('configureWithOptions is marked deprecated but still callable', () => {
    expect(
      FlyBuyLivestatus.configureWithOptions('icon-name', '#A162F7', '#00E5C8')
    ).toBeInstanceOf(Promise);
  });
});
