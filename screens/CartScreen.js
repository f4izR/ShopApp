import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductItem from '../components/ProductItems';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';




const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCartItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const productKeys = keys.filter((key) => key.startsWith('product-'));
      const stores = await AsyncStorage.multiGet(productKeys);
      const items = stores.map(([, value]) => JSON.parse(value));
      setCartItems(items);
    } catch (err) {
      console.error('Failed to load cart items:', err);
      Alert.alert('Error', 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };
  const deleteItem = async (id) => {
  try {
    await AsyncStorage.removeItem(`product-${id}`);
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  } catch (err) {
    console.error('Failed to delete item:', err);
    Alert.alert('Error', 'Failed to delete item');
  }
};


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      loadCartItems();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <ProductItem
        product={item}
        onPress={() => navigation.navigate('Details', { productId: item.id })}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#e74c3c',
          padding: 8,
          borderRadius: 5,
          marginLeft: 10,
        }}
        onPress={() => deleteItem(item.id)}
      >
        <MaterialIcons name="delete-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
      />

      <TouchableOpacity style={styles.CheckoutButton} onPress={() => navigation.navigate('Payment')}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  CheckoutButton: {
    backgroundColor: '#1e2e4e',
    padding: 12,
    height: 50,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
  },
});

export default CartScreen;