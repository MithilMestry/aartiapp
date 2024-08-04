// import { View, Text, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from './../config/FirebaseConfig';
// import AartiCard from './AartiCard';

// export default function AartiList() {
//     const [aartiList, setAartiList] = useState([]);

//     useEffect(() => {
//         GetAartiList();
//     }, []);

//     const GetAartiList = async () => {
//         setAartiList([]);
//         const q = query(collection(db, 'aarti'));
//         const querySnapShot = await getDocs(q);

//         const aartis = [];
//         querySnapShot.forEach((doc) => {
//             // console.log(doc.data());
//             aartis.push({ id: doc.id, ...doc.data() });
//         });
//         setAartiList(aartis);
//     };

//     return (
//         <View>
//             {/* <Text>Aarti List all</Text> */}
//             <FlatList
//                 data={aartiList}
//                 renderItem={({ item }) => (
//                     <View key={item.id}>
//                         <AartiCard aarti={item} />
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     );
// }


import { View, Text, FlatList,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './../config/FirebaseConfig';
import AartiCard from './AartiCard';
import { Colors } from '../constants/Colors';

export default function AartiList() {
    const [aartiList, setAartiList] = useState([]);

    useEffect(() => {
        GetAartiList();
    }, []);

    const GetAartiList = async () => {
        setAartiList([]);
        const q = query(collection(db, 'aarti'), orderBy('order'));
        const querySnapShot = await getDocs(q);

        const aartis = [];
        querySnapShot.forEach((doc) => {
            // console.log(doc.data());
            aartis.push({ id: doc.id, ...doc.data() });
        });
        setAartiList(aartis);
    };

    return (
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
                data={aartiList}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <AartiCard aarti={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            </View>
        </ScrollView>
    );
}

