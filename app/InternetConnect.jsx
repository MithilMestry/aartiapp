import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export default function InternetConnect({ connect, setConnect }) {
  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setConnect(state.isConnected); // Update the connect state
    });

    // Unsubscribe on cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Image
        source={require("./../assets/images/internet.png")}
        style={{
          marginTop: 200,
          alignSelf: "center",
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          color: "#FF0000",
          fontSize: 15,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        No Internet Connection
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {connect == true ? "" : "Please Connect to the Internet"}
      </Text>
    </View>
  );
}
