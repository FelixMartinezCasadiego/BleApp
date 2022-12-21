import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Segunda from '../screens/Segunda';
import DeviceScreen from '../screens/DeviceScreen';
import { Device } from 'react-native-ble-plx';

export type RootStackParamList = {
    Segunda: undefined;
    Device: {device: Device}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {

    return (

        <Stack.Navigator>
            <Stack.Screen name='Segunda' component={Segunda} />
            <Stack.Screen name='Device' component={DeviceScreen} />
        </Stack.Navigator>

    )
}

export default Navigation