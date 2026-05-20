package com.radiusnetworks.reactnative.flybuy.livestatus

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class RnFlybuyLivestatusSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun configure(
    icon: String,
    statusTintColor: String?,
    statusTintDarkModeColor: String?,
    promise: Promise
  )
}
