[**Documentation**](../../../README.md)

***

# Function: addOrderUpdatedListener()

> **addOrderUpdatedListener**(`callback`): `object`

Defined in: [index.tsx:70](https://github.com/RadiusNetworks/flybuy-react-native/blob/main/mono/packages/core/src/index.tsx#L70)

Subscribe to order updated events. Works in both bridge and TurboModule mode.
When only TurboModule is available (e.g. New Arch), returns a no-op subscription
so callers never pass null to NativeEventEmitter (which throws on iOS).

## Parameters

### callback

(`event`) => `void`

Called when an order is updated.

## Returns

`object`

Subscription with remove() to unsubscribe.

### remove

> **remove**: () => `void`

#### Returns

`void`
