import { View, Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import { Colors } from "./../../constants/Colors";
import QnaCard from "./QnaCard";

export default function QnaList() {
  const [qna, SetQna] = useState();
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    GetQnaList();
  }, []);

  const GetQnaList = async () => {
    setLoading(true);
    SetQna([]);
    const q = query(collection(db, "qna"), orderBy("order"));
    const querySnapShot = await getDocs(q);

    const qnas = [];
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      qnas.push({ id: doc.id, ...doc.data() });
    });
    SetQna(qnas);
    setLoading(false);
  };

  return (
    <View>
      {loading?
      <ActivityIndicator 
      size={'large'}
      color={Colors.primary}
      style={{
        marginTop:'100%'
      }}
      />
      :
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
           तुम्हाला माहित आहे का ?
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
      </ScrollView>}
    </View>
  );
}
