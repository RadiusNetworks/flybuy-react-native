#import "SceneDelegate.h"
#import "AppDelegate.h"

@implementation SceneDelegate

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions
{
  if (![scene isKindOfClass:[UIWindowScene class]]) {
    return;
  }

  // AppDelegate sets automaticallyLoadReactNativeWindow = NO, so the React Native root view is created here,
  // in a window attached to this scene, instead of in a screen-sized window from didFinishLaunching.
  AppDelegate *appDelegate = (AppDelegate *)UIApplication.sharedApplication.delegate;
  UIView *rootView = [appDelegate.rootViewFactory viewWithModuleName:appDelegate.moduleName
                                                   initialProperties:appDelegate.initialProps
                                                       launchOptions:nil];

  self.window = [[UIWindow alloc] initWithWindowScene:(UIWindowScene *)scene];
  UIViewController *rootViewController = [appDelegate createRootViewController];
  [appDelegate setRootView:rootView toRootViewController:rootViewController];
  self.window.rootViewController = rootViewController;

  // Mirror the window onto the app delegate so code that reads UIApplication.sharedApplication.delegate.window keeps working.
  appDelegate.window = self.window;
  [self.window makeKeyAndVisible];
}

@end
