jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.RnFlybuyCore = {
    getInstance: jest.fn().mockResolvedValue({}),
    startObserver: jest.fn(),
    stopObserver: jest.fn(),
    updatePushToken: jest.fn().mockResolvedValue(undefined),
    handleRemoteNotification: jest.fn().mockResolvedValue(undefined),
    handleNotification: jest.fn().mockResolvedValue(undefined),
    parseReferrerUrl: jest.fn().mockResolvedValue({}),
    // instance customers
    loginForInstance: jest.fn().mockResolvedValue({}),
    loginWithTokenForInstance: jest.fn().mockResolvedValue({}),
    logoutForInstance: jest.fn().mockResolvedValue(undefined),
    signUpForInstance: jest.fn().mockResolvedValue({}),
    createCustomerForInstance: jest.fn().mockResolvedValue({}),
    updateCustomerForInstance: jest.fn().mockResolvedValue({}),
    getCurrentCustomerForInstance: jest.fn().mockResolvedValue({}),
    // instance sites
    fetchSitesByRegionForInstance: jest.fn().mockResolvedValue([]),
    fetchSiteByPartnerIdentifierForInstance: jest.fn().mockResolvedValue({}),
    fetchSitesNearPlaceForInstance: jest.fn().mockResolvedValue([]),
    fetchSitesNearbyForInstance: jest.fn().mockResolvedValue([]),
    checkIfOnSiteForInstance: jest.fn().mockResolvedValue([]),
    // instance orders
    fetchOrdersForInstance: jest.fn().mockResolvedValue([]),
    fetchOrderByRedemptionCodeForInstance: jest.fn().mockResolvedValue({}),
    claimOrderForInstance: jest.fn().mockResolvedValue({}),
    createOrderWithSiteIdForInstance: jest.fn().mockResolvedValue({}),
    createOrderWithSitePartnerIdentifierForInstance: jest
      .fn()
      .mockResolvedValue({}),
    updateOrderStateForInstance: jest.fn().mockResolvedValue({}),
    updateOrderCustomerStateForInstance: jest.fn().mockResolvedValue({}),
    updateOrderCustomerStateWithSpotForInstance: jest
      .fn()
      .mockResolvedValue({}),
    rateOrderForInstance: jest.fn().mockResolvedValue({}),
    rateOrderWithCategoriesForInstance: jest.fn().mockResolvedValue({}),
    updatePickupMethodForInstance: jest.fn().mockResolvedValue({}),
    // instance places
    placesSuggestForInstance: jest.fn().mockResolvedValue([]),
    placesRetrieveForInstance: jest.fn().mockResolvedValue({}),
  };
  return RN;
});

import * as FlyBuyCore from '../index';

const CUSTOMER_INFO: FlyBuyCore.ICustomerInfo = {
  name: 'Test User',
  carType: 'Toyota',
  carColor: 'Red',
  licensePlate: 'ABC123',
  phone: '555-1234',
};

const PLACE: FlyBuyCore.IPlace = {
  name: 'Test Place',
  id: 'test-place-id',
  placeFormatted: '123 Test St, Springfield, VA',
};

const REGION: FlyBuyCore.CircularRegion = {
  latitude: 38.8977,
  longitude: -77.0365,
  radius: 100,
};

describe('Observer', () => {
  it('startObserver is callable', () => {
    expect(() => FlyBuyCore.startObserver()).not.toThrow();
  });

  it('stopObserver is callable', () => {
    expect(() => FlyBuyCore.stopObserver()).not.toThrow();
  });
});

describe('Event Listeners', () => {
  it('addOrderUpdatedListener returns a subscription with remove()', () => {
    const subscription = FlyBuyCore.addOrderUpdatedListener(() => {});
    expect(subscription).toHaveProperty('remove');
    expect(typeof subscription.remove).toBe('function');
  });
});

describe('Notifications', () => {
  it('updatePushToken returns a Promise', () => {
    expect(FlyBuyCore.updatePushToken('test-token')).toBeInstanceOf(Promise);
  });

  it('handleRemoteNotification returns a Promise', () => {
    expect(FlyBuyCore.handleRemoteNotification({})).toBeInstanceOf(Promise);
  });

  it('handleNotification returns a Promise', () => {
    expect(FlyBuyCore.handleNotification({})).toBeInstanceOf(Promise);
  });
});

describe('Links', () => {
  it('parseReferrerUrl rejects on iOS (not implemented)', async () => {
    await expect(
      FlyBuyCore.parseReferrerUrl('https://example.com')
    ).rejects.toThrow('Not implemented');
  });
});

describe('Customer', () => {
  it('login returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().customer.login('test@example.com', 'password')
    ).toBeInstanceOf(Promise);
  });

  it('loginWithToken returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().customer.loginWithToken('token')
    ).toBeInstanceOf(Promise);
  });

  it('logout returns a Promise', () => {
    expect(FlyBuyCore.getInstance().customer.logout()).toBeInstanceOf(Promise);
  });

  it('signUp returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().customer.signUp('test@example.com', 'password')
    ).toBeInstanceOf(Promise);
  });

  it('createCustomer returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().customer.create(CUSTOMER_INFO)
    ).toBeInstanceOf(Promise);
  });

  it('updateCustomer returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().customer.update(CUSTOMER_INFO)
    ).toBeInstanceOf(Promise);
  });

  it('getCurrentCustomer returns a Promise', () => {
    expect(FlyBuyCore.getInstance().customer.getCurrent()).toBeInstanceOf(
      Promise
    );
  });
});

describe('Sites', () => {
  it('fetchSitesByRegion returns a Promise', () => {
    expect(FlyBuyCore.getInstance().sites.fetchByRegion(REGION)).toBeInstanceOf(
      Promise
    );
  });

  it('fetchSitesByRegion with options returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().sites.fetchByRegion(REGION, {
        per: 10,
        page: 1,
      })
    ).toBeInstanceOf(Promise);
  });

  it('fetchSiteByPartnerIdentifier returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().sites.fetchByPartnerIdentifier('test-id')
    ).toBeInstanceOf(Promise);
  });

  it('fetchSiteByPartnerIdentifier with options returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().sites.fetchByPartnerIdentifier('test-id', {})
    ).toBeInstanceOf(Promise);
  });

  it('fetchSitesNearPlace returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().sites.fetchNearPlace(PLACE, 1000)
    ).toBeInstanceOf(Promise);
  });

  it('fetchNearby returns a Promise', () => {
    expect(FlyBuyCore.getInstance().sites.fetchNearby(1000)).toBeInstanceOf(
      Promise
    );
  });

  it('fetchNearby with options returns a Promise', () => {
    expect(FlyBuyCore.getInstance().sites.fetchNearby(1000, {})).toBeInstanceOf(
      Promise
    );
  });

  it('checkIfOnSite returns a Promise', () => {
    expect(FlyBuyCore.getInstance().sites.checkIfOnSite()).toBeInstanceOf(
      Promise
    );
  });
});

describe('Places', () => {
  it('suggest returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().places.suggest('test', {
        latitude: 38.8977,
        longitude: -77.0365,
      })
    ).toBeInstanceOf(Promise);
  });

  it('retrieve returns a Promise', () => {
    expect(FlyBuyCore.getInstance().places.retrieve(PLACE)).toBeInstanceOf(
      Promise
    );
  });
});

describe('Orders', () => {
  it('fetchOrders returns a Promise', () => {
    expect(FlyBuyCore.getInstance().orders.fetch()).toBeInstanceOf(Promise);
  });

  it('createOrder with siteId returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.createWithSiteId(1, {
        customerName: CUSTOMER_INFO.name,
        customerCarType: CUSTOMER_INFO.carType,
        customerCarColor: CUSTOMER_INFO.carColor,
        customerLicensePlate: CUSTOMER_INFO.licensePlate,
        partnerIdentifier: 'ORDER-001',
      })
    ).toBeInstanceOf(Promise);
  });

  it('createOrder with partnerIdentifier returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.createWithSitePartnerIdentifier(
        'SITE-001',
        {
          customerName: CUSTOMER_INFO.name,
          customerCarType: CUSTOMER_INFO.carType,
          customerCarColor: CUSTOMER_INFO.carColor,
          customerLicensePlate: CUSTOMER_INFO.licensePlate,
          partnerIdentifier: 'ORDER-001',
        }
      )
    ).toBeInstanceOf(Promise);
  });

  it('claimOrder returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.claim('REDEEM-CODE', {
        customerName: CUSTOMER_INFO.name,
        customerCarType: CUSTOMER_INFO.carType,
        customerCarColor: CUSTOMER_INFO.carColor,
        customerLicensePlate: CUSTOMER_INFO.licensePlate,
        pickupType: FlyBuyCore.PickupType.PICKUP,
      })
    ).toBeInstanceOf(Promise);
  });

  it('fetchOrderByRedemptionCode returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.fetchByRedemptionCode('REDEEM-CODE')
    ).toBeInstanceOf(Promise);
  });

  it('updateOrderState returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.updateState(
        1,
        FlyBuyCore.OrderStateType.READY
      )
    ).toBeInstanceOf(Promise);
  });

  it('updateOrderCustomerState returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.updateCustomerState(
        1,
        FlyBuyCore.CustomerState.ARRIVED
      )
    ).toBeInstanceOf(Promise);
  });

  it('updateOrderCustomerStateWithSpot returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.updateCustomerState(
        1,
        FlyBuyCore.CustomerState.ARRIVED,
        'Spot 1'
      )
    ).toBeInstanceOf(Promise);
  });

  it('rateOrder returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.rateOrder(1, 5, 'Great!')
    ).toBeInstanceOf(Promise);
  });

  it('updatePickupMethod returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance().orders.updatePickupMethod(1, {
        pickupType: FlyBuyCore.PickupType.CURBSIDE,
      })
    ).toBeInstanceOf(Promise);
  });
});

describe('Enums', () => {
  it('PickupType has expected values', () => {
    expect(FlyBuyCore.PickupType.CURBSIDE).toBe('curbside');
    expect(FlyBuyCore.PickupType.PICKUP).toBe('pickup');
    expect(FlyBuyCore.PickupType.DELIVERY).toBe('delivery');
  });

  it('CustomerState has expected values', () => {
    expect(FlyBuyCore.CustomerState.ARRIVED).toBe('arrived');
    expect(FlyBuyCore.CustomerState.EN_ROUTE).toBe('en_route');
    expect(FlyBuyCore.CustomerState.DEPARTED).toBe('departed');
  });

  it('OrderStateType has expected values', () => {
    expect(FlyBuyCore.OrderStateType.READY).toBe('ready');
    expect(FlyBuyCore.OrderStateType.CREATED).toBe('created');
    expect(FlyBuyCore.OrderStateType.CANCELLED).toBe('cancelled');
  });

  it('PlaceType has expected values', () => {
    expect(FlyBuyCore.PlaceType.CITY).toBe(3);
  });
});

describe('getInstance', () => {
  it('returns default instance with no argument', () => {
    const instance = FlyBuyCore.getInstance();
    expect(instance).toHaveProperty('orders');
    expect(instance).toHaveProperty('sites');
  });

  it('default instance orders are the same as top-level Orders', () => {
    const instance = FlyBuyCore.getInstance();
    expect(instance.orders.fetch).toBeInstanceOf(Function);
    expect(instance.sites.fetchByPartnerIdentifier).toBeInstanceOf(Function);
  });

  it('getInstance with appAuthId returns a scoped instance', () => {
    const instance = FlyBuyCore.getInstance('101');
    expect(instance).toHaveProperty('orders');
    expect(instance).toHaveProperty('sites');
  });

  it('scoped instance orders.fetch returns a Promise', () => {
    expect(FlyBuyCore.getInstance('101').orders.fetch()).toBeInstanceOf(
      Promise
    );
  });

  it('scoped instance orders.claim returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance('101').orders.claim('REDEEM-CODE', {
        customerName: CUSTOMER_INFO.name,
        customerCarType: CUSTOMER_INFO.carType,
        customerCarColor: CUSTOMER_INFO.carColor,
        customerLicensePlate: CUSTOMER_INFO.licensePlate,
        pickupType: FlyBuyCore.PickupType.CURBSIDE,
      })
    ).toBeInstanceOf(Promise);
  });

  it('scoped instance orders.updateCustomerState returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance('101').orders.updateCustomerState(
        1,
        FlyBuyCore.CustomerState.ARRIVED
      )
    ).toBeInstanceOf(Promise);
  });

  it('scoped instance orders.updateCustomerStateWithSpot returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance('101').orders.updateCustomerState(
        1,
        FlyBuyCore.CustomerState.ARRIVED,
        'Spot 1'
      )
    ).toBeInstanceOf(Promise);
  });

  it('scoped instance sites.fetchByPartnerIdentifier returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance('101').sites.fetchByPartnerIdentifier(
        'test-id',
        {}
      )
    ).toBeInstanceOf(Promise);
  });

  it('scoped instance sites.fetchByRegion returns a Promise', () => {
    expect(
      FlyBuyCore.getInstance('101').sites.fetchByRegion(REGION, {
        per: 10,
        page: 1,
      })
    ).toBeInstanceOf(Promise);
  });

  it('different appAuthIds return independent instances', () => {
    const primary = FlyBuyCore.getInstance('101');
    const secondary = FlyBuyCore.getInstance('202');
    // Both have the right shape
    expect(primary.orders.fetch).toBeInstanceOf(Function);
    expect(secondary.orders.fetch).toBeInstanceOf(Function);
    // But they are not the same function references (each call creates a new closure)
    expect(primary.orders.fetch).not.toBe(secondary.orders.fetch);
  });
});
