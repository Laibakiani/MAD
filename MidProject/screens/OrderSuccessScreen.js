
import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
  white: '#FFFFFF',
};

export default function OrderSuccessScreen({ route, navigation }) {
  const {
    total = 0,
    subtotal = 0,
    discount = 0,
    items = [],
  } = route.params || {};

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-PK', {
      maximumFractionDigits: 2,
    });

  function backToShopping() {
    navigation.popToTop();
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.successCircle}>
        <Text style={styles.symbol}>✓</Text>
      </View>

      <Text style={styles.brand}>LIKÉ Studio</Text>

      <Text style={styles.title}>
        Order Confirmed!
      </Text>

      <Text style={styles.description}>
        Thank you for shopping with LIKÉ Studio.
        Your demo order has been placed successfully.
      </Text>

      <View style={styles.orderCard}>
        <Text style={styles.sectionTitle}>
          Order Summary
        </Text>

        {items.map((item, index) => {
          const quantity = Number(item.quantity || 1);
          const price = Number(item.price || 0);

          return (
            <View
              key={`${item.id ?? item.name ?? 'product'}-${index}`}
              style={styles.itemRow}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.name || item.title || 'Product'}
                </Text>

                <Text style={styles.quantity}>
                  Qty: {quantity}
                </Text>

                <Text style={styles.unitPrice}>
                  Rs. {formatPrice(price)} each
                </Text>
              </View>

              <Text style={styles.itemPrice}>
                Rs. {formatPrice(price * quantity)}
              </Text>
            </View>
          );
        })}

        {items.length === 0 && (
          <Text style={styles.emptyText}>
            No product details available for this order.
          </Text>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>
            Rs. {formatPrice(subtotal)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Discount Saved</Text>
          <Text style={styles.discount}>
            − Rs. {formatPrice(discount)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Final Total</Text>
          <Text style={styles.total}>
            Rs. {formatPrice(total)}
          </Text>
        </View>

        <Text style={styles.demoNote}>
          Demo order only — no real payment was processed.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={backToShopping}
      >
        <Text style={styles.buttonText}>
          Continue Shopping
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        Thank you for choosing LIKÉ Studio ♡
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 22,
    alignItems: 'center',
    paddingBottom: 35,
  },

  successCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.brown,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 18,
  },

  symbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.brown,
  },

  brand: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: 2,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.brown,
    textAlign: 'center',
    marginTop: 12,
  },

  description: {
    color: COLORS.accent,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },

  orderCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    color: COLORS.brown,
    fontSize: 14,
    fontWeight: '600',
  },

  quantity: {
    color: COLORS.accent,
    fontSize: 12,
    marginTop: 4,
  },

  unitPrice: {
    color: COLORS.accent,
    fontSize: 11,
    marginTop: 3,
  },

  itemPrice: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '600',
  },

  emptyText: {
    color: COLORS.accent,
    fontSize: 13,
    marginVertical: 10,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    gap: 10,
  },

  label: {
    color: COLORS.accent,
    fontSize: 14,
  },

  value: {
    color: COLORS.brown,
    fontSize: 14,
  },

  discount: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
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

  demoNote: {
    color: COLORS.accent,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.brown,
    padding: 16,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 22,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    color: COLORS.accent,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});
