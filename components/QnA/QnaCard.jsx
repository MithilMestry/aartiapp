import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";

export default function QnaCard({ qna }) {
  const router = useRouter();

  const OnPress = () => {
    try {
      router.push({ pathname: "/MainQna", params: { qnaid: qna.id } });
    } catch (err) {
      console.error("mantra error: ", err);
    }
  };

  if (!qna) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity onPress={OnPress}>
        <View
          style={{
            margin: 12,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#d9d9d9",
            borderRadius: 15,
            gap: 10,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: Colors.primary,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: qna.image }}
              style={{
                width: 70,
                height: 70,
                padding: 5,
                borderRadius: 10,
                backgroundColor: Colors.primary,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: "8%",
              fontSize: 20,
            }}
          >
            {qna.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
