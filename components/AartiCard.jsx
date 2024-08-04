import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function AartiCard({ aarti }) {
    const router = useRouter();
    
    const handlePress = () => {
        try {
            // Ensure the route path is correct and pass aartiid as a parameter
            router.push({ pathname: '/MainAarti', params: { aartiid: aarti.id } });
        } catch (err) {
            console.error("Navigation error:", err);
        }
    };

    if (!aarti) {
        return null; // Render nothing if aarti is undefined
    }

    return (
        <>
               
        <TouchableOpacity onPress={handlePress}>
            
            <View style={{
                padding: 8,
                margin:12,
                display: 'flex',
                flexDirection: 'row',
                borderWidth:1,
                borderColor:"#d9d9d9",
                borderRadius:15,
                gap: 10,
                marginBottom:8,
                // backgroundColor:Colors.gray
            }}>
                <Image
                    source={{ uri: aarti.image }}
                    style={{
                        width: 50,
                        height: 50,
                    }}
                />
                <Text style={{
                    top: 10,
                    fontSize: 20,
                }}>{aarti.title}</Text>
            </View>
            
        </TouchableOpacity>
        </>
            
    );
}
