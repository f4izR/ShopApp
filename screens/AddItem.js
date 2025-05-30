// // screens/AddItems.js
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, Picker, Alert, ScrollView } from 'react-native';
// import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import { AuthContext } from '../context/AuthContext';

// const AddItems = () => {
//   // Form state
//   const [itemName, setItemName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [color, setColor] = useState('');
//   const [size, setSize] = useState('');
  
//   // Category state
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubCategory, setSelectedSubCategory] = useState('');
  
//   // Other state
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
  
//   // Size options - customize as needed
//   const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const q = query(collection(db, "Categories"));
//       const querySnapshot = await getDocs(q);
//       const cats = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setCategories(cats);
//       if (cats.length > 0) setSelectedCategory(cats[0].id);
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       if (!selectedCategory) return;
      
//       const q = query(
//         collection(db, "SubCategories"), 
//         where("categoryId", "==", selectedCategory)
//       );
//       const querySnapshot = await getDocs(q);
//       const subs = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setSubCategories(subs);
//       if (subs.length > 0) setSelectedSubCategory(subs[0].id);
//     };
//     fetchSubCategories();
//   }, [selectedCategory]);

//   const handleAddItem = async () => {
//     // Validate all required fields
//     if (!itemName.trim() || !selectedCategory || !selectedSubCategory || !price) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     // Validate price is a number
//     if (isNaN(parseFloat(price))) {
//       Alert.alert('Error', 'Price must be a number');
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, "Items"), {
//         name: itemName.trim(),
//         description: description.trim(),
//         price: parseFloat(price),
//         color: color.trim(),
//         size: size,
//         categoryId: selectedCategory,
//         subCategoryId: selectedSubCategory,
//         createdAt: new Date(),
//         createdBy: user?.uid || "anonymous",
//       });
      
//       Alert.alert('Success', 'Item added successfully');
//       // Reset form
//       setItemName('');
//       setDescription('');
//       setPrice('');
//       setColor('');
//       setSize('');
//     } catch (error) {
//       console.error("Error adding item: ", error);
//       Alert.alert('Error', 'Failed to add item: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Category Selection */}
//       <Text style={styles.label}>Category*:</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedCategory}
//           onValueChange={setSelectedCategory}
//         >
//           {categories.map((cat) => (
//             <Picker.Item key={cat.id} label={cat.CatName} value={cat.id} />
//           ))}
//         </Picker>
//       </View>

//       {/* SubCategory Selection */}
//       <Text style={styles.label}>SubCategory*:</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedSubCategory}
//           onValueChange={setSelectedSubCategory}
//         >
//           {subCategories.map((sub) => (
//             <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
//           ))}
//         </Picker>
//       </View>

//       {/* Item Name */}
//       <Text style={styles.label}>Item Name*:</Text>
//       <TextInput
//         style={styles.input}
//         value={itemName}
//         onChangeText={setItemName}
//         placeholder="Enter item name"
//       />

//       {/* Description */}
//       <Text style={styles.label}>Description:</Text>
//       <TextInput
//         style={[styles.input, styles.multilineInput]}
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Enter item description"
//         multiline
//         numberOfLines={3}
//       />

//       {/* Price */}
//       <Text style={styles.label}>Price*:</Text>
//       <TextInput
//         style={styles.input}
//         value={price}
//         onChangeText={setPrice}
//         placeholder="Enter price (e.g., 19.99)"
//         keyboardType="decimal-pad"
//       />

//       {/* Color */}
//       <Text style={styles.label}>Color:</Text>
//       <TextInput
//         style={styles.input}
//         value={color}
//         onChangeText={setColor}
//         placeholder="Enter color (e.g., Red)"
//       />

//       {/* Size */}
//       <Text style={styles.label}>Size:</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={size}
//           onValueChange={setSize}
//         >
//           <Picker.Item label="Select size" value="" />
//           {sizeOptions.map((opt) => (
//             <Picker.Item key={opt} label={opt} value={opt} />
//           ))}
//         </Picker>
//       </View>

//       {/* Submit Button */}
//       <View style={styles.buttonContainer}>
//         <Button
//           title={loading ? "Adding..." : "Add Item"}
//           onPress={handleAddItem}
//           disabled={!itemName.trim() || !selectedCategory || !selectedSubCategory || !price || loading}
//           color="#0066cc"
//         />
//       </View>

//       <Text style={styles.requiredNote}>* indicates required field</Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//     marginTop: 12,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   multilineInput: {
//     height: 100,
//     textAlignVertical: 'top',
//     paddingTop: 12,
//   },
//   pickerContainer: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//     overflow: 'hidden',
//   },
//   buttonContainer: {
//     marginTop: 20,
//     marginBottom: 30,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   requiredNote: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

// export default AddItems;