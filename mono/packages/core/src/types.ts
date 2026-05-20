export interface ICustomer {
  token: string;
  emailAddress?: string;
  info: ICustomerInfo;
}

export interface ICustomerInfo {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}

export interface IPlace {
  name: string;
  id: string;
  placeFormatted: string;
  address?: string;
  distance?: number;
}

export interface ISite {
  id: number;
  name?: string;
  phone?: string;
  streetAddress?: string | null;
  fullAddress?: string | null;
  locality?: string | null;
  region?: string | null;
  country?: string | null;
  postalCode?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  coverPhotoUrl?: string | null;
  iconUrl?: string | null;
  instructions?: string | null;
  description?: string | null;
  partnerIdentifier?: string | null;
  operationalStatus?: string | null;
  prearrivalSeconds?: number | null;
  distanceMeters?: number | null;
}

export interface IOrder {
  id: number;
  type?: string;
  state: string;
  customerState: string;
  partnerIdentifier?: string;
  pickupWindow?: [string];
  pickupType?: string;
  etaAt?: string;
  redeemedAt?: string;
  redemptionCode?: string;
  customerRating?: string;
  customerComment?: string;
  customerRatingCategories?: string[];
  createdAt?: string;
  orderFiredAt?: string;
  estimatedReadyAt?: string;
  partnerIdentifierForCustomer?: string;
  partnerIdentifierForCrew?: string;
  displayName?: string;
  handoffVehicleLocation?: string;

  siteID: number;
  siteName?: string;
  sitePhone?: string;
  siteFullAddress?: string;
  siteLongitude?: string;
  siteLatitude?: string;
  siteInstructions?: string;
  siteDescription?: string;
  siteCoverPhotoURL?: string;

  customerID?: string;
  customerName?: string;
  customerCarType?: string;
  customerCarColor?: string;
  customerLicensePlate?: string;

  spotIdentifier?: string;
  spotIdentifierEntryEnabled?: boolean;
  spotIdentifierInputType?: string;
}

export interface IOnSiteArea {
  id: number;
  name: string;
  pickupTypes?: string[];
  probability: number;
}

export interface IOnSiteResult {
  site: ISite | null;
  isOnSite: boolean;
  onSiteAreas: IOnSiteArea[];
}

// @deprecated this enum is deprecated, use string instead
export enum CustomerState {
  CREATED = 'created',
  EN_ROUTE = 'en_route',
  NEARBY = 'nearby',
  ARRIVED = 'arrived',
  WAITING = 'waiting',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
}

export enum PlaceType {
  ADDRESS = 0,
  REGION = 1,
  POSTAL_CODE = 2,
  CITY = 3,
  // Point of Interest
  POI = 4,
}

// @deprecated this enum is deprecated, use string instead
export enum OrderStateType {
  CREATED = 'created',
  READY = 'ready',
  DELAYED = 'delayed',
  DELIVERY_DISPATCHED = 'delivery_dispatched',
  DRIVER_ASSIGNED = 'driver_assigned',
  DELIVERY_FAILED = 'delivery_failed',
  PICKED_UP = 'picked_up',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  UNDELIVERABLE = 'undeliverable',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

// @deprecated this enum is deprecated, use string instead
export enum PickupType {
  CURBSIDE = 'curbside',
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export type PickupWindow = {
  start: string;
  end: string;
};

export enum LinkDetailType {
  DINE_IN = 'dine_in',
  REDEMPTION = 'redemption',
  OTHER = 'other',
}

export type LinkDetails = {
  url: string;
  type: LinkDetailType;
  params: Record<string, string | number | boolean>;
  // TODO: double check any type
  orderOptions?: any;
};

export type PlaceSuggestionOptions = {
  latitude?: number;
  longitude?: number;
  countryCodes?: string[];
  types?: PlaceType[];
};

export type PickupMethodOptions = {
  pickupType: string;
  customerCarColor?: string;
  customerCarType?: string;
  customerLicensePlate?: string;
  handoffVehicleLocation?: string;
  transportMode?: string;
};

export type OrderOptions = {
  customerName: string;
  customerPhone?: string;
  customerCarColor?: string;
  customerCarType?: string;
  customerLicensePlate?: string;
  partnerIdentifier?: string;
  pickupWindow?: PickupWindow;
  state?: string;
  pickupType?: string;
  spotIdentifier?: string;
  handoffVehicleLocation?: string;
  partnerIdentifierForCustomer?: string;
  partnerIdentifierForCrew?: string;
  disableOrderFire?: boolean;
  disablePromiseTimeScheduling?: boolean;
  orderFireMakeIntervalSeconds?: number;
  loyaltyProvider?: string;
  loyaltyIdentifier?: string;
  transportMode?: string;
};

export type CircularRegion = {
  latitude: number;
  longitude: number;
  radius: number;
};

export type SiteOptions = {
  operationalStatus?: string;
  page?: number;
  per?: number;
};
