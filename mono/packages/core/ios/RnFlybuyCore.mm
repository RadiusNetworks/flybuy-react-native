#import "RnFlybuyCore.h"
#import "RnFlybuyCoreImpl.h"
#import "RnFlybuyCore-Umbrella.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyCoreSpec.h"
#endif

@implementation RnFlybuyCore {
  RnFlybuyCoreImpl *_impl;
}
RCT_EXPORT_MODULE()

- (instancetype)init {
  self = [super init];
  if (self) {
    _impl = [[RnFlybuyCoreImpl alloc] initWithEventEmitter:self];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup { return NO; }

- (NSArray<NSString *> *)supportedEvents {
    return @[@"orderUpdated", @"ordersUpdated", @"ordersError", @"orderEventError", @"notifyEvents"];
}

RCT_EXPORT_METHOD(startObserver) {
    [_impl startObserver];
}

RCT_EXPORT_METHOD(stopObserver) {
    [_impl stopObserver];
}


RCT_EXPORT_METHOD(loginForInstance:(NSString *)appAuthId
                  withEmail:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl loginForInstance:appAuthId email:email password:password resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)loginForInstance:(NSString *)appAuthId 
                   email:(NSString *)email 
                password:(NSString *)password 
                 resolve:(RCTPromiseResolveBlock)resolve 
                  reject:(RCTPromiseRejectBlock)reject
{
  [_impl loginForInstance:appAuthId email:email password:password resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(loginWithTokenForInstance:(NSString *)appAuthId
                  withToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl loginWithTokenForInstance:appAuthId token:token resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)loginWithTokenForInstance:(NSString *)appAuthId 
                            token:(NSString *)token 
                          resolve:(RCTPromiseResolveBlock)resolve 
                           reject:(RCTPromiseRejectBlock)reject
{
  [_impl loginWithTokenForInstance:appAuthId token:token resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(signUpForInstance:(NSString *)appAuthId
                  withEmail:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl signUpForInstance:appAuthId email:email password:password resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)signUpForInstance:(NSString *)appAuthId 
                   email:(NSString *)email 
                password:(NSString *)password 
                 resolve:(RCTPromiseResolveBlock)resolve 
                  reject:(RCTPromiseRejectBlock)reject
{
  [_impl signUpForInstance:appAuthId email:email password:password resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(logoutForInstance:(NSString *)appAuthId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl logoutForInstance:appAuthId resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)logoutForInstance:(NSString *)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl logoutForInstance:appAuthId resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(getCurrentCustomerForInstance:(NSString *)appAuthId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl getCurrentCustomerForInstance:appAuthId resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)getCurrentCustomerForInstance:(NSString *)appAuthId 
                              resolve:(RCTPromiseResolveBlock)resolve 
                               reject:(RCTPromiseRejectBlock)reject
{
  [_impl getCurrentCustomerForInstance:appAuthId resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(createCustomerForInstance:(NSString *)appAuthId
                  withCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl createCustomerForInstance:appAuthId name:customer[@"name"] ?: @""
                  carType:customer[@"carType"] ?: @""
                 carColor:customer[@"carColor"] ?: @""
             licensePlate:customer[@"licensePlate"] ?: @""
                    phone:customer[@"phone"]
                  resolve:resolve
                   reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)createCustomerForInstance:(NSString *)appAuthId 
                     customerInfo:(JS::NativeRnFlybuyCore::SpecCreateCustomerForInstanceCustomerInfo &)customerInfo
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject
{
  [_impl createCustomerForInstance:appAuthId
                              name:customerInfo.name() ?: @""
                           carType:customerInfo.carType() ?: @""
                          carColor:customerInfo.carColor() ?: @""
                      licensePlate:customerInfo.licensePlate() ?: @""
                             phone:customerInfo.phone()
                           resolve:resolve
                            reject:reject];
}
#endif

RCT_EXPORT_METHOD(updateCustomerForInstance:(NSString *)appAuthId
                  withCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl updateCustomerForInstance:appAuthId name:customer[@"name"] ?: @""
                  carType:customer[@"carType"] ?: @""
                 carColor:customer[@"carColor"] ?: @""
             licensePlate:customer[@"licensePlate"] ?: @""
                    phone:customer[@"phone"]
                  resolve:resolve
                   reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)updateCustomerForInstance:(NSString *)appAuthId 
                     customerInfo:(JS::NativeRnFlybuyCore::SpecUpdateCustomerForInstanceCustomerInfo &)customerInfo
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject
{
  [_impl updateCustomerForInstance:appAuthId
                              name:customerInfo.name() ?: @""
                           carType:customerInfo.carType() ?: @""
                          carColor:customerInfo.carColor() ?: @""
                      licensePlate:customerInfo.licensePlate() ?: @""
                             phone:customerInfo.phone()
                           resolve:resolve
                            reject:reject];
}
#endif 

// Sites
RCT_EXPORT_METHOD(fetchSitesByRegionForInstance:(nullable NSString *)appAuthId
                  withRegion:(NSDictionary *)region
                  withSiteOptions:(NSDictionary *)siteOptions
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl fetchSitesByRegionForInstance:appAuthId 
                                  region:[self decodeRegion:region]
                             siteOptions:[self decodeSiteOptions:siteOptions]
                                 resolve:resolve reject:reject];
}
#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchSitesByRegionForInstance:(NSString *)appAuthId 
                               region:(NSDictionary *)region 
                          siteOptions:(NSDictionary *)siteOptions 
                               resolve:(RCTPromiseResolveBlock)resolve 
                                reject:(RCTPromiseRejectBlock)reject
{
  FlyBuyCircularRegion *decodedRegion = [self decodeRegion:region];
  FlyBuySiteOptions *decodedOptions = [self decodeSiteOptions:siteOptions];

  [_impl fetchSitesByRegionForInstance:appAuthId 
                                region:decodedRegion 
                           siteOptions:decodedOptions 
                               resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(fetchSiteByPartnerIdentifierForInstance:(nullable NSString *)appAuthId
                  withPartnerIdentifier:(NSString *)partnerIdentifier
                  withSiteOptions:(NSDictionary *)siteOptions
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [_impl fetchSiteByPartnerIdentifierForInstance:appAuthId 
                                 partnerIdentifier:partnerIdentifier
                                       siteOptions:[self decodeSiteOptions:siteOptions]
                                           resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchSiteByPartnerIdentifierForInstance:(NSString *)appAuthId 
                              partnerIdentifier:(NSString *)partnerIdentifier 
                                    siteOptions:(NSDictionary *)siteOptions 
                                        resolve:(RCTPromiseResolveBlock)resolve 
                                         reject:(RCTPromiseRejectBlock)reject
{
  [_impl fetchSiteByPartnerIdentifierForInstance:appAuthId 
                               partnerIdentifier:partnerIdentifier 
                                    siteOptions:[self decodeSiteOptions:siteOptions] 
                                        resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(fetchSitesNearPlaceForInstance:(nullable NSString *)appAuthId
                  withPlace:(NSDictionary *)place
                  withDistance:(double)distance
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl fetchSitesNearPlaceForInstance:appAuthId
                                placeId:place[@"id"] ?: @""
                              placeName:place[@"name"] ?: @""
                         placeFormatted:place[@"placeFormatted"] ?: @""
                           placeAddress:place[@"address"]
                          placeDistance:[place[@"distance"] doubleValue]
                               distance:distance
                                resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchSitesNearPlaceForInstance:(NSString *)appAuthId
                                 place:(NSDictionary *)place
                              distance:(double)distance
                               resolve:(RCTPromiseResolveBlock)resolve
                                reject:(RCTPromiseRejectBlock)reject
{
  [_impl fetchSitesNearPlaceForInstance:appAuthId
                                placeId:place[@"id"] ?: @""
                              placeName:place[@"name"] ?: @""
                         placeFormatted:place[@"placeFormatted"] ?: @""
                           placeAddress:place[@"address"]
                          placeDistance:[place[@"distance"] doubleValue]
                               distance:distance
                                resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(fetchSitesNearbyForInstance:(nullable NSString *)appAuthId
                  withDistance:(double)distance
                  withSiteOptions:(NSDictionary *)siteOptions
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl fetchSitesNearbyForInstance:appAuthId
                             distance:distance
                          siteOptions:[self decodeSiteOptions:siteOptions]
                              resolve:resolve
                               reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchSitesNearbyForInstance:(NSString *)appAuthId
                            distance:(double)distance
                         siteOptions:(NSDictionary *)siteOptions
                             resolve:(RCTPromiseResolveBlock)resolve
                              reject:(RCTPromiseRejectBlock)reject
{
  [_impl fetchSitesNearbyForInstance:appAuthId
                             distance:distance
                          siteOptions:[self decodeSiteOptions:siteOptions]
                              resolve:resolve
                               reject:reject];
}
#endif

RCT_EXPORT_METHOD(checkIfOnSiteForInstance:(nullable NSString *)appAuthId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl checkIfOnSiteForInstance:appAuthId resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)checkIfOnSiteForInstance:(NSString *)appAuthId
                         resolve:(RCTPromiseResolveBlock)resolve
                          reject:(RCTPromiseRejectBlock)reject
{
  [_impl checkIfOnSiteForInstance:appAuthId resolve:resolve reject:reject];
}
#endif

// Notifications

RCT_EXPORT_METHOD(updatePushToken:(NSString *)token)
{
  [_impl updatePushToken:token];
}

RCT_EXPORT_METHOD(handleRemoteNotification:(NSDictionary *)userInfo)
{
  [_impl handleRemoteNotification:userInfo];
}

RCT_EXPORT_METHOD(handleNotification:(NSDictionary *)response
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl handleNotification:response resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)handleNotification:(NSDictionary *)data resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [self handleNotification:data withResolver:resolve withRejecter:reject];
}
#endif

// Orders

RCT_EXPORT_METHOD(fetchOrdersForInstance:(nullable NSString *)appAuthId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl fetchOrdersForInstance:appAuthId resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
// New Architecture protocol uses fetchOrders:resolve:reject: (codegen selector).
- (void)fetchOrdersForInstance:(NSString *)appAuthId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [self fetchOrdersForInstance:appAuthId withResolver:resolve withRejecter:reject];
}
#endif

// Safely extract a string from params (JS may send string or number).
#ifndef RCT_NEW_ARCH_ENABLED
static NSString *_Nullable stringFromParams(NSDictionary *params, NSString *key) {
    id value = params[key];
    if (value == nil) return nil;
    if ([value isKindOfClass:[NSString class]]) return (NSString *)value;
    if ([value isKindOfClass:[NSNumber class]]) return [(NSNumber *)value stringValue];
    return nil;
}

// Safely extract siteId as NSInteger. Returns YES if valid, NO if missing or wrong type (e.g. dict passed by mistake).
static BOOL integerFromParams(NSDictionary *params, NSString *key, NSInteger *outValue) {
    id value = params[key];
    if (value == nil) return NO;
    if ([value isKindOfClass:[NSDictionary class]]) return NO; // Avoid passing whole params as number
    if ([value isKindOfClass:[NSNumber class]]) {
        *outValue = [(NSNumber *)value integerValue];
        return YES;
    }
    if ([value isKindOfClass:[NSString class]]) {
        *outValue = [(NSString *)value integerValue];
        return YES;
    }
    return NO;
}
#endif

RCT_EXPORT_METHOD(createOrderWithSiteIdForInstance:(nullable NSString *)appAuthId
                                        withSiteId:(NSInteger)siteId
                                  withOrderOptions:(NSDictionary *)orderOptions
                                      withResolver:(RCTPromiseResolveBlock)resolve
                                      withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
    [_impl createOrderWithSiteIdForInstance:appAuthId
                                     siteId:siteId
                                    options:options
                                    resolve:resolve
                                     reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)createOrderWithSiteIdForInstance:(NSString * _Nullable)appAuthId 
                                  siteId:(double)siteId 
                            orderOptions:(NSDictionary *)orderOptions 
                                 resolve:(RCTPromiseResolveBlock)resolve 
                                  reject:(RCTPromiseRejectBlock)reject
{
  FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
  [_impl createOrderWithSiteIdForInstance:appAuthId
                                   siteId:(NSInteger)siteId
                                  options:options
                                  resolve:resolve
                                   reject:reject];
}
#endif

RCT_EXPORT_METHOD(createOrderWithSitePartnerIdentifierForInstance:(nullable NSString *)appAuthId
                                        withSitePartnerIdentifier:(NSString *)sitePartnerIdentifier
                                                 withOrderOptions:(NSDictionary *)orderOptions
                                                     withResolver:(RCTPromiseResolveBlock)resolve
                                                     withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
    [_impl createOrderWithSitePartnerIdentifierForInstance:appAuthId
                                     sitePartnerIdentifier:sitePartnerIdentifier
                                                   options:options
                                                   resolve:resolve
                                                    reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)createOrderWithSitePartnerIdentifierForInstance:(NSString * _Nullable)appAuthId 
                                  sitePartnerIdentifier:(NSString *)sitePartnerIdentifier 
                                           orderOptions:(NSDictionary *)orderOptions 
                                                resolve:(RCTPromiseResolveBlock)resolve 
                                                 reject:(RCTPromiseRejectBlock)reject
{
  FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
  [_impl createOrderWithSitePartnerIdentifierForInstance:appAuthId
                                   sitePartnerIdentifier:sitePartnerIdentifier
                                                 options:options
                                                 resolve:resolve
                                                  reject:reject];
}
#endif

RCT_EXPORT_METHOD(claimOrderForInstance:(nullable NSString *)appAuthId
                             withRedeemCode:(NSString *)redeemCode
                           withOrderOptions:(NSDictionary *)orderOptions
                               withResolver:(RCTPromiseResolveBlock)resolve
                               withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
    [_impl claimOrderForInstance:appAuthId
                      redeemCode:redeemCode
                         options:options
                         resolve:resolve
                          reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)claimOrderForInstance:(NSString * _Nullable)appAuthId
                   redeemCode:(NSString *)redeemCode 
                 orderOptions:(NSDictionary *)orderOptions 
                      resolve:(RCTPromiseResolveBlock)resolve 
                       reject:(RCTPromiseRejectBlock)reject
{
  FlyBuyOrderOptions *options = [self decodeOrderOptions:orderOptions];
  [_impl claimOrderForInstance:appAuthId
                    redeemCode:redeemCode
                       options:options
                       resolve:resolve
                        reject:reject];
}
#endif

RCT_EXPORT_METHOD(fetchOrderByRedemptionCodeForInstance:(nullable NSString *)appAuthId
                                         withRedeemCode:(NSString *)redeemCode
                                           withResolver:(RCTPromiseResolveBlock)resolve
                                           withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl fetchOrderByRedemptionCodeForInstance:appAuthId redeemCode:redeemCode resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)fetchOrderByRedemptionCodeForInstance:(NSString *)appAuthId redeemCode:(NSString *)redeemCode resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl fetchOrderByRedemptionCodeForInstance:appAuthId redeemCode:redeemCode resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(updateOrderStateForInstance:(nullable NSString *)appAuthId
                                  withOrderId:(NSInteger)orderId
                                    withState:(NSString *)state
                                 withResolver:(RCTPromiseResolveBlock)resolve
                                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl updateOrderStateForInstance:appAuthId orderId:orderId state:state resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)updateOrderStateForInstance:(NSString *)appAuthId orderId:(double)orderId state:(NSString *)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl updateOrderStateForInstance:appAuthId orderId:(NSInteger)orderId state:state resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(updateOrderCustomerStateForInstance:(nullable NSString *)appAuthId
                                          withOrderId:(NSInteger)orderId
                                            withState:(NSString *)state
                                         withResolver:(RCTPromiseResolveBlock)resolve
                                         withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl updateOrderCustomerStateForInstance:appAuthId orderId:orderId state:state resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)updateOrderCustomerStateForInstance:(NSString *)appAuthId orderId:(double)orderId state:(NSString *)state resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl updateOrderCustomerStateForInstance:appAuthId orderId:(NSInteger)orderId state:state resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(updateOrderCustomerStateWithSpotForInstance:(nullable NSString *)appAuthId
                                                  withOrderId:(NSInteger)orderId
                                                    withState:(NSString *)state
                                                     withSpot:(NSString *)spot
                                                 withResolver:(RCTPromiseResolveBlock)resolve
                                                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl updateOrderCustomerStateWithSpotForInstance:appAuthId orderId:orderId state:state spot:spot resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)updateOrderCustomerStateWithSpotForInstance:(NSString *)appAuthId orderId:(double)orderId state:(NSString *)state spot:(NSString *)spot resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl updateOrderCustomerStateWithSpotForInstance:appAuthId orderId:(NSInteger)orderId state:state spot:spot resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(rateOrderForInstance:(nullable NSString *)appAuthId
                           withOrderId:(NSInteger)orderId
                            withRating:(NSInteger)rating
                          withComments:(NSString *)comments
                          withResolver:(RCTPromiseResolveBlock)resolve
                          withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl rateOrderForInstance:appAuthId orderId:orderId rating:rating comments:comments resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)rateOrderForInstance:(NSString *)appAuthId orderId:(double)orderId rating:(double)rating comments:(NSString *)comments resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl rateOrderForInstance:appAuthId orderId:(NSInteger)orderId rating:(NSInteger)rating comments:comments resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(rateOrderWithCategoriesForInstance:(nullable NSString *)appAuthId
                  withOrderId:(NSInteger)orderId
                  withRating:(NSInteger)rating
                  withComments:(NSString *)comments
                  withCategories:(NSArray<NSString *> *)categories
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [_impl rateOrderWithCategoriesForInstance:appAuthId orderId:orderId rating:rating
                       comments:comments categories:categories resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)rateOrderWithCategoriesForInstance:(NSString *)appAuthId orderId:(double)orderId rating:(double)rating comments:(NSString *)comments categories:(NSArray *)categories resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [_impl rateOrderWithCategoriesForInstance:appAuthId orderId:(NSInteger)orderId rating:(NSInteger)rating comments:comments categories:categories resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(updatePickupMethodForInstance:(nullable NSString *)appAuthId
                                    withOrderId:(NSInteger)orderId
                                    withOptions:(NSDictionary *)options
                                   withResolver:(RCTPromiseResolveBlock)resolve
                                   withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl updatePickupMethodForInstance:appAuthId
                               orderId:orderId
                            pickupType:options[@"pickupType"] ?: @"pickup"
                      customerCarColor:options[@"customerCarColor"]
                       customerCarType:options[@"customerCarType"]
                  customerLicensePlate:options[@"customerLicensePlate"]
                handoffVehicleLocation:options[@"handoffVehicleLocation"]
                         transportMode:options[@"transportMode"]
                               resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)updatePickupMethodForInstance:(NSString *)appAuthId
                              orderId:(double)orderId
                              options:(NSDictionary *)options
                              resolve:(RCTPromiseResolveBlock)resolve
                               reject:(RCTPromiseRejectBlock)reject
{
  [_impl updatePickupMethodForInstance:appAuthId
                               orderId:(NSInteger)orderId
                            pickupType:options[@"pickupType"] ?: @"pickup"
                      customerCarColor:options[@"customerCarColor"]
                       customerCarType:options[@"customerCarType"]
                  customerLicensePlate:options[@"customerLicensePlate"]
                handoffVehicleLocation:options[@"handoffVehicleLocation"]
                         transportMode:options[@"transportMode"]
                               resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(placesSuggestForInstance:(NSString * _Nullable)appAuthId
                  keyword:(NSString *)query
                  withOptions: (NSDictionary *)options
                 withResolver:(RCTPromiseResolveBlock)resolve
               withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl placesSuggestForInstance:appAuthId
                          keyword:query
                         latitude:[options[@"latitude"] doubleValue]
                        longitude:[options[@"longitude"] doubleValue]
                     countryCodes:options[@"countryCodes"] ?: @[]
                            types:options[@"types"] ?: @[]
                          resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)placesSuggestForInstance:(NSString * _Nullable)appAuthId
                         keyword:(NSString *)keyword
                         options:(NSDictionary *)options
                         resolve:(RCTPromiseResolveBlock)resolve
                          reject:(RCTPromiseRejectBlock)reject
{
  [_impl placesSuggestForInstance:appAuthId
                          keyword:keyword
                         latitude:[options[@"latitude"] doubleValue]
                        longitude:[options[@"longitude"] doubleValue]
                     countryCodes:options[@"countryCodes"] ?: @[]
                            types:options[@"types"] ?: @[]
                          resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(placesRetrieveForInstance:(NSString * _Nullable)appAuthId
                  place:(NSDictionary *)place
                 withResolver:(RCTPromiseResolveBlock)resolve
               withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl placesRetrieveForInstance:appAuthId
                           placeId:place[@"id"] ?: @""
                              name:place[@"name"] ?: @""
                    placeFormatted:place[@"placeFormatted"] ?: @""
                           address:place[@"address"]
                          distance:[place[@"distance"] doubleValue]
                          resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)placesRetrieveForInstance:(NSString * _Nullable)appAuthId
                            place:(NSDictionary *)place
                          resolve:(RCTPromiseResolveBlock)resolve
                           reject:(RCTPromiseRejectBlock)reject
{
  [_impl placesRetrieveForInstance:appAuthId
                           placeId:place[@"id"] ?: @""
                              name:place[@"name"] ?: @""
                    placeFormatted:place[@"placeFormatted"] ?: @""
                           address:place[@"address"]
                          distance:[place[@"distance"] doubleValue]
                           resolve:resolve reject:reject];
}
#endif

RCT_EXPORT_METHOD(parseReferrerUrl:(NSString *)referrerUrl
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  [_impl parseReferrerUrl:referrerUrl resolve:resolve reject:reject];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)parseReferrerUrl:(NSString *)referrerUrl
                 resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject
{
  [self parseReferrerUrl:referrerUrl withResolver:resolve withRejecter:reject];
}
#endif

// Decoder
- (FlyBuyCircularRegion *)decodeRegion:(NSDictionary<NSString *, NSNumber *> *)regionDict {
  CLLocationDegrees latitude = [regionDict[@"latitude"] doubleValue];
  CLLocationDegrees longitude = [regionDict[@"longitude"] doubleValue];
  CLLocationDistance radius = [regionDict[@"radius"] doubleValue];

  FlyBuyCircularRegion *region = [[FlyBuyCircularRegion alloc] initWithLatitude:latitude longitude:longitude radius:radius identifier:[[NSUUID UUID] UUIDString]];

  return region;
}

- (FlyBuyPickupWindow *)decodePickupWindowWithPickupWindow:(NSDictionary<NSString *, NSString *> *)pickupWindow {
    NSISO8601DateFormatter *formatter = [[NSISO8601DateFormatter alloc] init];
    formatter.formatOptions = (NSISO8601DateFormatOptions)(NSISO8601DateFormatWithFullDate |
                                                           NSISO8601DateFormatWithTime |
                                                           NSISO8601DateFormatWithDashSeparatorInDate |
                                                           NSISO8601DateFormatWithColonSeparatorInTime |
                                                           NSISO8601DateFormatWithFractionalSeconds);

    // Accept string or other types (e.g. from TurboModule); use description so we always pass a string to dateFromString
    id startVal = pickupWindow[@"start"];
    id endVal = pickupWindow[@"end"];
    NSString *startStr = [startVal isKindOfClass:[NSString class]] ? startVal : (startVal ? [startVal description] : @"");
    NSString *endStr = [endVal isKindOfClass:[NSString class]] ? endVal : (endVal ? [endVal description] : @"");
    NSDate *start = (startStr.length > 0 ? [formatter dateFromString:startStr] : nil) ?: [NSDate date];
    NSDate *end = (endStr.length > 0 ? [formatter dateFromString:endStr] : nil) ?: [NSDate date];

    return [[FlyBuyPickupWindow alloc] initWithStart:start end:end];
}

- (FlyBuySiteOptions *)decodeSiteOptions:(NSDictionary *)optionsDict {
    FlyBuySiteOptionsBuilder *builder = [[FlyBuySiteOptionsBuilder alloc] init];

    if (optionsDict[@"operationalStatus"]) [builder setOperationalStatus:optionsDict[@"operationalStatus"]];
    if (optionsDict[@"page"]) [builder setPage:[optionsDict[@"page"] integerValue]];
    if (optionsDict[@"per"]) [builder setPer:[optionsDict[@"per"] integerValue]];

    return [builder build];
}

- (FlyBuyOrderOptions *)decodeOrderOptions:(NSDictionary *)optionsDict {
    NSString *customerName = optionsDict[@"customerName"] ?: @"";
    FlyBuyOrderOptionsBuilder *builder = [[FlyBuyOrderOptionsBuilder alloc] initWithCustomerName:customerName];

    if (optionsDict[@"customerPhone"]) [builder setCustomerPhone:optionsDict[@"customerPhone"]];
    if (optionsDict[@"customerCarColor"]) [builder setCustomerCarColor:optionsDict[@"customerCarColor"]];
    if (optionsDict[@"customerCarType"]) [builder setCustomerCarType:optionsDict[@"customerCarType"]];
    // Note: JS sends customerLicensePlate, but the iOS builder expects setCustomerCarPlate
    if (optionsDict[@"customerLicensePlate"]) [builder setCustomerCarPlate:optionsDict[@"customerLicensePlate"]];
    if (optionsDict[@"partnerIdentifier"]) [builder setPartnerIdentifier:optionsDict[@"partnerIdentifier"]];
    if (optionsDict[@"pickupWindow"]) [builder setPickupWindow:[self decodePickupWindowWithPickupWindow:optionsDict[@"pickupWindow"]]];
    if (optionsDict[@"state"]) [builder setState:optionsDict[@"state"]];
    if (optionsDict[@"pickupType"]) [builder setPickupType:optionsDict[@"pickupType"]];
    if (optionsDict[@"spotIdentifier"]) [builder setSpotIdentifier:optionsDict[@"spotIdentifier"]];
    if (optionsDict[@"handoffVehicleLocation"]) [builder setHandoffVehicleLocation:optionsDict[@"handoffVehicleLocation"]];
    if (optionsDict[@"partnerIdentifierForCustomer"]) [builder setPartnerIdentifierForCustomer:optionsDict[@"partnerIdentifierForCustomer"]];
    if (optionsDict[@"partnerIdentifierForCrew"]) [builder setPartnerIdentifierForCrew:optionsDict[@"partnerIdentifierForCrew"]];
    if (optionsDict[@"disableOrderFire"]) [builder setDisableOrderFire:[optionsDict[@"disableOrderFire"] boolValue]];
    if (optionsDict[@"disablePromiseTimeScheduling"]) [builder setDisablePromiseTimeScheduling:[optionsDict[@"disablePromiseTimeScheduling"] boolValue]];
    if (optionsDict[@"orderFireMakeIntervalSeconds"]) [builder setOrderFireMakeIntervalSeconds:[optionsDict[@"orderFireMakeIntervalSeconds"] integerValue]];
    if (optionsDict[@"loyaltyIdentifier"]) [builder setLoyaltyInfoWithIdentifier:optionsDict[@"loyaltyIdentifier"] provider:optionsDict[@"loyaltyProvider"]];
    if (optionsDict[@"transportMode"]) [builder setTransportMode:optionsDict[@"transportMode"]];

    return [builder build];
}

#ifdef RCT_NEW_ARCH_ENABLED
// Don't compile this code when we build for the old architecture.
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyCoreSpecJSI>(params);
}
#endif

@end
