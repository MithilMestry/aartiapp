import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {Colors} from './../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.primary
    }}
    >
        <Tabs.Screen name='home'
        options={{
            // tabBarLabel:'होम',
            tabBarLabel:'Home',
            tabBarIcon:({color})=><FontAwesome5 name="home" size={24} color={color} />

        }}
        />
        <Tabs.Screen name='qna'
        options={{
            tabBarLabel:'QnA',
            tabBarIcon:({color})=><FontAwesome name="bookmark" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='mantra'
        options={{
            // tabBarLabel:'मंत्र',
            tabBarLabel:'Mantra',
            tabBarIcon:({color})=><FontAwesome name="book" size={24} color={color}/>
        }}
        />
        <Tabs.Screen name='profile'
        options={{
            // tabBarLabel:'प्रोफाइल',
            tabBarLabel:'Profile',
            tabBarIcon:({color})=><Ionicons name="person-circle-outline" size={29} color={color} />
        }}
        />
        
    </Tabs>
    
  )
}