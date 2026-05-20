package com.radiusnetworks.reactnative.flybuy.pickup

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

abstract class RnFlybuyPickupSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyPickupSpec(context) {
  override abstract fun onPermissionChanged(promise: Promise)
}
