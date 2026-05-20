// RnFlybuyCoreImpl.h

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@class FlyBuyCircularRegion;
@class FlyBuyOrderOptions;
@class FlyBuySiteOptions;

@interface RnFlybuyCoreImpl : NSObject

- (instancetype)initWithEventEmitter:(RCTEventEmitter *)eventEmitter;

- (void)startObserver;
- (void)stopObserver;
- (void)updatePushToken:(NSString *)token;
- (void)handleRemoteNotification:(NSDictionary *)data;
- (void)handleNotification:(NSDictionary *)data resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)loginForInstance:(NSString * _Nullable)appAuthId email:(NSString *)email password:(NSString *)password resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)loginWithTokenForInstance:(NSString * _Nullable)appAuthId token:(NSString *)token resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)logoutForInstance:(NSString * _Nullable)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)signUpForInstance:(NSString * _Nullable)appAuthId email:(NSString *)email password:(NSString *)password resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)getCurrentCustomerForInstance:(NSString * _Nullable)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)createCustomerForInstance:(NSString * _Nullable)appAuthId name:(NSString *)name carType:(NSString *)carType carColor:(NSString *)carColor licensePlate:(NSString *)licensePlate phone:(NSString * _Nullable)phone resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)updateCustomerForInstance:(NSString * _Nullable)appAuthId name:(NSString *)name carType:(NSString *)carType carColor:(NSString *)carColor licensePlate:(NSString *)licensePlate phone:(NSString * _Nullable)phone resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchSitesByRegionForInstance:(NSString * _Nullable)appAuthId region:(FlyBuyCircularRegion *)region siteOptions:(FlyBuySiteOptions *)siteOptions resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchSiteByPartnerIdentifierForInstance:(NSString * _Nullable)appAuthId partnerIdentifier:(NSString *)partnerIdentifier siteOptions:(FlyBuySiteOptions *)siteOptions resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchSitesNearPlaceForInstance:(NSString * _Nullable)appAuthId placeId:(NSString *)placeId placeName:(NSString *)placeName placeFormatted:(NSString *)placeFormatted placeAddress:(NSString * _Nullable)placeAddress placeDistance:(double)placeDistance distance:(double)distance resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchSitesNearbyForInstance:(NSString * _Nullable)appAuthId distance:(double)distance siteOptions:(FlyBuySiteOptions *)siteOptions resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)checkIfOnSiteForInstance:(NSString * _Nullable)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)placesSuggestForInstance:(NSString * _Nullable)appAuthId keyword:(NSString *)keyword latitude:(double)latitude longitude:(double)longitude countryCodes:(NSArray<NSString *> *)countryCodes types:(NSArray<NSNumber *> *)types resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)placesRetrieveForInstance:(NSString * _Nullable)appAuthId placeId:(NSString *)placeId name:(NSString *)name placeFormatted:(NSString *)placeFormatted address:(NSString * _Nullable)address distance:(double)distance resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchOrdersForInstance:(NSString * _Nullable)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)fetchOrderByRedemptionCodeForInstance:(NSString * _Nullable)appAuthId redeemCode:(NSString *)redeemCode resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)createOrderWithSiteIdForInstance:(NSString * _Nullable)appAuthId siteId:(NSInteger)siteId options:(FlyBuyOrderOptions *)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)createOrderWithSitePartnerIdentifierForInstance:(NSString * _Nullable)appAuthId sitePartnerIdentifier:(NSString *)sitePartnerIdentifier options:(FlyBuyOrderOptions *)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)claimOrderForInstance:(NSString * _Nullable)appAuthId redeemCode:(NSString *)redeemCode options:(FlyBuyOrderOptions *)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)updateOrderStateForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId state:(NSString *)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)updateOrderCustomerStateForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId state:(NSString *)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)updateOrderCustomerStateWithSpotForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId state:(NSString *)state spot:(NSString *)spot resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)rateOrderForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId rating:(NSInteger)rating comments:(NSString *)comments resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)rateOrderWithCategoriesForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId rating:(NSInteger)rating comments:(NSString *)comments categories:(NSArray<NSString *> *)categories resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)updatePickupMethodForInstance:(NSString * _Nullable)appAuthId orderId:(NSInteger)orderId pickupType:(NSString *)pickupType customerCarColor:(NSString * _Nullable)customerCarColor customerCarType:(NSString * _Nullable)customerCarType customerLicensePlate:(NSString * _Nullable)customerLicensePlate handoffVehicleLocation:(NSString * _Nullable)handoffVehicleLocation transportMode:(NSString * _Nullable)transportMode resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (void)parseReferrerUrl:(NSString *)referrerUrl resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;

@end

NS_ASSUME_NONNULL_END
