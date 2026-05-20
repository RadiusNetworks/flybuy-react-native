import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, SectionTitle} from './components';
import * as FlyBuyCore from '@radiusnetworks/react-native-flybuy-core';
import {REGION} from './constants';
import {useAppState} from './AppState';

export const SitesSection = () => {
  const {selectedAppAuthId} = useAppState();

  const fetchSitesByRegion = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.fetchByRegion(REGION)
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const fetchSiteByPartnerIdentifier = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.fetchByPartnerIdentifier(
        selectedAppAuthId === '50' || selectedAppAuthId === '51'
          ? '8888'
          : '9999',
      )
      .then(site => console.log('site', site))
      .catch(err => console.log('err', err));
  };

  const fetchSitesNearPlace = () => {
    const place: FlyBuyCore.IPlace = {
      id: 'test',
      name: 'Mataram',
      placeFormatted: 'Mataram',
    };
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.fetchNearPlace(place, 1000)
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const fetchNearby = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.fetchNearby(10000)
      .then(sites => console.log('sites', sites))
      .catch(err => console.log('err', err));
  };

  const checkIfOnSite = () => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.checkIfOnSite()
      .then(onSiteResult => console.log('onSiteResult', onSiteResult))
      .catch(err => console.log('err', err));
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Sites" />
      <Button title="fetchSitesByRegion" onPress={fetchSitesByRegion} />
      <Button
        title="fetchSiteByPartnerIdentifier"
        onPress={fetchSiteByPartnerIdentifier}
      />
      <Button title="fetchSitesNearPlace" onPress={fetchSitesNearPlace} />
      <Button title="fetchNearby" onPress={fetchNearby} />
      <Button title="checkIfOnSite" onPress={checkIfOnSite} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
});
