declare module 'react-native-config' {
  export interface NativeConfig {
    ANDROID_APP_TOKEN?: string;
    ANDROID_APP_TOKEN_2?: string;
    IOS_APP_TOKEN?: string;
    IOS_APP_TOKEN_2?: string;
    PRESENCE_UUID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
