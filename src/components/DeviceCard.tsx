import { 
    Text, 
    TouchableOpacity,
    StyleSheet 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Device } from 'react-native-ble-plx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';

type DeviceCardProps = {
    device: Device
};

const DeviceCard = ({ device }: DeviceCardProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
      // Esta el dispositivo conectado?
      device.isConnected().then(setIsConnected)
    }, [device])
    
    return (
        <TouchableOpacity
            style={styles.container}
            // Para navegar a la pantalla de DeviceScreen
            onPress={()=> navigation.navigate('Device', {device})}
        >
            <Text> {`Id : ${device.id}`} </Text>
            <Text> {`Name : ${device.name}`} </Text>
            <Text> {`Is connected : ${isConnected}`} </Text>
            <Text> {`RSSI : ${device.rssi}`} </Text>
            <Text></Text>
            <Text> {`ServiceData : ${device.serviceData}`} </Text>
            <Text> {`UUIDS : ${device.serviceUUIDs}`} </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      marginBottom: 12,
      borderRadius: 16,
      shadowColor: 'rgba(60,64,67,0.3)',
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 4,
      padding: 12,
    },
  });

export default DeviceCard