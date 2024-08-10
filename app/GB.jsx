import { View, Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "./../config/FirebaseConfig";
import { Colors } from "../constants/Colors";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import BhajanCard from "./BhajanCard";

export default function GB() {
  const [bhajanList, setBhajanList] = useState();
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    GetBhajanData();
  }, []);

  const GetBhajanData = async () => {
    setLoading(true);
    setBhajanList([]);
    const q = query(collection(db, "bhajan"), orderBy("order"));
    const querySnapshot = await getDocs(q);

    const bhajans = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      bhajans.push({ id: doc.id, ...doc.data() });
    });
    setBhajanList(bhajans);
    setLoading(false);
  };

  return (
    <View>
      {loading?
        <ActivityIndicator 
        size={"large"}
        color={Colors.primary}
        style={{
          marginTop:"100%"
        }}
        /> : 
      <ScrollView>
        <View
          style={{
            padding: 80,

            backgroundColor: Colors.gray,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
            }}
          >
            भजन संग्रह
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
            marginTop: -25,
          }}
        >
          <FlatList
            data={bhajanList}
            renderItem={({ item }) => (
              <View key={item.id}>
                <BhajanCard bhajan={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>}
    </View>
  );
}
