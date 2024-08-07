import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import { Colors } from "./../../constants/Colors";
import QnaCard from "./QnaCard";

export default function QnaList() {
  const [qna, SetQna] = useState();

  useEffect(() => {
    GetQnaList();
  }, []);

  const GetQnaList = async () => {
    SetQna([]);
    const q = query(collection(db, "qna"), orderBy("order"));
    const querySnapShot = await getDocs(q);

    const qnas = [];
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      qnas.push({ id: doc.id, ...doc.data() });
    });
    SetQna(qnas);
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
           सत्यशोधक
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
            data={qna}
            renderItem={({ item }) => (
              <View key={item.id}>
                <QnaCard qna={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}
