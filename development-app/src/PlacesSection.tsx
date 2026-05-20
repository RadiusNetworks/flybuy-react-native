import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import * as FlyBuyCore from '@radiusnetworks/react-native-flybuy-core';
import {Button, SectionTitle} from './components';
import {useAppState} from './AppState';

export const PlacesSection = () => {
  const {selectedAppAuthId} = useAppState();
  const [keyword, setKeyword] = useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState<FlyBuyCore.IPlace[]>(
    [],
  );
  const [_selectedPlace, setSelectedPlace] = useState<FlyBuyCore.IPlace>();

  const suggestPlaces = useCallback(() => {
    FlyBuyCore.getInstance(selectedAppAuthId)
      .places.suggest(keyword, {
        types: [FlyBuyCore.PlaceType.ADDRESS, FlyBuyCore.PlaceType.CITY],
      })
      .then((places: FlyBuyCore.IPlace[]) => setSuggestedPlaces(places))
      .catch(err => console.log('err', err));
  }, [keyword, selectedAppAuthId]);

  useEffect(() => {
    suggestPlaces();
  }, [keyword, suggestPlaces]);

  const clearSuggestion = () => {
    setSuggestedPlaces([]);
    setKeyword('');
  };

  const handleSuggestedLocationPress = (place: FlyBuyCore.IPlace) => {
    clearSuggestion();
    setSelectedPlace(place);
    FlyBuyCore.getInstance(selectedAppAuthId)
      .sites.fetchNearPlace(place, 10000)
      .then(console.log)
      .catch(console.warn);
  };

  const handleRetrieveLocationPress = (place: FlyBuyCore.IPlace) => {
    clearSuggestion();
    setSelectedPlace(place);
    FlyBuyCore.getInstance(selectedAppAuthId)
      .places.retrieve(place)
      .then(result =>
        Alert.alert(`Coordinate for ${place.name}`, JSON.stringify(result)),
      )
      .catch(console.warn);
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Places" />
      <TextInput
        placeholder="Type keyword"
        onChangeText={setKeyword}
        style={styles.input}
        value={keyword}
        onSubmitEditing={suggestPlaces}
        blurOnSubmit
        autoCorrect={false}
        spellCheck={false}
      />
      {suggestedPlaces.map(item => (
        <View key={item.id} style={styles.suggestedPlace}>
          <Text>{`${item.name} - ${item.placeFormatted}`}</Text>
          <Text
            onPress={() => {
              handleSuggestedLocationPress(item);
            }}>
            Click to fetch sites near this location
          </Text>
          <Text
            onPress={() => {
              handleRetrieveLocationPress(item);
            }}>
            Retrieve Location
          </Text>
        </View>
      ))}
      <Button title="suggestPlace" onPress={suggestPlaces} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 8,
    minHeight: 44,
  },
  suggestedPlace: {
    margin: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
});
