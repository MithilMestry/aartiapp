import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { Colors } from "./../constants/Colors";

export default function MainQna() {
  const { qnaid } = useLocalSearchParams();
  const [qna, setqna] = useState();

  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    if (qnaid) {
      getQnaData();
    }
  }, [qnaid]);

  const getQnaData = async () => {
    try {
      const docRef = doc(db, "qna", qnaid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log('Data: ',docSnap.data());
        setqna({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("no such data");
      }
    } catch (err) {
      console.error("error in qna", err);
    }
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2 units
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)); // Decrease font size by 2 units, minimum size is 10
  };

  return (
    <View>
      {/* <Text>MainQna</Text> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 40,
        }}
      >
        <Text style={{ marginTop: 8, marginRight: 2 }}>Increse Text Size</Text>

        <TouchableOpacity onPress={increaseFontSize}>
          <Text style={{ fontSize: 25 }}>A+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={decreaseFontSize}>
          <Text style={{ fontSize: 18, marginTop: 5, marginLeft: 20 }}>A-</Text>
        </TouchableOpacity>
      </View>

      <View>
        {qna && (
          <View
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image
              source={{ uri: qna.image }}
              style={{
                width: 120,
                height: 120,
                backgroundColor: Colors.primary,
                borderRadius: 99,
              }}
            />
            <Text
              style={{
                top: 20,
                fontSize: fontSize,
                marginBottom: 25,
              }}
            >
              {qna.title}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 150,
              }}
            >
              <Text
                style={{
                  marginTop: 20,
                  fontSize: fontSize,
                  textAlign: "center",
                  marginBottom:280,
                }}
              >
                {qna.data.replace(/\./g, "\n")}
              </Text>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
