import { View, Text,ScrollView,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query,orderBy } from 'firebase/firestore'
import { db } from './../config/FirebaseConfig';
import { Colors } from '../constants/Colors';
import MantraCard from './MantraCard';

export default function MantraList() {

    const [mantraList,setMantraList]=useState();

    useEffect(()=>{
        GetMantraList();
    },[]);

   const GetMantraList=async()=>{
    setMantraList([]);
        const q=query(collection(db,'mantra'), orderBy('order'));

        const querySnapShot=await getDocs(q);

        const mantras=[];
        querySnapShot.forEach((doc)=>{
            console.log(doc.data());

            mantras.push({id:doc.id, ...doc.data()});
        });
        setMantraList(mantras);

    };

  return (
    <View>

      <ScrollView>
             <View style={{
                padding:80,
                
                backgroundColor:Colors.gray,
             }}>
                <Text style={{
                    textAlign:'center',
                    fontSize:30
                }}>
                आरती संग्रह 
                </Text>
                </View>

                <View style={{
                    backgroundColor:'#fff',
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                    marginTop:-25,
                }}>
            <FlatList
                data={mantraList}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <MantraCard mantra={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            </View>
        </ScrollView>
    </View>
  )
}