import { 
    View, 
    Text,
    StyleSheet, 
    ScrollView,
    Button
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/Navigation'
import { Service } from 'react-native-ble-plx'
import ServiceCard from '../components/ServiceCard'

const DeviceScreen = ({route, navigation}: NativeStackScreenProps<RootStackParamList, 'Device'>) => {

    // obtención del objeto del dispositivo que se proporcionó a través de los parámetros de navegación
    const {device} = route.params;

    const [isConnected, setIsConnected] = useState(false);
    const [services, setServices] = useState<Service[]>([]);

    // manejo de desconectar dispositivo
    const disconnectDevice = useCallback(async () => {
        navigation.goBack();
        const isDeviceConnected = await device.isConnected();
        if(isDeviceConnected) {
            await device.cancelConnection();
        }
    }, [device, navigation]);

    useEffect(() => {
        const getDeviceInformations = async () => {
            // dispositivo conectado
            const connectedDevice = await device.connect();
            setIsConnected(true);

            // descubrir todos los servicios y características del dispositivo
            const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();

            // obtener solo los servicios
            const discoveredServices = await allServicesAndCharacteristics.services();
            setServices(discoveredServices);
        }

        getDeviceInformations();

        device.onDisconnected(() => {
            navigation.navigate('Segunda')
        });

        // obtener un callback al useEffect para desconectarse cuando el dispositivo deje esta pantalla
        return () => {
            disconnectDevice();
        };
    }, [device, disconnectDevice, navigation])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button 
                title='desconectarse'
                onPress={disconnectDevice}
            />
            <View>
                <View style={styles.header}>
                    <Text> {`Id : ${device.id}`} </Text>
                    <Text> {`Name : ${device.name}`} </Text>
                    <Text> {`Is connected : ${isConnected}`} </Text>
                    <Text> {`RSSI : ${device.rssi}`} </Text>
                    <Text> {``} </Text>
                    <Text> {`ServiceData : ${device.serviceData}`} </Text>
                    <Text> {`UUIDS : ${device.serviceUUIDs}`} </Text>
                </View>
                {/* Mostrar una lista de los servicios */}
                {
                    services && services.map((service) => <ServiceCard service={service} /> )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 12,
    },
  
    header: {
      backgroundColor: 'teal',
      marginBottom: 12,
      borderRadius: 16,
      shadowColor: 'rgba(60,64,67,0.3)',
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 4,
      padding: 12,
    },
  });

export default DeviceScreen