// // screens/AddSubCategory.js
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, Picker, Alert } from 'react-native';
// import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import { AuthContext } from '../context/AuthContext';

// const AddSubCategory = () => {
//   const [subCategoryName, setSubCategoryName] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const q = query(collection(db, "Categories"));
//       const querySnapshot = await getDocs(q);
//       const cats = [];
//       querySnapshot.forEach((doc) => {
//         cats.push({ id: doc.id, ...doc.data() });
//       });
//       setCategories(cats);
//       if (cats.length > 0) setSelectedCategory(cats[0].id);
//     };
//     fetchCategories();
//   }, []);

//   const handleAddSubCategory = async () => {
//     if (!subCategoryName.trim() || !selectedCategory) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, "SubCategories"), {
//         name: subCategoryName.trim(),
//         categoryId: selectedCategory,
//         createdAt: new Date(),
//         createdBy: user?.uid || "anonymous",
//       });
//       Alert.alert('Success', 'SubCategory added successfully');
//       setSubCategoryName('');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Category:</Text>
//       <Picker
//         selectedValue={selectedCategory}
//         style={styles.picker}
//         onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
//         {categories.map((cat) => (
//           <Picker.Item key={cat.id} label={cat.CatName} value={cat.id} />
//         ))}
//       </Picker>

//       <Text style={styles.label}>SubCategory Name:</Text>
//       <TextInput
//         style={styles.input}
//         value={subCategoryName}
//         onChangeText={setSubCategoryName}
//         placeholder="Enter subcategory name"
//       />

//       <Button
//         title="Add SubCategory"
//         onPress={handleAddSubCategory}
//         disabled={!subCategoryName.trim() || loading}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     marginTop: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginBottom: 20,
//   },
// });

// export default AddSubCategory;