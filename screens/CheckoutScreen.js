
import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

import { useShop } from '../context/ShopContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, subtotal, removeFromCart } = useShop();

  // Apply 20% discount when subtotal is greater than Rs. 1,200
  const discount = subtotal > 1200 ? subtotal * 0.20 : 0;
  const finalTotal = subtotal - discount;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-PK', {
      maximumFractionDigits: 2,
    });

  function placeOrder() {
    if (!cart || cart.length === 0) {
      Alert.alert(
        'Empty Cart',
        'Please add a product before checkout.'
      );
      return;
    }

    // Save order details before clearing the cart
    const orderItems = cart.map((item) => ({ ...item }));
    const orderSubtotal = subtotal;
    const orderDiscount = discount;
    const orderTotal = finalTotal;

    // Clear the cart
    orderItems.forEach((item) => {
      removeFromCart(item.id);
    });

    // Navigate to Order Success screen
    navigation.replace('OrderSuccess', {
      items: orderItems,
      subtotal: orderSubtotal,
      discount: orderDiscount,
      total: orderTotal,
    });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>
          Rs. {formatPrice(subtotal)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Discount (20%)</Text>
        <Text style={styles.discount}>
          - Rs. {formatPrice(discount)}
        </Text>
      </View>

      {subtotal <= 1200 && (
        <Text style={styles.note}>
          Spend more than Rs. 1,200 to qualify for 20% off.
        </Text>
      )}

      {subtotal > 1200 && (
        <Text style={styles.successNote}>
          Congratulations! You saved Rs. {formatPrice(discount)}.
        </Text>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>
          Rs. {formatPrice(finalTotal)}
        </Text>
      </View>

      <Text style={styles.note}>
        Demo checkout only. No real payment will be taken.
      </Text>

      <View style={styles.button}>
        <Button
          title="Place Demo Order"
          onPress={placeOrder}
          color="#513A2E"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EDD9BE',
    padding: 22,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#513A2E',
    marginBottom: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    gap: 10,
  },

  label: {
    color: '#513A2E',
    fontSize: 16,
  },

  value: {
    color: '#513A2E',
    fontSize: 16,
  },

  discount: {
    color: '#795E4C',
    fontSize: 16,
    fontWeight: '600',
  },

  note: {
    color: '#795E4C',
    marginVertical: 12,
    lineHeight: 20,
  },

  successNote: {
    color: '#513A2E',
    marginVertical: 8,
    lineHeight: 20,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#D6C3B0',
    marginVertical: 10,
  },

  totalLabel: {
    color: '#513A2E',
    fontSize: 20,
    fontWeight: 'bold',
  },

  total: {
    color: '#513A2E',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#EDD9BE',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
});
