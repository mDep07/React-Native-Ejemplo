import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View } from "react-native";
import { TextInput, Title } from 'react-native-paper';

import FloatingButton from './FloatingButton';
import { db } from './Db';

export default function AddPeopleScreen({ route, navigation }: { route: any, navigation: any }) {
    const initialState= route?.params?.editPeople || { _id: 0, name: '', lastName: '', description: ''};
    const [person, setPerson] = useState(initialState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log('Add o Editing People');
        if(person && person._id !== 0) {
            setIsEditing(true);
        }
    }, [])

    const goToHome = () => navigation.navigate('Home');

    const handleChange = (text: string, name: string) => {
        setPerson({...person, [name]: text})
    }

    const handleCancel = () => {
        setPerson(initialState);
        goToHome();
    }

    const handleSaveChanges = async () => {
        if(person.name !== '' && person.lastName !== '') {
            if(!isEditing) {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "insert into peoples (name, lastName, description) values (?, ?, ?)", 
                            [person.name, person.lastName, person.description],
                            (transaction, result) => {
                                navigation.navigate('Home', { newPerson: { ...person, _id: result.insertId } });
                            });
                    },
                    goToHome
                );
            } else {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "update peoples set name = ?, lastName = ?, description = ? where _id = ?",
                            [person.name, person.lastName, person.description, person._id],
                            (transaction, result) => {
                                console.log({result});
                                navigation.navigate('Home', { editPerson: { ...person } });
                            });
                    },
                    goToHome
                );
            }
        } 
        else {
            goToHome();
        }

    }
    
    return (
        <View style={styles.container}>
            { isEditing && <Title>Editing Person</Title> }
            <View>
                <TextInput
                    style={styles.input}
                    label="Name"
                    value={person.name}
                    dense
                    onChangeText={text => handleChange(text, 'name')}
                />
                <TextInput
                    style={styles.input}
                    label="Last Name"
                    value={person.lastName}
                    dense
                    onChangeText={text => handleChange(text, 'lastName')}
                />
                <TextInput
                    style={styles.input}
                    label="Description"
                    value={person.description}
                    dense
                    onChangeText={text => handleChange(text, 'description')}
                />
            </View>
            <FloatingButton handlePress={handleSaveChanges} icon="check" position={2} />
            <FloatingButton handlePress={handleSaveChanges} icon="close" />
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