#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyCoreSpec.h"
#import <React/RCTEventEmitter.h>


@interface RnFlybuyCore : RCTEventEmitter <NativeRnFlybuyCoreSpec>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RnFlybuyCore : RCTEventEmitter <RCTBridgeModule>
#endif

@end
