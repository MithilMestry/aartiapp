// import React, { useState } from 'react';
// import { View, Text, Button, TouchableOpacity } from 'react-native';
// import Modal from 'react-native-modal';
// import { Rating } from 'react-native-ratings';
// import * as StoreReview from 'expo-store-review';

// export default function RatingModal({ isVisible, onClose }) {
//   const [rating, setRating] = useState(0);

//   const handleRatingCompleted = (rating) => {
//     setRating(rating);
//   };

//   const handleRateApp = () => {
//     if (StoreReview.isAvailableAsync()) {
//       StoreReview.requestReview();
//     } else {
//       // Fallback for store review if StoreReview is not available
//     }
//     onClose();
//   };

//   return (
//     <Modal isVisible={isVisible}>
//       <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
//         <Text style={{ fontSize: 20, marginBottom: 20 }}>Rate Our App</Text>
//         <Rating
//           showRating
//           onFinishRating={handleRatingCompleted}
//           style={{ paddingVertical: 10 }}
//         />
//         <Button title="Submit Rating" onPress={handleRateApp} />
//         <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
//           <Text style={{ color: 'blue' }}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// }



import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';
import * as StoreReview from 'expo-store-review';

export default function RatingModal({ isVisible, onClose }) {
  const [rating, setRating] = useState(0);

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const handleRateApp = async () => {
    if (await StoreReview.hasAction()) {
      StoreReview.requestReview();
    }
    onClose();
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Rate Our App</Text>
        <Rating
          showRating
          onFinishRating={handleRatingCompleted}
          style={{ paddingVertical: 10 }}
        />
        <Button title="Submit Rating" onPress={handleRateApp} />
        <TouchableOpacity onPress={onClose} style={{ marginTop: 10,  }}>
          <Text style={{ color: 'blue', textAlign:'center' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
