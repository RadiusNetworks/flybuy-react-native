import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export * from './types';

/**
 * NativeModule spec uses only inline types so React Native codegen can parse it.
 * Public API types remain in ./types.
 */
export interface Spec extends TurboModule {
  // Core functions
  startObserver(): void;
  stopObserver(): void;
  updatePushToken(token: string): void;
  handleRemoteNotification(data: Object): void;
  handleNotification(data: Object): Promise<Object>;

  // Customers functions
  loginForInstance(
    appAuthId: string | null,
    email: string,
    password: string
  ): Promise<Object>;
  loginWithTokenForInstance(
    appAuthId: string | null,
    token: string
  ): Promise<Object>;
  logoutForInstance(appAuthId: string | null): Promise<string>;
  signUpForInstance(
    appAuthId: string | null,
    email: string,
    password: string
  ): Promise<Object>;
  createCustomerForInstance(
    appAuthId: string | null,
    customerInfo: {
      name: string;
      carType: string;
      carColor: string;
      licensePlate: string;
      phone?: string;
    }
  ): Promise<Object>;
  updateCustomerForInstance(
    appAuthId: string | null,
    customerInfo: {
      name: string;
      carType: string;
      carColor: string;
      licensePlate: string;
      phone?: string;
    }
  ): Promise<Object>;
  getCurrentCustomerForInstance(appAuthId: string | null): Promise<Object>;

  // Sites functions
  fetchSitesByRegionForInstance(
    appAuthId: string | null,
    region: Object,
    siteOptions: Object
  ): Promise<Object[]>;
  fetchSiteByPartnerIdentifierForInstance(
    appAuthId: string | null,
    partnerIdentifier: string,
    siteOptions: Object
  ): Promise<Object>;
  fetchSitesNearPlaceForInstance(
    appAuthId: string | null,
    place: Object,
    distance: number
  ): Promise<Object[]>;
  fetchSitesNearbyForInstance(
    appAuthId: string | null,
    distance: number,
    siteOptions: Object
  ): Promise<Object[]>;
  checkIfOnSiteForInstance(appAuthId: string | null): Promise<Object | null>;

  // Places functions
  placesSuggestForInstance(
    appAuthId: string | null,
    keyword: string,
    options: Object
  ): Promise<Object[]>;
  placesRetrieveForInstance(
    appAuthId: string | null,
    place: Object
  ): Promise<Object>;

  // Orders functions
  fetchOrdersForInstance(appAuthId: string | null): Promise<Object[]>;
  createOrderWithSiteIdForInstance(
    appAuthId: string | null,
    siteId: number,
    orderOptions: Object
  ): Promise<Object>;
  createOrderWithSitePartnerIdentifierForInstance(
    appAuthId: string | null,
    sitePartnerIdentifier: string,
    orderOptions: Object
  ): Promise<Object>;
  claimOrderForInstance(
    appAuthId: string | null,
    redeemCode: string,
    orderOptions: Object
  ): Promise<Object>;
  fetchOrderByRedemptionCodeForInstance(
    appAuthId: string | null,
    redeemCode: string
  ): Promise<Object>;
  updateOrderStateForInstance(
    appAuthId: string | null,
    orderId: number,
    state: string
  ): Promise<Object>;
  updateOrderCustomerStateForInstance(
    appAuthId: string | null,
    orderId: number,
    state: string
  ): Promise<Object>;
  updateOrderCustomerStateWithSpotForInstance(
    appAuthId: string | null,
    orderId: number,
    state: string,
    spot: string
  ): Promise<Object>;
  rateOrderForInstance(
    appAuthId: string | null,
    orderId: number,
    rating: number,
    comments: string
  ): Promise<Object>;
  rateOrderWithCategoriesForInstance(
    appAuthId: string | null,
    orderId: number,
    rating: number,
    comments: string,
    categories: string[]
  ): Promise<Object>;
  updatePickupMethodForInstance(
    appAuthId: string | null,
    orderId: number,
    options: Object
  ): Promise<Object>;

  // Deeplinks
  parseReferrerUrl(referrerUrl: string): Promise<Object>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyCore');
