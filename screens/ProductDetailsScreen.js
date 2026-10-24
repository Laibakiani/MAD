
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
   Button
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

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, toggleWishlist } = useShop();

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-PK');

  const handleAddToCart = () => {
    // Check whether the user has logged in.
    navigation.navigate('Login', {
      productToAdd: product,
      returnToCart: true,
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product);

    Alert.alert(
      'LIKÉ Studio',
      'Wishlist action completed.'
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.brand}>LIKÉ Studio</Text>

      <Text style={styles.name}>
        {product.name || product.title || 'Product'}
      </Text>

      <Text style={styles.price}>
        Rs. {formatPrice(product.price)}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.descriptionHeading}>
        Product Description
      </Text>

      <Text style={styles.description}>
        {product.description ||
          'Discover this item from the LIKÉ Studio collection.'}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Elegant style, selected for your collection.
        </Text>
        <Text style={styles.infoText}>
          Check your cart before proceeding to checkout.
        </Text>
      </View>

     <Button
  title="Add to Cart"
  onPress={handleAddToCart}
  color="#513A2E"
/>
<Button
  title="♡ Add to Wishlist"
  onPress={handleWishlist}
  color="#795E4C"
/>
<Button
  title="Continue Shopping"
  onPress={() => navigation.goBack()}
  color="#806650"
/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  imageContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },

  brand: {
    color: COLORS.accent,
    fontSize: 13,
    letterSpacing: 2,
    marginTop: 20,
    textTransform: 'uppercase',
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.brown,
    marginTop: 8,
  },

  price: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.accent,
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },

  descriptionHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.brown,
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: COLORS.brown,
    lineHeight: 23,
  },

  infoBox: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginVertical: 18,
    gap: 8,
  },

  infoText: {
    fontSize: 13,
    color: COLORS.accent,
    lineHeight: 20,
  },

  button: {
    backgroundColor: COLORS.brown,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondary: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.brown,
    borderRadius: 10,
    marginTop: 12,
  },

  secondaryText: {
    color: COLORS.brown,
    fontWeight: 'bold',
  },

  backButton: {
    padding: 14,
    alignItems: 'center',
  },

  backText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});
