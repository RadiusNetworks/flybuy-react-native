package com.radiusnetworks.reactnative.flybuy.core

import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.FlyBuyLinks
import com.radiusnetworks.flybuy.sdk.data.common.Pagination
import com.radiusnetworks.flybuy.sdk.data.common.SdkError
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.onsite.OnSiteResult
import com.radiusnetworks.flybuy.sdk.data.places.PlaceType
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site
import com.radiusnetworks.flybuy.sdk.exceptions.FlyBuyRuntimeException
import com.radiusnetworks.flybuy.sdk.manager.builder.PlaceSuggestionOptions
import com.radiusnetworks.flybuy.sdk.manager.builder.SiteOptions
import java.time.Instant


object ConfiguredFeatures {
  var core = false;
}

class RnFlybuyCoreModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyCoreSpec(context) {

  val TAG = "FlyBuy Core Wrapper"

  private var listenerCount = 0

  companion object {
    const val NAME = "RnFlybuyCore"
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun startObserver() {
    val orderObserver = Observer<List<Order>> {
      orderProgress(it)
    }

    Handler(Looper.getMainLooper()).post {
      FlyBuyCore.orders.openLiveData.observeForever(orderObserver)
    }
  }

  private fun orderProgress(orders: List<Order>) {
    orders.forEach { order ->
      reactApplicationContext
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit("orderUpdated", parseOrder(order))
    }
  }

  @ReactMethod
  override fun stopObserver() {
    (currentActivity as AppCompatActivity?)?.let {
      if (FlyBuyCore.orders.openLiveData.hasObservers()) {
        FlyBuyCore.orders.openLiveData.removeObservers(it)
      }
    }
  }


  @ReactMethod
  fun addListener(eventName: String) {
    Log.d("RNFBC", "add listener $eventName")
    // Keep: Required for RN built in Event Emitter Calls.
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    Log.d("RNFBC", "remove listener $count")
    // Keep: Required for RN built in Event Emitter Calls.
    listenerCount -= count
    if (listenerCount == 0) {
      // Remove upstream listeners, stop unnecessary background tasks
    }
  }

  // Core functions
  @ReactMethod
  override fun parseReferrerUrl(referrerUrl: String, promise: Promise) {
    try {
      Log.d(TAG, "parseReferrerUrl input: $referrerUrl")
      val linkDetails = FlyBuyLinks.parseReferrerUrl(referrerUrl)
      Log.d(TAG, "parseReferrerUrl output: $linkDetails")
      linkDetails?.let {
        promise.resolve(parseLinkDetails(it))
      } ?: run {
        promise.reject("NULL_LINK_DETAILS", "No link details could be parsed from the referrer URL.")
      }
    } catch (e: FlyBuyRuntimeException) {
      promise.reject(e)
      e.message?.let { Log.w(TAG, it) }
    }
  }
  @ReactMethod
  override fun configure(token: String, promise: Promise) {
    // TODO: separate the configure function for New and Old Architechture
    try {
      if (ConfiguredFeatures.core) {
        return
      }
      FlyBuyCore.configure(reactApplicationContext, token)
      val currentActivity = currentActivity
      if (currentActivity != null) {
        startObserver()
      }

      promise.resolve(true);
      ConfiguredFeatures.core = true
      Log.i(TAG, "Core configured")
    } catch (e: FlyBuyRuntimeException) {
      promise.reject(e)
      e.message?.let { Log.w(TAG, it) }
    }
  }

  @ReactMethod
  override fun updatePushToken(token: String) {
    FlyBuyCore.onNewPushToken(token)
  }

  @ReactMethod
  override fun handleRemoteNotification(data: ReadableMap) {
    val dataMap: Map<String, String> = decodeData(data)
    FlyBuyCore.onMessageReceived(dataMap, null)
  }

  @ReactMethod
  override fun handleNotification(data: ReadableMap, promise: Promise) {
    // TODO: Update this when FlyBuyCore.handleNotification is available in the Android SDK
    promise.reject("not_implemented", "FlyBuyCore.handleNotification is not implemented on Android SDK yet.")
  }

  // Instance routing helpers

  private fun customerManager(appAuthId: String?) =
    if (appAuthId.isNullOrEmpty()) FlyBuyCore.customer
    else FlyBuyCore.getInstance(appAuthId).customer

  private fun sitesManager(appAuthId: String?) =
    if (appAuthId.isNullOrEmpty()) FlyBuyCore.sites
    else FlyBuyCore.getInstance(appAuthId).sites

  private fun ordersManager(appAuthId: String?) =
    if (appAuthId.isNullOrEmpty()) FlyBuyCore.orders
    else FlyBuyCore.getInstance(appAuthId).orders

  private fun placesManager(appAuthId: String?) =
    if (appAuthId.isNullOrEmpty()) FlyBuyCore.places
    else FlyBuyCore.getInstance(appAuthId).places

  // Customer related functions
  @ReactMethod
  override fun loginForInstance(appAuthId: String?, email: String, password: String, promise: Promise) {
    customerManager(appAuthId).login(email, password) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("LOGIN_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun loginWithTokenForInstance(appAuthId: String?, token: String, promise: Promise) {
    customerManager(appAuthId).loginWithToken(token = token) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("TOKEN_LOGIN_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun logoutForInstance(appAuthId: String?, promise: Promise) {
    customerManager(appAuthId).logout { error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("LOGOUT_ERROR", error.userError())
      } else {
        promise.resolve("ok")
      }
    }
  }

  @ReactMethod
  override fun signUpForInstance(appAuthId: String?, email: String, password: String, promise: Promise) {
    customerManager(appAuthId).signUp(email, password) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("SIGNUP_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun createCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    customerManager(appAuthId).create(customerInfo, true, true) { customer, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        customer?.let {
          promise.resolve(parseCustomer(customer))
        } ?: run {
          promise.reject("Create Customer Error", "Error retrieving customer")
        }
      }
    }
  }

  @ReactMethod
  override fun updateCustomerForInstance(appAuthId: String?, customer: ReadableMap, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    customerManager(appAuthId).update(customerInfo) { customer, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        customer?.let {
          promise.resolve(parseCustomer(customer))
        } ?: run {
          promise.reject("Update Customer Error", "Error updating customer")
        }
      }
    }
  }

  @ReactMethod
  override fun getCurrentCustomerForInstance(appAuthId: String?, promise: Promise) {
    val customer = customerManager(appAuthId).current
    customer?.let {
      promise.resolve(parseCustomer(customer))
    } ?: run {
      promise.reject("Not logged in", "Current Customer null")
    }
  }

  // Sites
  @ReactMethod
  override fun fetchSitesByRegionForInstance(appAuthId: String?, region: ReadableMap, siteOptions: ReadableMap, promise: Promise) {
    val regionInfo: CircularRegion = decodeRegion(region)
    val optionsInfo: SiteOptions = decodeSiteOptions(siteOptions)

    sitesManager(appAuthId).fetch(regionInfo, optionsInfo) { sites, _, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(sites))
        } ?: run {
          promise.reject("Fetch sites Error", "Error retrieving sites")
        }

      }

    }
  }

  @ReactMethod
  override fun fetchSiteByPartnerIdentifierForInstance(appAuthId: String?, partnerIdentifier: String, siteOptions: ReadableMap, promise: Promise) {
    val optionsInfo: SiteOptions = decodeSiteOptions(siteOptions)
    sitesManager(appAuthId).fetchByPartnerIdentifier(partnerIdentifier, optionsInfo) { site, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        site?.let {
          promise.resolve(parseSite(site))
        } ?: run {
          promise.reject("Fetch site by partnerIdentifier Error", "Error retrieving site")
        }

      }
    }
  }

  @ReactMethod
  override fun fetchSitesNearPlaceForInstance(appAuthId: String?, place: ReadableMap, distance: Double, promise: Promise) {
    val decodedPlace = decodePlace(place)

    val callback: (List<Site>?, Pagination?, SdkError?) -> Unit = { sites, _, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(sites))
        } ?: run {
          promise.reject("Fetch sites near place Error", "Error retrieving sites")
        }

      }
    }
    sitesManager(appAuthId).fetchNear(decodedPlace, distance.toFloat(), null, callback)
  }

  @ReactMethod
  override fun fetchSitesNearbyForInstance(appAuthId: String?, distance: Double, siteOptions: ReadableMap, promise: Promise) {
    val callback: (List<Site>?, Pagination?, SdkError?) -> Unit = { sites, _, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(it))
        } ?: run {
          promise.reject("Fetch nearby sites Error", "Error retrieving sites")
        }

      }
    }
    sitesManager(appAuthId).fetchNearby(distance.toFloat(), decodeSiteOptions(siteOptions), callback)
  }

  @ReactMethod
  override fun checkIfOnSiteForInstance(appAuthId: String?, promise: Promise) {
    val callback: (OnSiteResult?, SdkError?) -> Unit = { onSiteResult, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        onSiteResult?.let {
          promise.resolve(parseOnSiteResult(it))
        } ?: run {
          promise.reject("Check if on site Error", "Error checking if on site")
        }
      }
    }
    sitesManager(appAuthId).checkIfOnSite(callback)
  }

  // Places related functions
  @ReactMethod
  override fun placesSuggestForInstance(appAuthId: String?, keyword: String, options: ReadableMap, promise: Promise) {

    val optionsBuilder = PlaceSuggestionOptions.Builder().apply {
      setType(PlaceType.ADDRESS)
    }

    if (options.hasKey("latitude") && options.hasKey("longitude")) {
      val latitude = options.getDouble("latitude")
      val longitude = options.getDouble("longitude")
      optionsBuilder.setProximity(latitude, longitude)
    }

    if (options.hasKey("countryCodes")) {
      val countryCodes = options.getArray("countryCodes")
      if (countryCodes != null && countryCodes.size() > 0) {
        optionsBuilder.setCountryCodes(readableArrayToStringList(countryCodes))
      }
    }

    if (options.hasKey("types")) {
      val types = options.getArray("types")
      if (types != null && types.size() > 0) {
        for (i in 0 until types.size()) {
          val type = types.getInt(i)
          intToPlaceTypeEnum(type)?.let { optionsBuilder.addType(it) }
        }
      }
    }

    val suggestionOptions = optionsBuilder.build()
    placesManager(appAuthId).suggest(keyword, suggestionOptions) { places, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        places?.let {
          promise.resolve(parsePlaces(places))
        } ?: run {
          promise.reject("Fetch places suggestion Error", "Error retrieving suggested places")
        }

      }
    }
  }

  @ReactMethod
  override fun placesRetrieveForInstance(appAuthId: String?, place: ReadableMap, promise: Promise) {
    var decodedPlace = decodePlace(place)

    placesManager(appAuthId).retrieve(decodedPlace) { coordinate, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        if (coordinate != null) {
          promise.resolve(parsePlaceLocation(coordinate))
        } else {
          promise.reject("Fetch place location Error", "Error retrieving place location")
        }
      }
    }
  }

  // Orders related functions
  @ReactMethod
  override fun fetchOrdersForInstance(appAuthId: String?, promise: Promise) {
    ordersManager(appAuthId).fetch { orders, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve(orders?.let { parseOrders(it) })
      }

    }
  }

  @ReactMethod
  override fun claimOrderForInstance(
    appAuthId: String?,
    redeemCode: String,
    orderOptions: ReadableMap,
    promise: Promise
  ) {
    ordersManager(appAuthId).claim(
      redeemCode,
      decodeOrderOptions(orderOptions)
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("Claim Order Error", "Error retrieving order")
        }
      }
    }
  }

  @ReactMethod
  override fun fetchOrderByRedemptionCodeForInstance(appAuthId: String?, redeemCode: String, promise: Promise) {
    ordersManager(appAuthId).fetch(redeemCode) { order, sdkError ->
      if (null != sdkError) {
        promise.reject(sdkError.userError(), sdkError.userError())
      } else {
        promise.resolve(order?.let { parseOrder(it) })
      }
    }
  }

  @ReactMethod
  override fun createOrderWithSiteIdForInstance(appAuthId: String?, siteId: Double, orderOptions: ReadableMap, promise: Promise) {
    val manager = ordersManager(appAuthId)
    manager.create(
      siteId.toInt(),
      decodeOrderOptions(orderOptions)
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let {
          promise.resolve(parseOrder(order))
        } ?: run {
          promise.reject("Create Order Error", "Error retrieving order")
        }
      }
    }
  }

  @ReactMethod
  override fun createOrderWithSitePartnerIdentifierForInstance(appAuthId: String?, sitePartnerIdentifier: String, orderOptions: ReadableMap, promise: Promise) {
    val manager = ordersManager(appAuthId)
    manager.create(
      sitePartnerIdentifier = sitePartnerIdentifier,
      orderOptions = decodeOrderOptions(orderOptions)
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let {
          promise.resolve(parseOrder(order))
        } ?: run {
          promise.reject("Create Order Error", "Error retrieving order")
        }
      }
    }
  }

  @ReactMethod
  override fun updateOrderStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise) {
    ordersManager(appAuthId).updateState(orderId.toInt(), state) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  override fun rateOrderForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, promise: Promise) {
    ordersManager(appAuthId).rateOrder(
      orderId = orderId.toInt(),
      rating = rating.toInt(),
      comments = comments
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  override fun rateOrderWithCategoriesForInstance(appAuthId: String?, orderId: Double, rating: Double, comments: String, categories: ReadableArray, promise: Promise) {
    ordersManager(appAuthId).rateOrder(
      orderId = orderId.toInt(),
      rating = rating.toInt(),
      comments = comments,
      categories = readableArrayToStringList(categories)
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  override fun updateOrderCustomerStateForInstance(appAuthId: String?, orderId: Double, state: String, promise: Promise) {
    ordersManager(appAuthId).updateCustomerState(orderId.toInt(), state) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  override fun updateOrderCustomerStateWithSpotForInstance(appAuthId: String?, orderId: Double, state: String, spot: String, promise: Promise) {
    ordersManager(appAuthId).updateCustomerState(orderId.toInt(), state, spot) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  override fun updatePickupMethodForInstance(appAuthId: String?, orderId: Double, options: ReadableMap, promise: Promise) {

    val optionsBuilder = decodePickupMethodOptions(options)

    ordersManager(appAuthId).updatePickupMethod(orderId.toInt(), optionsBuilder) { order, sdkError ->
      when {
        sdkError != null -> promise.reject(sdkError.userError(), sdkError.userError())
        order != null -> promise.resolve(parseOrder(order))
        else -> promise.reject("null", "Null order")
      }
    }
  }
}




