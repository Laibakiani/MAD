

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';

import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
  white: '#FFFFFF',
};

export default function WishlistScreen({ navigation }) {
  const { wishlist, toggleWishlist } = useShop();

  const openProduct = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = (product) => {
    navigation.navigate('Login', {
      productToAdd: product,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.brand}>LIKÉ Studio</Text>

      <Text style={styles.title}>My Wishlist ♡</Text>

      <Text style={styles.subtitle}>
        Your favourite pieces, all in one place.
      </Text>

      {wishlist.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.heart}>♡</Text>

          <Text style={styles.emptyTitle}>
            Your Wishlist is Empty
          </Text>

          <Text style={styles.empty}>
            Save products you love and find them here
            whenever you want.
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
          <Text style={styles.count}>
            {wishlist.length}{' '}
            {wishlist.length === 1 ? 'item' : 'items'} saved
          </Text>

          <View style={styles.grid}>
            {wishlist.map((product) => (
              <View
                key={String(product.id)}
                style={styles.item}
              >
                <ProductCard
                  product={product}
                  onPress={() => openProduct(product)}
                  onAdd={() => handleAddToCart(product)}
                  onWishlist={() => toggleWishlist(product)}
                />

                <View style={styles.removeButton}>
                  <Button
                    title="Remove from Wishlist"
                    color={COLORS.brown}
                    onPress={() => toggleWishlist(product)}
                  />
                </View>
              </View>
            ))}
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
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.brown,
    marginTop: 8,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.accent,
    marginTop: 6,
    marginBottom: 18,
  },

  count: {
    color: COLORS.accent,
    fontSize: 13,
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 15,
  },

  heart: {
    fontSize: 52,
    color: COLORS.accent,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.brown,
    textAlign: 'center',
  },

  empty: {
    color: COLORS.accent,
    paddingVertical: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },

  item: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },

  removeButton: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 6,
    overflow: 'hidden',
  },
});
