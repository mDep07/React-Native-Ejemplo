import React from 'react';
import { StyleSheet, Button, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';

import FloatingButton from './FloatingButton';

export default function AddPeopleScreen({ navigation }: { navigation: any }) {
    const initialState= { name: '', lastName: '', description: ''}
    const [newPeople, setNewPeople] = React.useState(initialState);

    const handleChange = (text: string, name: string) => {
        setNewPeople({...newPeople, [name]: text})
    }

    const handleSaveChanges = async () => {
        // if(newPeople.name !== '' && newPeople.lastName !== '') {
        //     const jsonValue = JSON.stringify({...newPeople})
        //     await AsyncStorage.mergeItem('peoples', jsonValue);
        // }

        navigation.navigate('Home');
    }
    
    return (
        <View style={styles.container}>
            <View>
            <TextInput
                style={styles.input}
                label="Name"
                value={newPeople.name}
                dense
                onChangeText={text => handleChange(text, 'name')}
            />
            <TextInput
                style={styles.input}
                label="Last Name"
                value={newPeople.lastName}
                dense
                onChangeText={text => handleChange(text, 'lastName')}
            />
            <TextInput
                style={styles.input}
                label="Description"
                value={newPeople.description}
                dense
                onChangeText={text => handleChange(text, 'description')}
            />
            </View>
            <Text>{newPeople.name} {newPeople.lastName}</Text>
            <FloatingButton handlePress={handleSaveChanges} icon="check" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        marginBottom: 10
    }
});