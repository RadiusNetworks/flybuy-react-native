package com.radiusnetworks.reactnative.flybuy.presence

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

abstract class RnFlybuyPresenceSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyPresenceSpec(context) {

  override abstract fun startLocatorWithIdentifier(id: String, payload: String, promise: Promise)
  override abstract fun stopLocator(promise: Promise)
}
