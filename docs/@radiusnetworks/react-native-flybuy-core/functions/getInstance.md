[**Documentation**](../../../README.md)

***

# Function: getInstance()

> **getInstance**(`appAuthId?`): [`Instance`](../type-aliases/Instance.md)

Defined in: [index.tsx:214](https://github.com/RadiusNetworks/flybuy-react-native/blob/main/mono/packages/core/src/index.tsx#L214)

Returns a scoped accessor for a FlyBuy instance associated with the given appAuthId.
If no AppAuthId is provided, the FlyBuy instance associated with the primary project is returned.

Usage:
  ```
  FlyBuyCore.getInstance().sites.fetchAllSites()            // primary instance
  FlyBuyCore.getInstance("139").sites.fetchAllSites()       // instance associated with appAuthId 139
  ```

## Parameters

### appAuthId?

`string` \| `null`

## Returns

[`Instance`](../type-aliases/Instance.md)
