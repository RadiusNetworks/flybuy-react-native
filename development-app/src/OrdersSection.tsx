import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyCore from '@radiusnetworks/react-native-flybuy-core';
import {
  addOrderUpdatedListener,
  CustomerState,
  IOrder,
  OrderStateType,
  PickupType,
  PickupMethodOptions,
} from '@radiusnetworks/react-native-flybuy-core';
import {Button, OrderItem, SectionTitle} from './components';
import {
  CUSTOMER_INFO,
  NEW_PID,
  ORDER_ID,
  SITE_ID,
  SITE_ID_2,
  SITE_PID,
} from './constants';
import {useAppState} from './AppState';

export const OrdersSection = () => {
  const {selectedAppAuthId} = useAppState();

  useEffect(() => {
    const subscription = addOrderUpdatedListener((event: IOrder) => {
      console.log('order updated', event);
    });
    return () => subscription.remove();
  }, []);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const fetchOrders = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.fetch()
      .then((result: IOrder[]) => {
        console.log('orders', result);
        setOrders(result);
      })
      .catch(err => console.log(err));
  };

  const createOrderWithPartnerIdentification = () => {
    const options = {
      partnerIdentifier: NEW_PID,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.createWithSitePartnerIdentifier(SITE_PID, options)
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const createOrder = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    const pickupWindow = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    const options = {
      partnerIdentifier: NEW_PID,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
      pickupWindow: pickupWindow,
      state: OrderStateType.DELAYED,
      pickupType: PickupType.DELIVERY,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.createWithSiteId(
        selectedAppAuthId === '725' || selectedAppAuthId === '726'
          ? SITE_ID
          : SITE_ID_2,
        options,
      )
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  const createOrderWithThreeParams = () => {
    const options = {
      partnerIdentifier: NEW_PID,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.createWithSiteId(
        selectedAppAuthId === '50' || selectedAppAuthId === '51'
          ? SITE_ID
          : SITE_ID_2,
        options,
      )
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.error(err));
  };

  const createOrderWithFourParams = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    const pickupWindow = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    const options = {
      partnerIdentifier: NEW_PID,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
      pickupWindow: pickupWindow,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.createWithSiteId(
        selectedAppAuthId === '50' || selectedAppAuthId === '51'
          ? SITE_ID
          : SITE_ID_2,
        options,
      )
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const createOrderWithFiveParams = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    const pickupWindow = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    const options = {
      partnerIdentifier: NEW_PID,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
      pickupWindow: pickupWindow,
      state: OrderStateType.DELAYED,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.createWithSiteId(
        selectedAppAuthId === '50' || selectedAppAuthId === '51'
          ? SITE_ID
          : SITE_ID_2,
        options,
      )
      .then((order: IOrder) => {
        console.log('order', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const claimOrder = () => {
    const options = {
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
      pickupType: PickupType.PICKUP,
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.claim('5GOQ6G7PP7BO', options)
      .then((order: IOrder) => console.log('claim order', order))
      .catch(err => console.log(err));
  };

  const fetchOrderByRedemptionCode = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.fetchByRedemptionCode('5GOQ6G7PP7BO')
      .then((order: IOrder) => console.log('order by redeemCode', order))
      .catch(err => console.log(err));
  };

  const updateOrderState = (
    orderId = ORDER_ID,
    orderState = OrderStateType.DRIVER_ASSIGNED,
  ) => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.updateState(orderId, orderState)
      .then((order: IOrder) => {
        console.log('updateOrderState', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const updateOrderCustomerState = (
    orderId: number,
    customerState: CustomerState,
    spotIdentifier: string | null,
  ) => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.updateCustomerState(orderId, customerState, spotIdentifier)
      .then((order: IOrder) => console.log('updateOrderCustomerState', order))
      .catch(err => console.log(err));
  };

  const rateOrder = (orderId: number) => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.rateOrder(orderId ?? ORDER_ID, 5, 'Awesome!')
      .then(order => console.log('rateOrder', order))
      .catch(err => console.log(err));
  };

  const rateOrderWithCategories = (orderId: number) => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.rateOrder(orderId ?? ORDER_ID, 5, 'Awesome!', [
        'service',
        'quality',
      ])
      .then(order => console.log('rateOrder', order))
      .catch(err => console.log(err));
  };

  const updatePickupMethod = (
    orderId: number,
    options: PickupMethodOptions,
  ) => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .orders.updatePickupMethod(orderId, options)
      .then(order => console.log('updatePickupMethod', order))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Orders" />
      <Button title="Fetch orders" onPress={fetchOrders} />

      {orders.map(item => {
        return (
          <OrderItem
            key={item.id}
            data={item}
            onUpdatePickupMethod={options => {
              updatePickupMethod(item.id, options);
            }}
            onUpdateOrderState={orderState =>
              updateOrderState(item.id, orderState)
            }
            onRateOrder={rateOrder}
            onRateOrderWithCategories={rateOrderWithCategories}
            onCustomerState={(orderId, customerState, spotIdentifier) => {
              updateOrderCustomerState(item.id, customerState, spotIdentifier);
            }}
          />
        );
      })}

      <Button title="Create order" onPress={createOrder} />
      <Button
        title="Create order 3 Params"
        onPress={createOrderWithThreeParams}
      />
      <Button
        title="Create order 4 Params"
        onPress={createOrderWithFourParams}
      />
      <Button
        title="Create order 5 Params"
        onPress={createOrderWithFiveParams}
      />
      <Button
        title="Create order with site partner identification"
        onPress={createOrderWithPartnerIdentification}
      />
      <Button
        title="Fetch Order By RedemptionCode"
        onPress={fetchOrderByRedemptionCode}
      />
      <Button title="claimOrder" onPress={claimOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },

  button: {
    textAlign: 'center',
  },
});
