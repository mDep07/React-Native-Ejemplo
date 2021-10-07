import React from 'react';
import { StyleSheet, Button, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';

import FloatingButton from './FloatingButton';
import { db } from './Db';

export default function AddPeopleScreen({ navigation }: { navigation: any }) {
    const initialState= { name: '', lastName: '', description: ''}
    const [newPeople, setNewPeople] = React.useState(initialState);

    const handleChange = (text: string, name: string) => {
        setNewPeople({...newPeople, [name]: text})
    }

    const handleSaveChanges = async () => {
        if(newPeople.name !== '' && newPeople.lastName !== '') {
            db.transaction(
                (tx) => {
                    tx.executeSql("insert into peoples (name, lastName, description) values (?, ?, ?)", [newPeople.name, newPeople.lastName, newPeople.description]);
                    tx.executeSql("select * from peoples", [], (_, { rows }) =>
                        console.log('Peoples:', JSON.stringify(rows))
                    );
                }
            );
        }

        navigation.navigate('Home');
    }
    
    return (
        <View style={styles.container}>
            <View>
            <TextInput
                autoFocus
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