import { View, Text, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './../config/FirebaseConfig';
import AartiCard from './AartiCard';
import { Colors } from '../constants/Colors';

export default function AartiList() {
    const [aartiList, setAartiList] = useState([]);
    const [filteredAartiList, setFilteredAartiList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        GetAartiList();
    }, []);

    useEffect(() => {
        filterAartiList();
    }, [search, aartiList]);

    const GetAartiList = async () => {
        setAartiList([]);
        const q = query(collection(db, 'aarti'), orderBy('order'));
        const querySnapShot = await getDocs(q);

        const aartis = [];
        querySnapShot.forEach((doc) => {
            aartis.push({ id: doc.id, ...doc.data() });
        });
        setAartiList(aartis);
        setFilteredAartiList(aartis); // Initial load
    };

    const filterAartiList = () => {
        const filteredList = aartiList.filter((aarti) => 
            aarti.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAartiList(filteredList);
    };

    return (
        <View>
        <ScrollView>
            <View style={{
                padding: 80,
                backgroundColor: Colors.gray,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 30,
                }}>
                आरती संग्रह 
                </Text>
            </View>

            <View style={{
                backgroundColor: '#fff',
                borderTopRightRadius: 35,
                borderTopLeftRadius: 35,
                marginTop: -25,
            }}>
                <View>
                    <TextInput
                        placeholder='Search आरती....'
                        value={search}
                        onChangeText={(val) => setSearch(val)}
                        style={{
                            backgroundColor: Colors.primary,
                            padding: 10,
                            borderRadius: 99,
                            width: '90%',
                            height:55,
                            marginLeft: '5%',
                            marginTop: '5%',
                            marginBottom: 20,
                        }}
                    />
                </View>

                <FlatList
                    data={filteredAartiList}
                    renderItem={({ item }) => (
                        <View key={item.id}>
                            <AartiCard aarti={item} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </ScrollView>
        </View>
    );
}
