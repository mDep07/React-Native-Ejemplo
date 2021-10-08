import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Alert, GestureResponderEvent } from "react-native";
import { List, IconButton, Colors, Title, Button, Subheading, Caption, Snackbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import FloatingButton from './FloatingButton';
import { db } from './Db';
import { string } from 'yargs';
import { SQLStatementCallback, SQLStatementErrorCallback } from 'expo-sqlite';


interface IPeople {
    _id: number,
    name: string,
    lastName: string,
    description?: string
}

interface JsonResponse { _array?: IPeople[], length: number };

const listPeoples: IPeople[] = [
    {
        _id: 1,
        name: 'Miguel',
        lastName: 'Depiante',
        description: 'Software Developer'
    },
    {
        _id: 2,
        name: 'Melina',
        lastName: 'Paez',
        description: 'Professor'
    },
    {
        _id: 3,
        name: 'Pepito',
        lastName: 'Paez',
        description: 'Professor'
    },
    {
        _id: 4,
        name: 'Jorge',
        lastName: 'Paez',
        description: '[...]'
    },
    {
        _id: 5,
        name: 'Juanito',
        lastName: 'Depiante',
        description: 'UI/UX Desing'
    },
    {
        _id: 6,
        name: 'Melina',
        lastName: 'Paez'
    },
    {
        _id: 7,
        name: 'Melina',
        lastName: 'Paez'
    },
    {
        _id: 8,
        name: 'Melina',
        lastName: 'Paez'
    },
    {
        _id: 9,
        name: 'Melina',
        lastName: 'Paez'
    },
    {
        _id: 10,
        name: 'Melina',
        lastName: 'Paez'
    },
    {
        _id: 11,
        name: 'Melina',
        lastName: 'Paez'
    }
]


type ParamsPeopleComponent = { id: number, title: string, description: string, isLastItem: Boolean, handleDelete: Function, handleEdit: Function }
const PeopleComponent = ({ id, title, description, isLastItem, handleDelete, handleEdit } : ParamsPeopleComponent) => {
    const lastItemStyle = isLastItem ? { marginBottom: 70 } : {};
    return (
        <TouchableOpacity
            style={{...styles.item, ...lastItemStyle}}
            onPress={() => handleEdit(id)}
        >
            <View>
                <Subheading >{title}</Subheading>
                <Caption>{description}</Caption>
            </View>
            <IconButton 
                icon="delete"
                size={20}
                onPress={() => handleDelete(id)}/>
        </TouchableOpacity>
    )
}

export default function HomeScreen({ route, navigation }: { route: any, navigation: any }) {
    const { colors } = useTheme();

    const initialState: IPeople[] = [];
    const [peoples, setPeoples] = useState(initialState);
    const [snackBar, setSnackBar] = useState({ visible: false, text: '' });

    const onDismissSnackBar = () => setSnackBar({ visible: false, text: '' });
    const onOpenSnackBar = (text: string) => setSnackBar({ visible: true, text });
    
    useEffect(() => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from peoples", [], (_, { rows }) => {
                    const _listPeoples: IPeople[] | undefined = (rows as JsonResponse)._array;
                    // console.log('Peoples:', rows, _listPeoples);
                    if(_listPeoples)
                        setPeoples([..._listPeoples]);
                });
            }
        );
    }, []);

    const newPerson: IPeople | undefined = route?.params?.newPerson;
    useEffect(() => {
        if(newPerson)
            setPeoples([...peoples, newPerson]);
    }, [newPerson]);

    const editedPerson: IPeople | undefined = route?.params?.editPerson;
    useEffect(() => {
        if(editedPerson) {
            const personEditedIndex = peoples.findIndex(p => p._id === editedPerson._id);
            const peoplesFilter = [...peoples.slice(0, personEditedIndex), editedPerson, ...peoples.slice(personEditedIndex + 1, peoples.length)];
            setPeoples([...peoplesFilter]);
            onOpenSnackBar('PERSONA Editada Correctamente.');
        }
    }, [editedPerson]);

    const deletePerson = (_id: number) => {

        const successDelete: SQLStatementCallback = (tx, result)  => {
            const peoplesFilter = peoples.filter(p => p._id !== _id); 
            setPeoples([...peoplesFilter]);
            onOpenSnackBar('PERSONA Eliminada Correctamente.');
        };
        const errorDelete: SQLStatementErrorCallback = (tx, result)  => {
            onOpenSnackBar('Ocurrio un Error al Eliminar a la PERSONA.');
            return false;
        };

        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from peoples where _id = ?", 
                    [_id],
                    successDelete, 
                    errorDelete
                );
            },
        );
    }

    const editPeople = (_id: number) => {
        const editPeople = peoples.find(p => p._id === _id);
        navigation.navigate('AddPeople', { editPeople });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    peoples.length > 0 
                    ?   peoples.map((people, i) => 
                            <PeopleComponent
                                key={people._id} 
                                id={people._id} 
                                title={`${people.name} ${people.lastName}`} 
                                description={people.description || ''} 
                                isLastItem={(peoples.length - 1) === i}
                                handleDelete={deletePerson}
                                handleEdit={editPeople}
                            />
                        )
                    :   null
                }
            </ScrollView>
            <Snackbar
                style={styles.snackBar}
                visible={snackBar.visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Ok',
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                {snackBar.text}
            </Snackbar>
            <FloatingButton handlePress={() => navigation.navigate('AddPeople')} icon="plus" />
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
    title: {
        textAlign: 'center',
        marginBottom: 10
    },
    item: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    snackBar: {
        marginBottom: 80,
        width: '100%',
        maxWidth: 550,
    }
});