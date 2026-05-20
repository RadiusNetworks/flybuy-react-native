package com.radiusnetworks.reactnative.flybuy.notify

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap

abstract class RnFlybuyNotifySpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyNotifySpec(context) {

  override abstract fun configure(bgTaskIdentifer: String?, promise: Promise)
  override abstract fun clearNotifications(promise: Promise)
  override abstract fun createForSitesInRegion(region: ReadableMap, notification: ReadableMap, promise: Promise)
  override abstract fun onPermissionChanged()
  override abstract fun sync(force: Boolean, promise: Promise)
}
