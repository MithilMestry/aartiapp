import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from './../constants/Colors';

export default function MantraCard({mantra}) {

    const router=useRouter();

    const OnPress=()=>{
        try{
            router.push({pathname:'/MainMantra', params:{mantraid:mantra.id}});
        }catch(err){
            console.error("mantra error: ",err);
        }
    };

    if(!mantra){
        return null;
    }

  return (
    <>
      <TouchableOpacity onPress={OnPress}>
      <View 
    style={{
        // padding: 8,
        margin:12,
        display: 'flex',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"#d9d9d9",
        borderRadius:150,
        gap: 10,
        marginBottom:8,
        // backgroundColor:Colors.gray
    }}>

    <View
    style={{
      padding: 8,
      backgroundColor:Colors.primary,
      borderRadius:150,
    }}
    >
     <Image
        source={{ uri: mantra.image }}
        style={{
            width: 50,
            height: 50,
        }}
     />
     </View>

    <Text style={{
            marginTop: '5%',
            fontSize: 20,
            width:'75%'
        }}
        numberOfLines={1} 
        ellipsizeMode="tail" 
        >{mantra.title}</Text>

      {/* <Text>MantraCard</Text> */}
    </View>
    </TouchableOpacity>
    </>
  )
}