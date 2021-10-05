import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './HomeScreen';
import AddPersonScreen from './AddPeopleScreen';

import FloatingButton from './FloatingButton';

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen name="AddPeople" component={AddPersonScreen} options={{ title: 'Add People' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
// export default function App() {
//     return (
//         <View style={styles.container}>
//             <Text>Open up App.tsx to start working on your app!</Text>
//             <FloatingButton />
//             <StatusBar style="auto" />
//         </View>
//     );
// }


