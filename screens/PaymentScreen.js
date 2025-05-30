import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const PaymentScreen = ({ navigation, route }) => {
  
  const { totalAmount = 99.99 } = route?.params || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatCardNumber = (text) => {
   
    const cleaned = text.replace(/\D/g, '');
    
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryDateChange = (text) => {
    setExpiryDate(formatExpiryDate(text));
  };

  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned.slice(0, 4));
  };

  const handlePayment = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      alert('Payment successful!');
     
    }, 2000);
  };

  const isPaymentFormValid = () => {
    if (paymentMethod === 'card') {
      return (
        cardNumber.replace(/\s/g, '').length === 16 &&
        cardName.trim().length > 0 &&
        expiryDate.length === 5 &&
        cvv.length >= 3
      );
    }
    return true; // For other payment methods
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          
          
          <View style={styles.orderSummary}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${(totalAmount * 0.9).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${(totalAmount * 0.1).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.paymentMethodsContainer}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity 
                style={[
                  styles.paymentMethodButton, 
                  paymentMethod === 'card' && styles.selectedPaymentMethod
                ]}
                onPress={() => setPaymentMethod('card')}
              >
                <Feather 
                  name="credit-card" 
                  size={24} 
                  color={paymentMethod === 'card' ? "#1e2e4e" : "#888888"} 
                />
                <Text 
                  style={[
                    styles.paymentMethodText,
                    paymentMethod === 'card' && styles.selectedPaymentMethodText
                  ]}
                >
                  Credit Card
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentMethodButton, 
                  paymentMethod === 'easypaisa' && styles.selectedPaymentMethod
                ]}
                onPress={() => setPaymentMethod('easypaisa')}
              >
                <MaterialCommunityIcons name="currency-rupee" size={24} color={paymentMethod === 'easypaisa' ? "#1e2e4e" : "#888888"} />
                <Text 
                  style={[
                    styles.paymentMethodText,
                    paymentMethod === 'easypaisa' && styles.selectedPaymentMethodText
                  ]}
                >
                  Easy Paisa
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentMethodButton, 
                  paymentMethod === 'jazzcash' && styles.selectedPaymentMethod
                ]}
                onPress={() => setPaymentMethod('jazzcash')}
              >
                <Feather 
                  name="smartphone" 
                  size={24} 
                  color={paymentMethod === 'jazzcash' ? "#1e2e4e" : "#888888"} 
                />
                <Text 
                  style={[
                    styles.paymentMethodText,
                    paymentMethod === 'jazzcash' && styles.selectedPaymentMethodText
                  ]}
                >
                  Jazz Cash
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {paymentMethod === 'card' && (
            <View style={styles.cardDetailsContainer}>
              <Text style={styles.sectionTitle}>Card Details</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    maxLength={19}
                  />
                  <View style={styles.cardBrands}>
                    <Feather name="credit-card" size={20} color="#888888" />
                  </View>
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={expiryDate}
                    onChangeText={handleExpiryDateChange}
                    maxLength={5}
                  />
                </View>
                
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={handleCvvChange}
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          )}

          {paymentMethod === 'easypaisa' && (
            <View style={styles.alternativePaymentContainer}>
              <MaterialCommunityIcons name="currency-rupee" size={48} color="#1e2e4e"/>
              <Text style={styles.alternativePaymentText}>
                You'll be redirected to Easy Paisa to complete your payment securely.
              </Text>
            </View>
          )}

          {paymentMethod === 'jazzcash' && (
            <View style={styles.alternativePaymentContainer}>
              <Feather name="smartphone" size={48} color="#1e2e4e" />
              <Text style={styles.alternativePaymentText}>
                You'll be redirected to Jazz Cash to complete your payment securely.
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[
              styles.payButton,
              (!isPaymentFormValid() || isLoading) && styles.payButtonDisabled
            ]}
            onPress={handlePayment}
            disabled={!isPaymentFormValid() || isLoading}
          >
            {isLoading ? (
              <Text style={styles.payButtonText}>Processing...</Text>
            ) : (
              <Text style={styles.payButtonText}>Pay ${totalAmount.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.securePaymentInfo}>
            <Feather name="lock" size={16} color="#888888" />
            <Text style={styles.securePaymentText}>
              Your payment information is secure and encrypted
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  orderSummary: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  paymentMethodsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethodButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedPaymentMethod: {
    borderColor: "#1e2e4e",
    backgroundColor: "#f0f8ff",
  },
  paymentMethodText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666666",
  },
  selectedPaymentMethodText: {
    color: "#1e2e4e",
    fontWeight: "500",
  },
  cardDetailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  cardBrands: {
    paddingHorizontal: 16,
  },
  alternativePaymentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  alternativePaymentText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  payButton: {
    backgroundColor: "#1e2e4e",
    borderRadius: 12,
    paddingVertical: 16,
    margin: 16,
    marginTop: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonDisabled: {
    backgroundColor: "#6e788c",
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  securePaymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  securePaymentText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#888888",
  },
});

export default PaymentScreen;