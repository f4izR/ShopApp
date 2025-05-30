import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, Touchable } from 'react-native';
import ProductItem from '../components/ProductItems';
import SignInSignup from './SignInScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart))
      .then(() => {
        console.log('Cart updated successfully');
      })
      .catch((err) => {
        console.error('Failed to update cart:', err);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return <Text style={{ flex: 1, textAlign: 'center' }}>{error}</Text>;
  }

  const renderItem = ({ item }) => (
    <ProductItem
      product={item}
      onPress={() => navigation.navigate('Detail', { productId: item.id })}
      onAddToCart={() => addToCart(item)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 8, marginBottom: 8, marginHorizontal: 18 }}

      />
      <TouchableOpacity style={{  display: 'flex', flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginHorizontal: 18 }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#1e2e4e',
          padding: 12,
          margin: 10,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,

        }}
        onPress={() => navigation.navigate('Cart', { cartItems })}
      >
        {/* <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 18 }}>
          View Cart
        </Text> */}
        <MaterialCommunityIcons name="cart-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.signInButton}>
        <AntDesign name="user" size={24} color="#fff" />
      </TouchableOpacity>
      </TouchableOpacity>
    </View>

  );
};

export default HomeScreen;
const styles = {
  signInButton: {
    backgroundColor: '#1e2e4e',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};