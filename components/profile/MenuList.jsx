import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Share,
  Linking,
  Pressable,
} from "react-native";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";

export default function MenuList() {
  const router = useRouter();

  const handleClick = (item) => {
    if (item.path === "rateApp") {
      openPlayStoreRating();
      return;
    }
    if (item.path === "share") {
      Share.share({
        message: "Download The App at https://www.amazon.com/dp/B0DD3VMD8G/ref=apps_sf_sta",
      });
      return;
    }
    if (item.path.startsWith("http")) {
      Linking.openURL(item.path);
      return;
    }
    router.push(item.path);
  };

  const openPlayStoreRating = () => {
    const playStoreUrl = "market://details?id=aarti"; // Replace with your app's package name
    Linking.openURL(playStoreUrl).catch((err) =>
      alert("Please check for the Google Play Store")
    );
  };

  const menulist = [
    {
      id: 1,
      name: "About",
      path: "/About",
    },
    {
      id: 2,
      name: "Bhajan",
      path: "/GB",
    },
    // {
    //   id: 3,
    //   name: 'Granth',
    //   path: 'https://chatgpt.com/c/a7a34eaa-fad3-4376-b31f-d8efe3964f9f',
    // },
    // {
    //   id: 4,
    //   name: "Rate this App",
    //   path: "rateApp",
    // },
    {
      id: 5,
      name: "Share App",
      path: "share",
    },
  ];

  return (
    <>
      <View
        style={{
          // marginTop: "70%",
        }}
      >
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
           Profile
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
            height:"80%",
            marginTop: -25,
          }}
        >

        <FlatList
        style={{
          marginTop:"20%",
          
        }}
          data={menulist}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item)}>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 25,
                  // marginLeft: 20,
                  margin: 15,
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1.5,
                  borderColor: "#d9d9d9",
                  borderRadius: 10,
                  // gap: 10,
                  padding:10,
                  // marginBottom: 8,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        </View>


      </View>
    </>
  );
}
