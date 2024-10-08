import { View, Text, ScrollView, FlatList, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./../config/FirebaseConfig";
import { Colors } from "../constants/Colors";
import MantraCard from "./MantraCard";

export default function MantraList() {
  const [mantraList, setMantraList] = useState([]);
  const [filteredMantraList, setFilteredMantraList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    GetMantraList();
  }, []);

  useEffect(() => {
    filterMantraList();
  }, [search, mantraList]);

  const GetMantraList = async () => {
    setLoading(true);
    setMantraList([]);
    const q = query(collection(db, "mantra"), orderBy("order"));
    const querySnapShot = await getDocs(q);

    const mantras = [];
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      mantras.push({ id: doc.id, ...doc.data() });
    });
    setMantraList(mantras);
    setFilteredMantraList(mantras);
    setLoading(false);
  };

  const filterMantraList = () => {
    const filteredList = mantraList.filter(
      (mantra) =>
        mantra.title &&
        mantra.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMantraList(filteredList);
  };

  return (
    <View>
      {loading? 
      <ActivityIndicator 
      size={'large'}
      color={Colors.primary}
      style={{
        marginTop:"100%"
      }}
      />:  
    
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
            मंत्र संग्रह
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
          <TextInput
            placeholder="Search मंत्र...."
            value={search}
            onChangeText={(val) => setSearch(val)}
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 99,
              width: "90%",
              height: 55,
              marginLeft: "5%",
              marginTop: "5%",
              marginBottom: 20,
            }}
          />

          <FlatList
            data={filteredMantraList}
            renderItem={({ item }) => (
              <View key={item.id}>
                <MantraCard mantra={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>}
    </View>
  );
}
