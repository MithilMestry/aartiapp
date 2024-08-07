import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "./../config/FirebaseConfig";
import { Colors } from "../constants/Colors";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import BhajanCard from "./BhajanCard";

export default function GB() {
  const [bhajanList, setBhajanList] = useState();

  useEffect(() => {
    GetBhajanData();
  }, []);

  const GetBhajanData = async () => {
    setBhajanList([]);
    const q = query(collection(db, "bhajan"), orderBy("order"));
    const querySnapshot = await getDocs(q);

    const bhajans = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      bhajans.push({ id: doc.id, ...doc.data() });
    });
    setBhajanList(bhajans);
  };

  return (
    <View>
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
      </ScrollView>
    </View>
  );
}
