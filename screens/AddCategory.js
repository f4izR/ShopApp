// // screens/AddCategory.js
// import React, { useState, useContext } from 'react';
// import { View, TextInput, Button, Alert, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase';
// import { AuthContext } from '../context/AuthContext';

// export default function AddCategory({ navigation }) {
//   const [name, setName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useContext(AuthContext);

//   const handleAdd = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Category name cannot be empty');
//       return;
//     }
  
//     setIsLoading(true);
    
//     try {
//       console.log("Attempting to add to Firestore..."); // Debug log
//       const docRef = await addDoc(collection(db, "Categories"), {
//         CatName: name.trim(),
//         createdAt: serverTimestamp(),
//         createdBy: user?.uid || "anonymous",
//       });
      
//       console.log("Document written with ID: ", docRef.id); // Success log
      
//       Alert.alert('Success', 'Category added!', [
//         { text: 'OK', onPress: () => navigation.navigate('AddSubCategory') }
//       ]);
      
//       setName('');
//     } catch (error) {
//       console.error("Full error:", error); // Detailed error log
//       Alert.alert('Error', `Failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.userInfo}>Signed in as: {user?.email}</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Enter category name"
//         value={name}
//         onChangeText={setName}
//         maxLength={50}
//         editable={!isLoading}
//       />
      
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button 
//           title="Add Category" 
//           onPress={handleAdd} 
//           disabled={!name.trim() || isLoading}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   userInfo: {
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#666',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
// });