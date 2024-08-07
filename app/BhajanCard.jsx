import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "./../constants/Colors";

export default function BhajanCard({ bhajan }) {
  const router = useRouter();

  const OnPress = () => {
    try {
      router.push({ pathname: "/MainBhajan", params: { bhajanid: bhajan.id } });
    } catch (err) {
      console.error("bhajan error: ", err);
    }
  };

  if (!bhajan) {
    return null;
  }

  return (
    <>
      <TouchableOpacity onPress={OnPress}>
        <View
          style={{
            margin: 12,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#d9d9d9",
            borderRadius: 150,
            gap: 10,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: Colors.primary,
              borderRadius: 150,
            }}
          >
            <Image
              source={{ uri: bhajan.image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: "5%",
              fontSize: 20,
            }}
          >
            {bhajan.title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
