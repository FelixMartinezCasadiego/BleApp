import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Characteristic } from 'react-native-ble-plx';

type CharacteristicCardProps = {
    char: Characteristic;
};

const CharacteristicCard = ({char} : CharacteristicCardProps) => {
  return (
    <View>
      <Text> {`isIndicatable : ${char.isIndicatable}`} </Text>
      <Text> {`isNotifiable : ${char.isNotifiable}`} </Text>
      <Text> {`isNotifying : ${char.isNotifying}`} </Text>
      <Text> {`isReadable : ${char.isReadable}`} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginVertical: 12,
      borderRadius: 16,
      shadowColor: 'rgba(60,64,67,0.3)',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      padding: 12,
    },
  });

export default CharacteristicCard