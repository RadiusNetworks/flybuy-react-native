#import <UIKit/UIKit.h>

// iOS 27 requires the UIScene life cycle for apps built with its SDK; without it the app aborts at launch.
@interface SceneDelegate : UIResponder <UIWindowSceneDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
