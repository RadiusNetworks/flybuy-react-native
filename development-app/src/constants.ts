import Config from 'react-native-config';
import {Platform} from 'react-native';

export const APP_TOKEN =
  Platform.OS === 'ios'
    ? Config.IOS_APP_TOKEN ?? ''
    : Config.ANDROID_APP_TOKEN ?? '';

export const APP_TOKEN_2 =
  Platform.OS === 'ios'
    ? Config.IOS_APP_TOKEN_2 ?? ''
    : Config.ANDROID_APP_TOKEN_2 ?? '';

export const APP_AUTH_ID = APP_TOKEN.split('.')[0] ?? '';
export const APP_AUTH_ID_2 = APP_TOKEN_2.split('.')[0] ?? '';

export const PRESENCE_UUID = Config.PRESENCE_UUID ?? '';

export const CUSTOMER_INFO = {
  name: 'Marty McFly',
  carType: 'DeLorean',
  carColor: 'Silver',
  licensePlate: 'OUTATIME',
  phone: '555-555-5555',
};

export const ORDER_ID = 622533;
export const SITE_ID = 408;
export const SITE_ID_2 = 869;
export const NEW_PID = '01380326932';
export const SITE_PID = '8888';

export const REGION = {
  latitude: 38.903444,
  longitude: -77.064789,
  radius: 10000,
};

export const NOTIFICATION = {
  title: 'Test Notification',
  message: 'Test Notification message',
  data: {
    key1: 'value',
    key2: 'value',
  },
};
