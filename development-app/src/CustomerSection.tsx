import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as FlyBuyCore from '@radiusnetworks/react-native-flybuy-core';
import {Button, SectionTitle} from './components';
import {CUSTOMER_INFO} from './constants';
import {useAppState} from './AppState';

export const CustomerSection = () => {
  const {selectedAppAuthId} = useAppState();

  const login = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.login('username@gmail.com', 'password')
      .then(customer => console.log(customer))
      .catch(err => console.error(err));
  };

  const loginWithToken = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.loginWithToken('TOKEN')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const signUp = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.signUp('username@gmail.com', 'password')
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const logout = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.logout()
      .then(() => console.log('logout success'))
      .catch(err => console.log(err));
  };

  const createCustomer = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.create(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const updateCustomer = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.update(CUSTOMER_INFO)
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  const getCurrentCustomer = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .customer.getCurrent()
      .then(customer => console.log('customer', customer))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Customer" />
      <Button title="Login" onPress={login} />
      <Button title="signUp" onPress={signUp} />
      <Button title="loginWithToken" onPress={loginWithToken} />
      <Button title="logout" onPress={logout} />
      <Button title="create Customer" onPress={createCustomer} />
      <Button title="getCurrentCustomer" onPress={getCurrentCustomer} />
      <Button title="updateCustomer" onPress={updateCustomer} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
