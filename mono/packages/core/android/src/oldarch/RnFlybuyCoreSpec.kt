package com.radiusnetworks.reactnative.flybuy.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray

abstract class RnFlybuyCoreSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

    abstract fun startObserver()
    abstract fun stopObserver()

  // Deeplinks related functions
  abstract fun parseReferrerUrl(referrerUrl: String, promise: Promise)

  // Notification related function
  abstract fun configure(token: String, promise: Promise)
  abstract fun updatePushToken(token: String)
  abstract fun handleRemoteNotification(data: ReadableMap)
  abstract fun handleNotification(data: ReadableMap, promise: Promise)

  // Customer related functions
  abstract fun loginForInstance(appAuthId: String?, email: String, password: String, promise: Promise)
  abstract fun loginWithTokenForInstance(appAuthId: String?, token: String, promise: Promise)
  abstract fun logoutForInstance(appAuthId: String?, promise: Promise)
  abstract fun signUpForInstance(appAuthId: String?, email: String, password: String, promise: Promise)
  abstract fun createCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise)
  abstract fun updateCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise)
  abstract fun getCurrentCustomerForInstance(appAuthId: String?, promise: Promise)

  // Sites related functions
  abstract fun fetchSitesByRegionForInstance(appAuthId: String?, region: ReadableMap, siteOptions: ReadableMap, promise: Promise)
  abstract fun fetchSiteByPartnerIdentifierForInstance(appAuthId: String?, partnerIdentifier: String, siteOptions: ReadableMap, promise: Promise)
  abstract fun fetchSitesNearPlaceForInstance(appAuthId: String?, place: ReadableMap, distance: Double, promise: Promise)
  abstract fun fetchSitesNearbyForInstance(appAuthId: String?, distance: Double, siteOptions: ReadableMap, promise: Promise)
  abstract fun checkIfOnSiteForInstance(appAuthId: String?, promise: Promise)

  // Places related functions
  abstract fun placesSuggestForInstance(appAuthId: String?, keyword: String, options: ReadableMap, promise: Promise)
  abstract fun placesRetrieveForInstance(appAuthId: String?, place: ReadableMap, promise: Promise)

  // Orders related functions
  abstract fun fetchOrdersForInstance(appAuthId: String?, promise: Promise)
  abstract fun fetchOrderByRedemptionCodeForInstance(appAuthId: String?, redeemCode: String, promise: Promise)
  abstract fun claimOrderForInstance(appAuthId: String?, redeemCode: String, orderOptions: ReadableMap, promise: Promise)
  abstract fun createOrderWithSiteIdForInstance(appAuthId: String?, siteId: Double, orderOptions: ReadableMap, promise: Promise)
  abstract fun createOrderWithSitePartnerIdentifierForInstance(appAuthId: String?, sitePartnerIdentifier: String, orderOptions: ReadableMap, promise: Promise)
  abstract fun updateOrderStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise)
  abstract fun rateOrderForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, promise: Promise)
  abstract fun rateOrderWithCategoriesForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, categories: ReadableArray, promise: Promise)
  abstract fun updateOrderCustomerStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise)
  abstract fun updateOrderCustomerStateWithSpotForInstance(appAuthId: String?, orderId: Double, state: String, spot: String, promise: Promise)
  abstract fun updatePickupMethodForInstance(appAuthId: String?, orderId: Double, options: ReadableMap, promise: Promise)
}
