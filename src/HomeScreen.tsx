import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import { List, IconButton, Colors, Title, Button, Subheading, Caption } from 'react-native-paper';

import FloatingButton from './FloatingButton';
import { db } from './Db';
import { string } from 'yargs';
interface IPeople {
    _id?: number,
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

const usePeoples = () => {
    const initialState: IPeople[] = [];
    const [peoples, setPeoples] = useState(initialState);
    
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

    return { peoples };   
}

const AlertPress = (text: string) => Alert.alert(text);

const PeopleComponent = ({ title, description }: {title: string, description: string}) => (
    <TouchableOpacity
        style={styles.item}
        onPress={() => AlertPress(title)}
    >
        <View>
            <Subheading >{title}</Subheading>
            <Caption>{description}</Caption>
        </View>
        <IconButton 
            icon="delete"
            size={20}
            onPress={() => AlertPress(`Eliminar Persona: ${title}`)}/>
    </TouchableOpacity>
)

export default function HomeScreen({ navigation }: { navigation: any }) {
    const initialState: IPeople[] = [];
    const [peoples, setPeoples] = useState(initialState);
    
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

    const getPeoples = () => 
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

    return (
        <View style={styles.container}>
            {/* <Title style={styles.title}>List of Peoples</Title> */}
            <ScrollView>
                <Button mode="outlined" onPress={getPeoples} style={{ marginBottom: 10 }}>
                    Reload
                </Button>
                {
                    peoples.map((people, i) => <PeopleComponent key={i} title={`${people.name} ${people.lastName}`} description={people.description || ''} />)
                }
            </ScrollView>
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
    }
});