import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import * as FlyBuyCore from '@radiusnetworks/react-native-flybuy-core';
import {Button} from './components';

// Add your Flybuy Sandbox Site ID Here

const SITE_ID = 23436;

// Defines Customer Information

const CUSTOMER_INFO = {
  name: 'React Test',
  carType: 'Honda',
  carColor: 'Silver',
  licensePlate: 'Nothing',
  phone: '555-555-5555',
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.flexOne}>
        <Text>{'#id'}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text>{'#PatnerId'}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text numberOfLines={1}>{'Customer'}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.enRoute}>{'State'}</Text>
      </View>
    </View>
  );
};

const OrderItem = ({order, onUpdate}: {order: FlyBuyCore.IOrder; onUpdate: () => void}) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.flexOne}>
        <Text>{order.id}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text>{order.partnerIdentifier}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text numberOfLines={1}>{order.customerName}</Text>
      </View>
      <View style={styles.flexOne}>
        {order.customerState === 'created' && (
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
              <Text>Start</Text>
            </TouchableOpacity>
          </View>
        )}
        {order.customerState === 'en_route' && (
          <Text style={styles.enRoute}>{'On the way'}</Text>
        )}
      </View>
    </View>
  );
};

export default function App() {
  const [orders, setOrders] = useState<FlyBuyCore.IOrder[]>([]);
  const [partnerId, setPartnerId] = useState('');
  const [loading, setLoading] = useState(false);
  // Orders
  const fetchOrders = () => {
    setLoading(true);
    FlyBuyCore.getInstance().orders.fetch()
      .then((data: FlyBuyCore.IOrder[]) => {
        setOrders([...data]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // "pickupWindow", "OrderState", and "PickupType" are optional fields in the CreateOrder
  // If you leave out "pickupWindow", the pickup window will be set to ASAP

  const createOrder = () => {
    const pickup_start = new Date();
    var pickup_end = new Date(pickup_start);
    pickup_end.setHours(pickup_start.getHours() + 1);

    const pickupWindow = {
      start: pickup_start.toISOString(),
      end: pickup_end.toISOString(),
    };

    const options = {
      partnerIdentifier: partnerId,
      customerName: CUSTOMER_INFO.name,
      customerCarType: CUSTOMER_INFO.carType,
      customerCarColor: CUSTOMER_INFO.carColor,
      customerLicensePlate: CUSTOMER_INFO.licensePlate,
      pickupWindow: pickupWindow,
      orderState: FlyBuyCore.OrderStateType.DELAYED,
      pickupType: FlyBuyCore.PickupType.DELIVERY,
    };

    console.log('params', options);
    FlyBuyCore.getInstance().orders.createOrderWithSiteId(SITE_ID, options)
      .then((order: FlyBuyCore.IOrder) => {
        console.log('order is created!', order);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  const updateToStart = (order: FlyBuyCore.IOrder) => {
    FlyBuyCore.getInstance().orders.updateOrderCustomerState(
      order.id,
      FlyBuyCore.CustomerState.EN_ROUTE,
    )
      .then(() => {
        fetchOrders();
      })
      .catch(err => console.log('error on catch-->', err));
  };

  const login = () => {
    FlyBuyCore.getInstance().customer.login('username@gmail.com', 'password')
      .then(customer => {
        console.log('customer', customer);
        fetchOrders();
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({item}: {item: FlyBuyCore.IOrder}) => (
    <OrderItem
      order={item}
      onUpdate={() => {
        updateToStart(item);
      }}
    />
  );
  const onChangePid = (e: React.SetStateAction<string>) => {
    setPartnerId(e);
  };
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={login} />
      <Header />
      {loading && <ActivityIndicator color="white" size="large" />}
      <FlatList
        style={styles.list}
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
      <Button title="New Order With" onPress={createOrder} />
      <TextInput
        placeholder="Partner ID"
        style={styles.partner}
        value={partnerId}
        onChangeText={e => {
          onChangePid(e);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  enRoute: {
    textAlign: 'right',
    color: 'green',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  partner: {
    width: 150,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  updateBtn: {
    backgroundColor: '#23fe24',
    borderRadius: 8,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: 40,
  },
  orderItem: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  header: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    color: 'white',
    marginTop: 30,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
  flexOne: {
    flex: 1,
  },
});
