import CoreLocation
import FlyBuy
import React

@objc(RnFlybuyCoreImpl) class RnFlybuyCoreImpl: NSObject {

  private weak var emitter: RCTEventEmitter?

  @objc init(eventEmitter: RCTEventEmitter) {
    self.emitter = eventEmitter
  }

  // MARK: - Observer

  @objc func startObserver() {
    NotificationCenter.default.addObserver(
      forName: NSNotification.Name("orderUpdated"),
      object: nil,
      queue: nil
    ) { [weak self] notification in
      guard let self, let order = notification.object as? Order else { return }
      self.emitter?.sendEvent(withName: "orderUpdated", body: self.parseOrder(order))
    }
  }

  @objc func stopObserver() {
    NotificationCenter.default.removeObserver(self)
  }

  // MARK: - Push / Notifications

  @objc func updatePushToken(_ token: String) {
    FlyBuy.Core.updatePushToken(token)
  }

  @objc func handleRemoteNotification(_ userInfo: [String: Any]) {
    FlyBuy.Core.handleRemoteNotification(userInfo)
  }

  @objc func handleNotification(
    _ data: [String: Any],
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    FlyBuy.Core.handleRemoteNotification(data)
    resolve(NSNull())
  }

  // MARK: - Instance Helpers

  private func customerManager(
    forAppAuthId appAuthId: String?,
    reject: RCTPromiseRejectBlock
  ) -> CustomerManager? {
    do {
      return try FlyBuy.Core.getInstance(forAppAuthId: appAuthId).customer
    } catch {
      reject("getInstance_error", error.localizedDescription, error)
      return nil
    }
  }

  private func sitesManager(
    forAppAuthId appAuthId: String?,
    reject: RCTPromiseRejectBlock
  ) -> SitesManager? {
    do {
      return try FlyBuy.Core.getInstance(forAppAuthId: appAuthId).sites
    } catch {
      reject("getInstance_error", error.localizedDescription, error)
      return nil
    }
  }

  private func ordersManager(
    forAppAuthId appAuthId: String?,
    reject: RCTPromiseRejectBlock
  ) -> OrdersManager? {
    do {
      return try FlyBuy.Core.getInstance(forAppAuthId: appAuthId).orders
    } catch {
      reject("getInstance_error", error.localizedDescription, error)
      return nil
    }
  }

  private func placesManager(
    forAppAuthId appAuthId: String?,
    reject: RCTPromiseRejectBlock
  ) -> PlacesManager? {
    do {
      return try FlyBuy.Core.getInstance(forAppAuthId: appAuthId).places
    } catch {
      reject("getInstance_error", error.localizedDescription, error)
      return nil
    }
  }

  // MARK: - Customer

  @objc func loginForInstance(
    _ appAuthId: String?,
    email: String,
    password: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
      manager.login(emailAddress: email, password: password) { customer, error in
        if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
        guard let customer else { reject("login_error", "nil customer returned", nil); return }
        resolve(self.parseCustomer(customer))
      }
    } catch {
      reject("login_error", error.localizedDescription, error)
    }
  }

  @objc func loginWithTokenForInstance(
    _ appAuthId: String?,
    token: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
      manager.loginWithToken(token: token) { customer, error in
        if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
        guard let customer else { reject("login_error", "nil customer returned", nil); return }
        resolve(self.parseCustomer(customer))
      }
    } catch {
      reject("login_error", error.localizedDescription, error)
    }
  }

  @objc func logoutForInstance(
    _ appAuthId: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
      manager.logout()
      resolve("ok")
    } catch {
      reject("logout_error", error.localizedDescription, error)
    }
  }

  @objc func signUpForInstance(
    _ appAuthId: String?,
    email: String,
    password: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.signUp(emailAddress: email, password: password) { customer, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let customer else { reject("signup_error", "nil customer returned", nil); return }
      resolve(self.parseCustomer(customer))
    }
  }

  @objc func getCurrentCustomerForInstance(
    _ appAuthId: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
    guard let customer = manager.current else {
      reject("not_login", "current customer error", nil)
      return
    }
    resolve(parseCustomer(customer))
  }

  @objc func createCustomerForInstance(
    _ appAuthId: String?,
    name: String,
    carType: String,
    carColor: String,
    licensePlate: String,
    phone: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
    let info = decodeCustomerInfo(name: name, carType: carType, carColor: carColor,
                                  licensePlate: licensePlate, phone: phone)
    manager.create(info, termsOfService: true, ageVerification: true) { customer, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let customer else { reject("create_customer_error", "nil customer returned", nil); return }
      resolve(self.parseCustomer(customer))
    }
  }

  @objc func updateCustomerForInstance(
    _ appAuthId: String?,
    name: String,
    carType: String,
    carColor: String,
    licensePlate: String,
    phone: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = customerManager(forAppAuthId: appAuthId, reject: reject) else { return }
    let info = decodeCustomerInfo(name: name, carType: carType, carColor: carColor,
                                  licensePlate: licensePlate, phone: phone)
    manager.update(info) { customer, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let customer else { reject("update_customer_error", "nil customer returned", nil); return }
      resolve(self.parseCustomer(customer))
    }
  }

  // MARK: - Sites

  @objc func fetchSitesByRegionForInstance(
    _ appAuthId: String?,
    region: FlyBuyCircularRegion,
    siteOptions: SiteOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = sitesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.fetch(region: region, options: siteOptions) { sites, pagination, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      resolve((sites ?? []).map { self.parseSite($0) })
    }
  }

  @objc func fetchSiteByPartnerIdentifierForInstance(
    _ appAuthId: String?,
    partnerIdentifier: String,
    siteOptions: SiteOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = sitesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.fetchByPartnerIdentifier(partnerIdentifier: partnerIdentifier, options: siteOptions) { site, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let site else { reject("fetch_site_error", "nil site returned", nil); return }
      resolve(self.parseSite(site))
    }
  }

  @objc func fetchSitesNearPlaceForInstance(
    _ appAuthId: String?,
    placeId: String,
    placeName: String,
    placeFormatted: String,
    placeAddress: String?,
    placeDistance: Double,
    distance: Double,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = sitesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    let place = decodePlace(id: placeId, name: placeName, placeFormatted: placeFormatted,
                            address: placeAddress, distance: placeDistance)
    let options = SiteOptions.Builder().build()
    manager.fetchNear(place: place, radius: distance, options: options) { sites, _, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      resolve((sites ?? []).map { self.parseSite($0) })
    }
  }

  @objc func fetchSitesNearbyForInstance(
    _ appAuthId: String?,
    distance: Double,
    siteOptions: SiteOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = sitesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.fetchNearby(radius: distance, options: siteOptions) { sites, _, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      resolve((sites ?? []).map { self.parseSite($0) })
    }
  }

  @objc func checkIfOnSiteForInstance(
    _ appAuthId: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = sitesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.checkIfOnSite() { onSiteResult, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      resolve(onSiteResult != nil ? self.parseOnSiteResult(onSiteResult!) : nil)
    }
  }

  // MARK: - Places

  @objc func placesSuggestForInstance(
    _ appAuthId: String?,
    keyword: String,
    latitude: Double,
    longitude: Double,
    countryCodes: [String],
    types: [Int],
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = placesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    
    var builder = PlaceSuggestionOptions.Builder()
    for code in countryCodes { builder = builder.addCountryCode(code) }

    let mappedTypes = types.compactMap { placeTypeForInt($0) }
    if !mappedTypes.isEmpty {
      builder = builder.setTypes(mappedTypes)
    }

    if latitude != 0 || longitude != 0 {
      builder = builder.setProximity(latitude: latitude, longitude: longitude)
    }
    let options = builder.build()
    DispatchQueue.main.async {
      manager.suggest(query: keyword, options: options) { places, error in
        if let error {
          reject(error.localizedDescription, error.localizedDescription, error)
          return
        }
        resolve((places ?? []).compactMap { self.parsePlace($0) })
      }
    }
  }

  @objc func placesRetrieveForInstance(
    _ appAuthId: String?,
    placeId: String,
    name: String,
    placeFormatted: String,
    address: String?,
    distance: Double,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = placesManager(forAppAuthId: appAuthId, reject: reject) else { return }
    let place = decodePlace(id: placeId, name: name, placeFormatted: placeFormatted,
                            address: address, distance: distance)
    manager.retrieve(place: place) { coordinate, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let coordinate else {
        reject("fetch_place_error", "Error retrieving place location", nil)
        return
      }
      resolve(self.parseLocation(coordinate))
    }
  }

  // MARK: - Orders

  @objc func fetchOrdersForInstance(
    _ appAuthId: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.fetch { orders, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      resolve((orders ?? []).map { self.parseOrder($0) })
    }
  }

    @objc func fetchOrderByRedemptionCodeForInstance(
    _ appAuthId: String?,
    redeemCode: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.fetch(withRedemptionCode: redeemCode) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("fetch_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func claimOrderForInstance(
    _ appAuthId: String?,
    redeemCode: String,
    options: OrderOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.claim(withRedemptionCode: redeemCode, orderOptions: options) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("claim_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func createOrderWithSiteIdForInstance(
    _ appAuthId: String?,
    siteId: Int,
    options: OrderOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    
    manager.create(siteID: siteId, orderOptions: options, callback: { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("create_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    })
  }

  @objc func createOrderWithSitePartnerIdentifierForInstance(
    _ appAuthId: String?,
    sitePartnerIdentifier: String,
    options: OrderOptions,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    
    manager.create(sitePartnerIdentifier: sitePartnerIdentifier, orderOptions: options, callback: { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("create_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    })
  }

  @objc func updateOrderStateForInstance(
    _ appAuthId: String?,
    orderId: Int,
    state: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.updateOrderState(orderID: orderId, state: state) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("update_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func updateOrderCustomerStateForInstance(
    _ appAuthId: String?,
    orderId: Int,
    state: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.updateCustomerState(orderID: orderId, customerState: state) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("update_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func updateOrderCustomerStateWithSpotForInstance(
    _ appAuthId: String?,
    orderId: Int,
    state: String,
    spot: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.updateCustomerState(orderID: orderId, customerState: state, spotIdentifier: spot) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("update_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func rateOrderForInstance(
    _ appAuthId: String?,
    orderId: Int,
    rating: Int,
    comments: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.rateOrder(orderID: orderId, rating: rating, comments: comments) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("rate_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func rateOrderWithCategoriesForInstance(
    _ appAuthId: String?,
    orderId: Int,
    rating: Int,
    comments: String,
    categories: [String],
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    manager.rateOrder(orderID: orderId, rating: rating, comments: comments, categories: categories) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("rate_order_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  @objc func updatePickupMethodForInstance(
    _ appAuthId: String?,
    orderId: Int,
    pickupType: String,
    customerCarColor: String?,
    customerCarType: String?,
    customerLicensePlate: String?,
    handoffVehicleLocation: String?,
    transportMode: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let manager = ordersManager(forAppAuthId: appAuthId, reject: reject) else { return }
    var builder = PickupMethodOptions.Builder(pickupType: pickupType)
    if let v = customerCarType        { builder = builder.setCustomerCarType(v) }
    if let v = customerCarColor       { builder = builder.setCustomerCarColor(v) }
    if let v = customerLicensePlate   { builder = builder.setCustomerLicensePlate(v) }
    if let v = handoffVehicleLocation { builder = builder.setHandoffVehicleLocation(v) }
    manager.updatePickupMethod(orderID: orderId, pickupMethodOptions: builder.build()) { order, error in
      if let error { reject(error.localizedDescription, error.localizedDescription, error); return }
      guard let order else { reject("update_pickup_error", "nil order returned", nil); return }
      resolve(self.parseOrder(order))
    }
  }

  // MARK: - Deep Links

  @objc func parseReferrerUrl(
    _ referrerUrl: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let url = URL(string: referrerUrl) else {
      reject("invalid_referrer_url", "Invalid referrer URL", nil)
      return
    }
    let link = FlyBuy.Links.parse(url: url)
    resolve(parseLinkDetails(link))
  }

  // MARK: - Decoders

  private func decodeCustomerInfo(
    name: String,
    carType: String,
    carColor: String,
    licensePlate: String,
    phone: String?
  ) -> CustomerInfo {
    CustomerInfo(
      name: name.isEmpty ? " " : name,
      carType: carType,
      carColor: carColor,
      licensePlate: licensePlate,
      phone: phone ?? ""
    )
  }

  private func decodeRegion(latitude: Double, longitude: Double, radius: Double) -> FlyBuyCircularRegion {
    FlyBuyCircularRegion(
      latitude: latitude,
      longitude: longitude,
      radius: radius
    )
  }

  private func decodePickupWindow(start: String, end: String) -> PickupWindow {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [
      .withFullDate, .withTime, .withDashSeparatorInDate,
      .withColonSeparatorInTime, .withFractionalSeconds
    ]
    return PickupWindow(
      start: formatter.date(from: start) ?? Date(),
      end:   formatter.date(from: end)   ?? Date()
    )
  }

  private func decodePlace(
    id: String,
    name: String,
    placeFormatted: String,
    address: String?,
    distance: Double
  ) -> Place {
    Place(id: id, name: name, placeFormatted: placeFormatted,
          address: address ?? "", distance: distance)
  }

  // MARK: - Parsers

  private func parseCustomer(_ customer: Customer) -> [String: Any] {
    [
      "token":        customer.token        as Any,
      "emailAddress": customer.emailAddress as Any,
      "info":         parseCustomerInfo(customer.info)
    ]
  }

  private func parseCustomerInfo(_ info: CustomerInfo) -> [String: Any] {
    [
      "name":         info.name         as Any,
      "carType":      info.carType      as Any,
      "carColor":     info.carColor     as Any,
      "licensePlate": info.licensePlate as Any,
      "phone":        info.phone        as Any
    ]
  }

  private func parseSite(_ site: Site) -> [String: Any] {
    let prearrivalSeconds: Int = {
      let sel = NSSelectorFromString("prearrivalSeconds")
      guard (site as AnyObject).responds(to: sel) else { return 0 }
      return (site as AnyObject).value(forKey: "prearrivalSeconds") as? Int ?? 0
    }()
    return [
      "id":                site.id,
      "name":              site.name              ?? "",
      "phone":             site.phone             ?? "",
      "streetAddress":     site.streetAddress     ?? "",
      "fullAddress":       site.fullAddress       ?? "",
      "locality":          site.locality          ?? "",
      "region":            site.region            ?? "",
      "country":           site.country           ?? "",
      "postalCode":        site.postalCode        ?? "",
      "latitude":          site.latitude          ?? "",
      "longitude":         site.longitude         ?? "",
      "coverPhotoUrl":     site.coverPhotoURL     ?? "",
      "instructions":      site.instructions      ?? "",
      "description":       site.description,
      "partnerIdentifier": site.partnerIdentifier ?? "",
      "pickupConfig":      parsePickupConfig(site.pickupConfig),
      "operationalStatus": site.operationalStatus ?? "",
      "prearrivalSeconds": prearrivalSeconds,
      "distanceMeters":    site.distanceMeters ?? nil
    ]
  }

  private func parseOnSiteArea(_ onSiteArea: OnSiteArea) -> [String: Any] {
    return [
      "id":          onSiteArea.id,
      "name":        onSiteArea.name,
      "pickupTypes": onSiteArea.pickupTypes ?? [],
      "probability": onSiteArea.probability
    ]
  }

  private func parseOnSiteResult(_ onSiteResult: OnSiteResult) -> [String: Any] {
    [
      "site": onSiteResult.site != nil ? parseSite(onSiteResult.site!) : nil,
      "isOnSite": onSiteResult.isOnSite,
      "areas":  (onSiteResult.areas).map { parseOnSiteArea($0) }
    ]
  }

  private func parsePickupConfig(_ config: PickupConfig?) -> [String: Any] {
    guard let config else { return [:] }
    return [
      "accentColor":                config.accentColor,
      "accentTextColor":            config.accentTextColor,
      "askToAskImageURL":           config.askToAskImageURL          ?? "",
      "customerNameEditingEnabled": config.customerNameEditingEnabled,
      "id":                         config.id,
      "pickupTypeSelectionEnabled": config.pickupTypeSelectionEnabled,
      "privacyPolicyURL":           config.privacyPolicyURL          ?? "",
      "termsOfServiceURL":          config.termsOfServiceURL         ?? "",
      "type":                       config.type,
      "availablePickupTypes":       (config.availablePickupTypes).map { parsePickupTypeConfig($0) }
    ]
  }

  private func parsePickupTypeConfig(_ config: PickupTypeConfig) -> [String: Any] {
    [
      "pickupType":                config.pickupType,
      "pickupTypeLocalizedString": config.pickupTypeLocalizedString,
      "requireVehicleInfo":        config.requireVehicleInfo,
      "showVehicleInfoFields":     config.showVehicleInfoFields
    ]
  }

  private func parsePagination(_ pagination: Pagination?) -> [String: Any]? {
    guard let pagination else { return nil }
    return [
      "currentPage": pagination.currentPage,
      "totalPages":  pagination.totalPages
    ]
  }

private func parseOrder(_ order: Order) -> [String: Any] {
    var dict: [String: Any] = [:]
    
    dict["id"] = order.id
    dict["state"] = order.state
    dict["customerState"] = order.customerState.description.lowercased()
    dict["partnerIdentifier"] = order.partnerIdentifier
    dict["partnerIdentifierForCustomer"] = order.partnerIdentifierForCustomer
    dict["partnerIdentifierForCrew"] = order.partnerIdentifierForCrew
    
    dict["pickupWindow"] = [
      order.pickupWindow?.start.description,
      order.pickupWindow?.end.description
    ]
    
    dict["pickupType"] = order.pickupType
    dict["etaAt"] = order.etaAt?.description
    dict["redemptionCode"] = order.redemptionCode
    dict["redeemedAt"] = order.redeemedAt?.description
    dict["createdAt"] = order.createdAt?.description
    dict["orderFiredAt"] = order.orderFiredAt?.description
    dict["customerRating"] = order.customerRating
    dict["customerComment"] = order.customerComment
    dict["customerRatingCategories"] = order.customerRatingCategories

    dict["siteID"] = order.siteID
    dict["siteName"] = order.siteName
    dict["sitePhone"] = order.sitePhone
    dict["siteFullAddress"] = order.siteFullAddress
    dict["siteLongitude"] = order.siteLongitude
    dict["siteLatitude"] = order.siteLatitude
    dict["siteInstructions"] = order.siteInstructions
    dict["siteDescription"] = order.siteDescription
    dict["siteCoverPhotoURL"] = order.siteCoverPhotoURL

    dict["customerName"] = order.customerName
    dict["customerCarType"] = order.customerCarType
    dict["customerCarColor"] = order.customerCarColor
    dict["customerLicensePlate"] = order.customerLicensePlate

    dict["spotIdentifer"] = order.spotIdentifer
    dict["spotIdentifier"] = order.spotIdentifer
    dict["spotIdentifierInputType"] = order.spotIdentifierInputType
    
    // Safely parse properties that might not exist in older FlyBuy SDK versions
    let selReady = NSSelectorFromString("estimatedReadyAt")
    if (order as AnyObject).responds(to: selReady) {
      dict["estimatedReadyAt"] = ((order as AnyObject).value(forKey: "estimatedReadyAt") as? NSDate)?.description
    }
    
    dict["displayName"] = order.displayName
    
    let selLoc = NSSelectorFromString("handoffVehicleLocation")
    if (order as AnyObject).responds(to: selLoc) {
      dict["handoffVehicleLocation"] = (order as AnyObject).value(forKey: "handoffVehicleLocation") as? String
    }
    
    return dict
  }

  private func parsePlace(_ place: Place) -> [String: Any] {
    [
      "id":             place.id             as Any,
      "name":           place.name           as Any,
      "address":        place.address        as Any,
      "distance":       place.distance,
      "placeFormatted": place.placeFormatted as Any
    ]
  }

  private func parseLocation(_ location: Coordinate) -> [String: Any] {
    // TODO: expose latitude/longitude on Coordinate and populate here
    [:]
  }

  private func parseLinkDetails(_ link: LinkDetails) -> [String: Any] {
    // TODO: populate from Link properties as needed
    [:]
  }

  // MARK: - Utilities

  private func placeTypeForInt(_ value: Int) -> FlyBuy.PlaceType {
    switch value {
    case 0:    return .address
    case 1, 2: return .region
    case 3:    return .city
    case 4:    return .poi
    default:   return .address
    }
  }
}
