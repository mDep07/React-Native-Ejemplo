import React, {useState,useEffect} from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from "react-native";
import { List, IconButton, Colors, Title } from 'react-native-paper';

import FloatingButton from './FloatingButton';

interface IPeople {
    _id?: number,
    name: string,
    lastName: string,
    description?: string
}

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

const PeopleComponent = ({ title, description }: {title: string, description: string}) => (
    <List.Item
        style={styles.itemList}
        title={title}
        description={description}
        left={props => <List.Icon {...props} icon="face" />}
        right={props => <List.Icon {...props} icon="delete"/>}
    />
)

export default function HomeScreen({ navigation }: { navigation: any }) {
    const [peoples, setPeoples] = useState(listPeoples);

    const TaskSchema = {
        name: "Task",
        properties: {
            _id: "int",
            name: "string",
            status: "string?",
        },
        primaryKey: "_id",
    };
    return (
        <View style={styles.container}>
            {/* <Title style={styles.title}>List of Peoples</Title> */}
            <ScrollView>
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
    itemList: {
        marginBottom: 5,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    }
});