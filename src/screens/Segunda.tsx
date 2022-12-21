import { 
    View, 
    Text,
    StyleSheet, 
    Button,
    ActivityIndicator,
    FlatList
} from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BleManager, Device } from 'react-native-ble-plx';
import { theme } from '../theme/theme';
import DeviceCard from '../components/DeviceCard';

const manager = new BleManager();

const dispositivoReducer = (
    state: Device[],
    action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
) : Device[] => {
    switch (action.type) {
        case 'ADD_DEVICE':
            const { payload: device } = action;

            if(device && !state.find((dev) => dev.id === device.id)) {
                return [...state, device];
            }
            return state;
        case 'CLEAR' : 
            return [];
        default:
            return state;
    }
};

const Segunda = () => {

    // dispositivoReducer to store and display detected ble devices
    const [scannedDevices, dispatch] = useReducer(dispositivoReducer, []);

    // estado para darle al usuario un feedback acerca del scanning de los dispositivos
    const [isLoading, setIsLoading] = useState(false);

    const scanDevices = () => {
        // display del Activityindicator (rueda de carga para el usuario)
        setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if(error) {
                console.warn(error);
            }

            // si un dispositivo es detectado, se agrega a la lista por el dispatching de la accion dentro del dispositivoReducer
            if(scannedDevice) {
                dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
            }
        });

        // parar scanning de dispositivos despues de 5min
        setTimeout(() => {
            manager.stopDeviceScan();
            setIsLoading(false)
        }, 5000);
    };

    const ListHeaderComponent = () => (
        <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Button 
                    title='Borrar dispositivos'
                    onPress={() => dispatch({type: 'CLEAR'})}
                />
                {
                    isLoading ? (
                        <View style={styles.activityIndicatorContainer}>
                            <ActivityIndicator color={'teal'} size={25} />
                        </View>
                    ) : 
                        (
                            <Button title='Escanear dispositivos' onPress={scanDevices} />
                        )
                }
            </View>
        </View>
    );

    useEffect(() => {
        return () => {
            manager.destroy();
        };
    }, [])
    
    return (
        <SafeAreaView style={styles.body}>
            <FlatList 
                keyExtractor={(item) => item.id}
                data={scannedDevices}
                renderItem={({ item }) => <DeviceCard device={item} /> }
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={styles.content}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
      backgroundColor: '#FF0000',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: '#8B0000',
    },
    content: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing * 2,
    },
    activityIndicatorContainer: { marginVertical: 6 },
  });

export default Segunda