
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import { useShop } from '../context/ShopContext';


const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
  white: '#FFFFFF',
};

export default function CartScreen({ navigation }) {
  const {
    cart,
    subtotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useShop();

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-PK');

  const handleDecrease = (item) => {
    if ((item.quantity || 1) <= 1) {
      Alert.alert(
        'Remove Item?',
        'Quantity is already 1. Would you like to remove this item?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeFromCart(item.id),
          },
        ]
      );
      return;
    }

    if (typeof decreaseQuantity === 'function') {
      decreaseQuantity(item.id);
    } else {
      Alert.alert(
        'Quantity Update',
        'Please update ShopContext.js to enable decreasing quantity.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.brand}>LIKÉ Studio</Text>
      <Text style={styles.title}>My Shopping Cart</Text>

      <Text style={styles.subtitle}>
        Review your selected items before checkout.
      </Text>

      {cart.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>♡</Text>

          <Text style={styles.emptyTitle}>
            Your Cart is Empty
          </Text>

          <Text style={styles.empty}>
            Find something you love and add it to your cart.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Explore Products"
              color={COLORS.brown}
              onPress={() =>
                navigation.navigate('MainTabs', {
                  screen: 'Categories',
                })
              }
            />
          </View>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View
              key={String(item.id)}
              style={styles.card}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
              />

              <View style={styles.details}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.name || item.title || 'Product'}
                </Text>

                <Text style={styles.price}>
                  Rs. {formatPrice(item.price)}
                </Text>

                <Text style={styles.lineTotal}>
                  Item total: Rs.{' '}
                  {formatPrice(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  )}
                </Text>

                <View style={styles.quantityRow}>
                  <View style={styles.quantityButton}>
                    <Button
                      title="−"
                      color={COLORS.brown}
                      onPress={() => handleDecrease(item)}
                    />
                  </View>

                  <Text style={styles.quantity}>
                    {item.quantity || 1}
                  </Text>

                  <View style={styles.quantityButton}>
                    <Button
                      title="+"
                      color={COLORS.brown}
                      onPress={() => addToCart(item)}
                    />
                  </View>
                </View>

                <View style={styles.removeButton}>
                  <Button
                    title="Remove Item"
                    color={COLORS.accent}
                    onPress={() => removeFromCart(item.id)}
                  />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.summaryCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Subtotal
              </Text>

              <Text style={styles.total}>
                Rs. {formatPrice(subtotal)}
              </Text>
            </View>

            <Text style={styles.discountNote}>
              20% discount applies when your subtotal is
              above Rs. 1,200.
            </Text>

            <View style={styles.checkout}>
              <Button
                title="Proceed to Checkout"
                color={COLORS.brown}
                onPress={() => navigation.navigate('Checkout')}
              />
            </View>

            <View style={styles.continueButton}>
              <Button
                title="Continue Shopping"
                color={COLORS.accent}
                onPress={() =>
                  navigation.navigate('MainTabs', {
                    screen: 'Categories',
                  })
                }
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  brand: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.brown,
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.brown,
  },

  subtitle: {
    color: COLORS.accent,
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 20,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },

  emptyIcon: {
    fontSize: 48,
    color: COLORS.accent,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.brown,
    marginTop: 10,
  },

  empty: {
    color: COLORS.accent,
    textAlign: 'center',
    lineHeight: 21,
    marginVertical: 12,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: 100,
    height: 125,
    borderRadius: 9,
    backgroundColor: COLORS.white,
  },

  details: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },

  name: {
    fontWeight: 'bold',
    color: COLORS.brown,
    fontSize: 15,
  },

  price: {
    color: COLORS.accent,
    marginTop: 6,
    fontSize: 14,
  },

  lineTotal: {
    color: COLORS.brown,
    fontWeight: '600',
    fontSize: 12,
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 14,
  },

  quantityButton: {
    minWidth: 36,
    backgroundColor: COLORS.brown,
    borderRadius: 8,
    overflow: 'hidden',
  },

  quantity: {
    color: COLORS.brown,
    fontWeight: 'bold',
    fontSize: 16,
  },

  removeButton: {
    marginTop: 8,
  },

  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: COLORS.brown,
    fontSize: 17,
    fontWeight: 'bold',
  },

  total: {
    color: COLORS.brown,
    fontSize: 19,
    fontWeight: 'bold',
  },

  discountNote: {
    color: COLORS.accent,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
    marginBottom: 16,
  },

  checkout: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    overflow: 'hidden',
  },

  continueButton: {
    marginTop: 8,
  },
});
