import { View, Text } from 'react-native';
import React, { useState } from 'react';
import AartiList from "./../../components/AartiList";
import InternetConnect from '../InternetConnect';

export default function Home() {
  const [connect, setConnect] = useState(false);
  return (
    <View>
      {connect ? (
        <AartiList />
      ) : (
        <InternetConnect connect={connect} setConnect={setConnect} />
      )}
    </View>
  );
}

