package com.radiusnetworks.reactnative.flybuy.presence

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class RnFlybuyPresenceSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun startLocatorWithIdentifier(id: String, payload: String, promise: Promise)
  abstract fun stopLocator(promise: Promise)
}
