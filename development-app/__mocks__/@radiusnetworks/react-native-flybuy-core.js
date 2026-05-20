const { check } = require("../react-native-permissions");

const mock = {
  PlaceType: {
    CITY: 3,
  },
  PickupType: {
    PICKUP: 'pickup',
    CURBSIDE: 'curbside',
    DELIVERY: 'delivery',
  },
  addOrderUpdatedListener: jest.fn().mockReturnValue({remove: jest.fn()}),
  startObserver: jest.fn(),
  stopObserver: jest.fn(),
  updatePushToken: jest.fn().mockResolvedValue(undefined),
  handleRemoteNotification: jest.fn().mockResolvedValue(undefined),
  handleNotification: jest.fn().mockResolvedValue(undefined),
  parseReferrerUrl: jest.fn().mockResolvedValue({}),
  customer: {
    login: jest.fn().mockResolvedValue({}),
    loginWithToken: jest.fn().mockResolvedValue({}),
    logout: jest.fn().mockResolvedValue(undefined),
    signUp: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    getCurrent: jest.fn().mockResolvedValue({}),
  },
  orders: {
    fetch: jest.fn().mockResolvedValue([]),
    createWithSiteId: jest.fn().mockResolvedValue({}),
    createWithSitePartnerIdentifier: jest.fn().mockResolvedValue({}),
    claim: jest.fn().mockResolvedValue({}),
    fetchByRedemptionCode: jest.fn().mockResolvedValue({}),
    updateState: jest.fn().mockResolvedValue({}),
    updateCustomerState: jest.fn().mockResolvedValue({}),
    rateOrder: jest.fn().mockResolvedValue({}),
    updatePickupMethod: jest.fn().mockResolvedValue({}),
  },
  sites: {
    fetchByRegion: jest.fn().mockResolvedValue([]),
    fetchByPartnerIdentifier: jest.fn().mockResolvedValue({}),
    fetchNearPlace: jest.fn().mockResolvedValue([]),
    fetchNearby: jest.fn().mockResolvedValue([]),
    checkIfOnSite: jest.fn().mockResolvedValue({}),
  },
  places: {
    suggest: jest.fn().mockResolvedValue([]),
    retrieve: jest.fn().mockResolvedValue({}),
  },
};

mock.getInstance = jest.fn(() => ({
  ...mock,
}));

module.exports = mock;
