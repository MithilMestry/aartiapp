import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "../config/FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { Colors } from "./../constants/Colors";

export default function MainAarti() {
  const router = useRouter();
  const { aartiid } = useLocalSearchParams();
  const [aarti, setAarti] = useState(null);
  const [fontSize, setFontSize] = useState(18); // Initialize font size state

  useEffect(() => {
    if (aartiid) {
      getAartiData();
    }
  }, [aartiid]);

  const getAartiData = async () => {
    try {
      const docRef = doc(db, "aarti", aartiid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAarti({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2 units
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)); // Decrease font size by 2 units, minimum size is 10
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 20,
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

      {aarti && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={{ uri: aarti.image }}
            style={{
              width: 120,
              height: 120,
              backgroundColor: Colors.primary,
              borderRadius: 99,
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            {aarti.title}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontSize: fontSize, // Apply the updated font size
                textAlign: "center",
              }}
            >
              {aarti.data.replace(/\./g, "\n")}
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
