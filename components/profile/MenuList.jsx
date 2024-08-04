// import { View, Text, FlatList, TouchableOpacity, Share } from 'react-native'
// import React, { useState } from 'react';
// import { useRouter } from 'expo-router'
// import RatingModal from './RatingModal';

// export default function MenuList() {
//     const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

//     const toggleRatingModal = () => {
//         setIsRatingModalVisible(!isRatingModalVisible);
//       };

//     const router=useRouter();

//     onclick=(item)=>{
//         if (item.path === 'rateApp') {
//             toggleRatingModal();
//             return;
//           }
//         if(item.path=='share')
//             {
//               Share.share
//               (
//                 {
//                   message:'Download The App at https://www.youtube.com/ '
//                 }
//               )
//               return;
//             }

//         router.push(item.path)
//     }

//     const menulist=[
//         {
//             id:1,
//             name:'About',
//             // iocn:require(''),
//             path:'/About'
//         },
//         {
//             id:2,
//             name:'Bhajan',
//             // iocn:require(''),
//             path:'/GB'
//         },
//         {
//             id:3,
//             name:'Granth',
//             // iocn:require(''),
//             path:'https://chatgpt.com/c/a7a34eaa-fad3-4376-b31f-d8efe3964f9f',
//         },
//         {
//             id:4,
//             name:'Rate this App',
//             // iocn:require(''),
//             path:'rateApp'
//         },
//         {
//             id:5,
//             name:'Share App',
//             // iocn:require(''),
//             path:'share'
//         },
//     ]

//   return (
//     <View
//     style={{
//         marginTop:'70%'
//     }}
//     >
//       {/* <Text>MenuList</Text> */}

//       <FlatList
//       data={menulist}
//       renderItem={({item,index})=>(
//         <TouchableOpacity
//         onPress={()=>onclick(item)}
//         >
//         <Text
//         style={{
//             marginTop:30,
//             fontSize:25,
//             marginLeft:20
//         }}
//         >{item.name}</Text>
//         </TouchableOpacity>
//       )}
//       />

// <RatingModal 
//         isVisible={isRatingModalVisible} 
//         onClose={toggleRatingModal} 
//       />
//     </View>
//   )
// }



import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Share, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuList() {
  const router = useRouter();

  const handleClick = (item) => {
    if (item.path === 'rateApp') {
      openPlayStoreRating();
      return;
    }
    if (item.path === 'share') {
      Share.share({
        message: 'Download The App at https://www.youtube.com/',
      });
      return;
    }
    if (item.path.startsWith('http')) {
      Linking.openURL(item.path);
      return;
    }
    router.push(item.path);
  };

  const openPlayStoreRating = () => {
    const playStoreUrl = 'market://details?id=aarti'; // Replace with your app's package name
    Linking.openURL(playStoreUrl).catch((err) =>
      alert('Please check for the Google Play Store')
    );
  };

  const menulist = [
    {
      id: 1,
      name: 'About',
      path: '/About',
    },
    {
      id: 2,
      name: 'Bhajan',
      path: '/GB',
    },
    {
      id: 3,
      name: 'Granth',
      path: 'https://chatgpt.com/c/a7a34eaa-fad3-4376-b31f-d8efe3964f9f',
    },
    {
      id: 4,
      name: 'Rate this App',
      path: 'rateApp',
    },
    {
      id: 5,
      name: 'Share App',
      path: 'share',
    },
  ];

  return (
    <View
      style={{
        marginTop: '70%',
      }}
    >
      <FlatList
        data={menulist}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item)}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 25,
                marginLeft: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
