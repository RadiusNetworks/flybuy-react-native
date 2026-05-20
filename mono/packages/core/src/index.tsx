import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import type {
  CircularRegion,
  ICustomer,
  ICustomerInfo,
  IOnSiteResult,
  IOrder,
  IPlace,
  ISite,
  LinkDetails,
  OrderOptions,
  PickupMethodOptions,
  PlaceSuggestionOptions,
  SiteOptions,
} from './types';

export * from './types';

const LINKING_ERROR =
  `The package '@radiusnetworks/react-native-flybuy-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyCoreModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyCore').default
  : NativeModules.RnFlybuyCore;

const RnFlybuyCore = RnFlybuyCoreModule
  ? RnFlybuyCoreModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Returns the native module used for event emitter (orderUpdated, etc.).
 * On iOS, NativeEventEmitter requires a non-null module with addListener; the TurboModule
 * proxy does not qualify, so we only use NativeModules.RnFlybuyCore (bridge module).
 */
function getRnFlybuyCoreEventEmitterModule():
  | (typeof NativeModules)['RnFlybuyCore']
  | null {
  const bridgeModule = NativeModules.RnFlybuyCore;
  // Only use module that has addListener (required by NativeEventEmitter on iOS).
  if (
    bridgeModule != null &&
    typeof (bridgeModule as { addListener?: unknown }).addListener ===
      'function'
  ) {
    return bridgeModule;
  }
  return null;
}

/**
 * Subscribe to order updated events. Works in both bridge and TurboModule mode.
 * When only TurboModule is available (e.g. New Arch), returns a no-op subscription
 * so callers never pass null to NativeEventEmitter (which throws on iOS).
 * @param callback - Called when an order is updated.
 * @returns Subscription with remove() to unsubscribe.
 */
export function addOrderUpdatedListener(callback: (event: IOrder) => void): {
  remove: () => void;
} {
  const nativeModule = getRnFlybuyCoreEventEmitterModule();
  if (nativeModule == null) {
    if (__DEV__) {
      console.warn(
        '[@radiusnetworks/react-native-flybuy-core] addOrderUpdatedListener: native event emitter not available (e.g. TurboModule-only), order events will not be received.'
      );
    }
    return { remove: () => {} };
  }
  const eventEmitter = new NativeEventEmitter(nativeModule);
  const subscription = eventEmitter.addListener(
    'orderUpdated',
    (event: IOrder) => callback(event)
  );
  return {
    remove: () => subscription.remove(),
  };
}

// Core functions

export function startObserver(): void {
  return RnFlybuyCore.startObserver();
}

export function stopObserver(): void {
  return RnFlybuyCore.stopObserver();
}

export function updatePushToken(token: string): Promise<void> {
  return RnFlybuyCore.updatePushToken(token);
}

export function handleRemoteNotification(data: any): Promise<void> {
  return RnFlybuyCore.handleRemoteNotification(data);
}

/**
 * Handles a notification response (for notification tap events).
 * @param data - The notification response data (platform-specific).
 * @returns Promise<any> - The metadata or null if not handled.
 */
export function handleNotification(data: any): Promise<any> {
  return RnFlybuyCore.handleNotification(data);
}

export function parseReferrerUrl(referrerUrl: string): Promise<LinkDetails> {
  if (Platform.OS === 'ios') {
    return new Promise((_, reject) => {
      reject(new Error('Not implemented'));
    });
  }
  return RnFlybuyCore.parseReferrerUrl(referrerUrl);
}

type ILinks = {
  parseReferrerUrl(referrerUrl: string): Promise<LinkDetails>;
};

type ICustomers = {
  loginWithToken(code: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  signUp(email: string, password: string): Promise<any>;
  create(customerInfo: ICustomerInfo): Promise<ICustomer>;
  update(customerInfo: ICustomerInfo): Promise<ICustomer>;
  getCurrent(): Promise<ICustomer>;
};

export const Links: ILinks = {
  parseReferrerUrl,
};

type IPlaces = {
  suggest(keyword: string, options: PlaceSuggestionOptions): Promise<IPlace[]>;
  retrieve(place: IPlace): Promise<IPlace>;
};

type ISites = {
  fetchByRegion(
    region: CircularRegion,
    siteOptions?: SiteOptions | null
  ): Promise<ISite[]>;
  fetchByPartnerIdentifier(
    partnerIdentifier: string,
    siteOptions?: SiteOptions | null
  ): Promise<ISite>;
  fetchNearPlace(place: IPlace, distance: number): Promise<ISite[]>;
  fetchNearby(
    distance: number,
    siteOptions?: SiteOptions | null
  ): Promise<ISite[]>;
  checkIfOnSite(): Promise<IOnSiteResult>;
};

type IOrders = {
  fetch(): Promise<IOrder[]>;
  createWithSiteId(siteId: number, orderOptions: OrderOptions): Promise<IOrder>;
  createWithSitePartnerIdentifier(
    sitePartnerIdentifier: string,
    orderOptions: OrderOptions
  ): Promise<IOrder>;
  claim(redeemCode: string, orderOptions: OrderOptions): Promise<IOrder>;
  fetchByRedemptionCode(redeemCode: string): Promise<IOrder>;
  updateState(orderId: number, state: string): Promise<IOrder>;
  updateCustomerState(
    orderId: number,
    customerState: string,
    spotIdentifier?: string | null
  ): Promise<IOrder>;
  rateOrder(
    orderId: number,
    rating: number,
    comments: string,
    categories?: string[] | null
  ): Promise<IOrder>;
  updatePickupMethod(
    orderId: number,
    options: PickupMethodOptions
  ): Promise<IOrder>;
};

// Multi-project support

export type Instance = {
  customer: ICustomers;
  orders: IOrders;
  sites: ISites;
  places: IPlaces;
};

/**
 * Returns a scoped accessor for a FlyBuy instance associated with the given appAuthId.
 * If no AppAuthId is provided, the FlyBuy instance associated with the primary project is returned.
 *
 * Usage:
 *   ```
 *   FlyBuyCore.getInstance().sites.fetchAllSites()            // primary instance
 *   FlyBuyCore.getInstance("139").sites.fetchAllSites()       // instance associated with appAuthId 139
 *   ```
 */
export function getInstance(appAuthId: string | null = null): Instance {
  const id = appAuthId ?? null;
  return {
    customer: {
      login: (email, password) =>
        RnFlybuyCore.loginForInstance(id, email, password),
      loginWithToken: (token) =>
        RnFlybuyCore.loginWithTokenForInstance(id, token),
      logout: () => RnFlybuyCore.logoutForInstance(id),
      signUp: (email, password) =>
        RnFlybuyCore.signUpForInstance(id, email, password),
      create: (customerInfo) =>
        RnFlybuyCore.createCustomerForInstance(id, customerInfo),
      update: (customerInfo) =>
        RnFlybuyCore.updateCustomerForInstance(id, customerInfo),
      getCurrent: () => RnFlybuyCore.getCurrentCustomerForInstance(id),
    },
    sites: {
      fetchByRegion: (region, siteOptions = null) =>
        RnFlybuyCore.fetchSitesByRegionForInstance(
          id,
          region,
          siteOptions ?? {}
        ),
      fetchByPartnerIdentifier: (partnerIdentifier, siteOptions = null) =>
        RnFlybuyCore.fetchSiteByPartnerIdentifierForInstance(
          id,
          partnerIdentifier,
          siteOptions ?? {}
        ),
      fetchNearPlace: (place, distance) =>
        RnFlybuyCore.fetchSitesNearPlaceForInstance(id, place, distance),
      fetchNearby: (distance, siteOptions = null) =>
        RnFlybuyCore.fetchSitesNearbyForInstance(
          id,
          distance,
          siteOptions ?? {}
        ),
      checkIfOnSite: () => RnFlybuyCore.checkIfOnSiteForInstance(id),
    },
    orders: {
      fetch: () => RnFlybuyCore.fetchOrdersForInstance(id),
      createWithSiteId: (siteId, orderOptions) =>
        RnFlybuyCore.createOrderWithSiteIdForInstance(id, siteId, orderOptions),
      createWithSitePartnerIdentifier: (sitePartnerIdentifier, orderOptions) =>
        RnFlybuyCore.createOrderWithSitePartnerIdentifierForInstance(
          id,
          sitePartnerIdentifier,
          orderOptions
        ),
      claim: (redeemCode, orderOptions) =>
        RnFlybuyCore.claimOrderForInstance(id, redeemCode, orderOptions),
      fetchByRedemptionCode: (redeemCode) =>
        RnFlybuyCore.fetchOrderByRedemptionCodeForInstance(id, redeemCode),
      updateState: (orderId, state) =>
        RnFlybuyCore.updateOrderStateForInstance(id, orderId, state),
      updateCustomerState: (orderId, customerState, spotIdentifier = null) =>
        spotIdentifier && spotIdentifier != null
          ? RnFlybuyCore.updateOrderCustomerStateWithSpotForInstance(
              id,
              orderId,
              customerState,
              spotIdentifier
            )
          : RnFlybuyCore.updateOrderCustomerStateForInstance(
              id,
              orderId,
              customerState
            ),
      rateOrder: (orderId, rating, comments, categories = null) =>
        categories && categories != null
          ? RnFlybuyCore.rateOrderWithCategoriesForInstance(
              id,
              orderId,
              rating,
              comments,
              categories
            )
          : RnFlybuyCore.rateOrderForInstance(id, orderId, rating, comments),
      updatePickupMethod: (orderId, options) =>
        RnFlybuyCore.updatePickupMethodForInstance(id, orderId, options),
    },
    places: {
      suggest: (keyword, options) =>
        RnFlybuyCore.placesSuggestForInstance(id, keyword, options),
      retrieve: (place) => RnFlybuyCore.placesRetrieveForInstance(id, place),
    },
  };
}
