package com.radiusnetworks.reactnative.flybuy.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray

abstract class RnFlybuyCoreSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyCoreSpec(context) {

  // Configure (not in TS spec; used by native implementation)
  abstract fun configure(token: String, promise: Promise)

  // Deeplinks related functions
  override abstract fun parseReferrerUrl(referrerUrl: String, promise: Promise)

  // Notification related function
  override abstract fun updatePushToken(token: String)
  override abstract fun handleRemoteNotification(data: ReadableMap)
  override abstract fun handleNotification(data: ReadableMap, promise: Promise)

  // Core observer
  override abstract fun startObserver()
  override abstract fun stopObserver()
  
  // Customer related functions
  override abstract fun loginForInstance(appAuthId: String?, email: String, password: String, promise: Promise)
  override abstract fun loginWithTokenForInstance(appAuthId: String?, token: String, promise: Promise)
  override abstract fun logoutForInstance(appAuthId: String?, promise: Promise)
  override abstract fun signUpForInstance(appAuthId: String?, email: String, password: String, promise: Promise)
  override abstract fun createCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise)
  override abstract fun updateCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise)
  override abstract fun getCurrentCustomerForInstance(appAuthId: String?, promise: Promise)

  // Sites related functions
  override abstract fun fetchSitesByRegionForInstance(appAuthId: String?, region: ReadableMap, siteOptions: ReadableMap, promise: Promise)
  override abstract fun fetchSiteByPartnerIdentifierForInstance(appAuthId: String?, partnerIdentifier: String, siteOptions: ReadableMap, promise: Promise)
  override abstract fun fetchSitesNearPlaceForInstance(appAuthId: String?, place: ReadableMap, distance: Double, promise: Promise)
  override abstract fun fetchSitesNearbyForInstance(appAuthId: String?, distance: Double, siteOptions: ReadableMap, promise: Promise)
  override abstract fun checkIfOnSiteForInstance(appAuthId: String?, promise: Promise)

  // Places related functions
  override abstract fun placesSuggestForInstance(appAuthId: String?, keyword: String, options: ReadableMap, promise: Promise)
  override abstract fun placesRetrieveForInstance(appAuthId: String?, place: ReadableMap, promise: Promise)

  // Orders related functions
  override abstract fun fetchOrdersForInstance(appAuthId: String?, promise: Promise)
  override abstract fun fetchOrderByRedemptionCodeForInstance(appAuthId: String?, redeemCode: String, promise: Promise)
  override abstract fun claimOrderForInstance(appAuthId: String?, redeemCode: String, orderOptions: ReadableMap, promise: Promise)
  override abstract fun createOrderWithSiteIdForInstance(appAuthId: String?, siteId: Double, orderOptions: ReadableMap, promise: Promise)
  override abstract fun createOrderWithSitePartnerIdentifierForInstance(appAuthId: String?, sitePartnerIdentifier: String, orderOptions: ReadableMap, promise: Promise)
  override abstract fun updateOrderStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise)
  override abstract fun rateOrderForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, promise: Promise)
  override abstract fun rateOrderWithCategoriesForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, categories: ReadableArray, promise: Promise)
  override abstract fun updateOrderCustomerStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise)
  override abstract fun updateOrderCustomerStateWithSpotForInstance(appAuthId: String?, orderId: Double, state: String, spot: String, promise: Promise)
  override abstract fun updatePickupMethodForInstance(appAuthId: String?, orderId: Double, options: ReadableMap, promise: Promise)
}