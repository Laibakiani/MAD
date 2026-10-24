import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import products from '../data/products';
import { useShop } from '../context/ShopContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
  white: '#FFFFFF',
};

const categories = [
  {
    name: 'Accessories',
    image:
      'https://sbpbags.com/cdn/shop/articles/Why_Fashion_Accessories_Matter_in_Everyday_Styling.png?v=1780479692',
    detail: 'Jewellery & watches',
  },
  {
    name: 'Clothes',
    image:
      'https://media.istockphoto.com/id/2187107620/photo/womens-clothes-and-shoes-clothes-rack-with-stylish-and-elegant-garments-in-fashion-atelier.jpg?s=612x612&w=0&k=20&c=pv2aQpfvi3Z_fuHjlNyeXftkbuhc2UxPySohjXjDSaA=',
    detail: 'Stitched & unstitched',
  },
  {
    name: 'Makeup',
    image:
      'https://t4.ftcdn.net/jpg/02/73/55/33/360_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg',
    detail: 'Beauty & fragrances',
  },
];

const bracelet = {
  id: 'classic-bracelet',
  name: 'Classic Bracelet',
  price: 850,
  category: 'Accessories',
  image:
    'https://images.openai.com/static-rsc-4/O7uIzTKXirYbwk1oxa8jVhuDFomURWy6Fa3m1wL4WWf8-BVDoBkSpaaxb-pzW72fPzmgiQekS9y5vVijzhr7WciM_VkguhLz6CA8QKLRBOvlHkrrQeGrlfkV6gX2XI5Qoi3nxx1fD0-3bxq-lHjJ23fKHQb5UafMNBRf01WxMpw?purpose=inline',
  description: 'An elegant bracelet for your everyday style.',
};

export default function HomeScreen({ navigation }) {
  const { addToCart, toggleWishlist } = useShop();

  const bannerAnimation = useRef(
    new Animated.Value(SCREEN_WIDTH)
  ).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bannerAnimation, {
          toValue: -SCREEN_WIDTH * 1.8,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(bannerAnimation, {
          toValue: SCREEN_WIDTH,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [bannerAnimation]);

  const perfume = products?.[0];

  const featuredProducts = [
    bracelet,
    ...(perfume ? [perfume] : []),
  ];

  const openProduct = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const openCategory = (categoryName) => {
    navigation.navigate('Categories', {
      category: categoryName,
    });
  };

  const formatPrice = (price) => {
    return (Number(price) || 0).toLocaleString('en-PK');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>LIKÉ Studio</Text>
          <Text style={styles.tagline}>
            YOUR STYLE, YOUR STORY
          </Text>
        </View>

        <Button
          title="🛍 Cart"
          onPress={() => navigation.navigate('Cart')}
          color="#513A2E"
        />
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerSmall}>
          A LITTLE SOMETHING FOR YOU
        </Text>

        <Text style={styles.offer}>20% OFF</Text>

        <View style={styles.marqueeWindow}>
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.movingOffer,
              {
                transform: [
                  { translateX: bannerAnimation },
                ],
              },
            ]}
          >
            20% OFF on Shopping Above Rs. 1,200 — Available Till 20 October
          </Animated.Text>
        </View>

        <Text style={styles.bannerDate}>
          Limited Stock!
        </Text>
      </View>

      {/* Intro */}
      <View style={styles.intro}>
        <Text style={styles.heading}>
          Discover Your Style
        </Text>

        <Text style={styles.description}>
          Find something special for every day.
        </Text>
      </View>

      {/* Categories Heading */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Shop by Category
        </Text>

        <Button
          title="View All"
          onPress={() => navigation.navigate('Categories')}
          color="#513A2E"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <View
            key={category.name}
            style={styles.categoryCard}
          >
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
              resizeMode="cover"
            />

            <Text style={styles.categoryTitle}>
              {category.name}
            </Text>

            <Text style={styles.categoryDetail}>
              {category.detail}
            </Text>

            <Button
              title="Explore"
              onPress={() => openCategory(category.name)}
              color="#513A2E"
            />
          </View>
        ))}
      </View>

      {/* Featured Products Heading */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Featured Products
        </Text>

        <Text style={styles.featuredNote}>
          Our picks for you
        </Text>
      </View>

      {/* Featured Products */}
      <View style={styles.productRow}>
        {featuredProducts.map((product, index) => (
          <View
            key={String(product.id)}
            style={styles.productCard}
          >
            <View style={styles.productImageButton}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="contain"
              />

              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>
                  {index + 1}
                </Text>
              </View>

              <Button
                title="View Details"
                onPress={() => openProduct(product)}
                color="#513A2E"
              />
            </View>

            <View style={styles.productInfo}>
              <Text
                style={styles.productName}
                numberOfLines={2}
              >
                {product.name || product.title}
              </Text>

              <Text style={styles.productPrice}>
                Rs. {formatPrice(product.price)}
              </Text>

              <View style={styles.productActions}>
                <View style={styles.actionButton}>
                  <Button
                    title="Add to Cart"
                    onPress={() => addToCart(product)}
                    color="#513A2E"
                  />
                </View>

                <View style={styles.actionButton}>
                  <Button
                    title="♡ Wishlist"
                    onPress={() => toggleWishlist(product)}
                    color="#795E4C"
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Login */}
      <View style={styles.loginLink}>
        <Button
          title="Login / Create Account"
          onPress={() => navigation.navigate('Login')}
          color="#513A2E"
        />
      </View>

      <Text style={styles.footer}>
        Style that feels like you.
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
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  brand: {
    fontSize: 29,
    fontWeight: 'bold',
    color: COLORS.brown,
    letterSpacing: 0.5,
  },

  tagline: {
    color: COLORS.accent,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 4,
  },

  banner: {
    backgroundColor: COLORS.brown,
    borderRadius: 18,
    padding: 21,
    minHeight: 166,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  bannerSmall: {
    color: COLORS.background,
    fontSize: 9,
    letterSpacing: 1.6,
    marginBottom: 8,
  },

  offer: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  marqueeWindow: {
    height: 23,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 5,
  },

  movingOffer: {
    position: 'absolute',
    color: COLORS.white,
    fontSize: 12,
    width: SCREEN_WIDTH * 1.8,
  },

  bannerDate: {
    color: COLORS.background,
    fontSize: 11,
    marginTop: 8,
  },

  intro: {
    marginTop: 23,
    marginBottom: 15,
  },

  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.brown,
  },

  description: {
    fontSize: 12,
    color: COLORS.accent,
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 18,
    fontWeight: 'bold',
  },

  featuredNote: {
    color: COLORS.accent,
    fontSize: 10,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 9,
  },

  categoryCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  categoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.brown,
    textAlign: 'center',
    marginTop: 9,
  },

  categoryDetail: {
    fontSize: 9,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: 4,
    minHeight: 24,
  },

  productRow: {
    flexDirection: 'column',
    gap: 16,
  },

  productCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  productImageButton: {
    position: 'relative',
  },

  productImage: {
    borderRadius: 8,
    width: '100%',
    height: 200,
    backgroundColor: COLORS.white,
  },

  numberBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: 'bold',
  },

  productInfo: {
    padding: 10,
  },

  productName: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: 'bold',
    minHeight: 34,
  },

  productPrice: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 12,
  },

  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  actionButton: {
    flex: 1,
  },

  loginLink: {
    alignItems: 'center',
    padding: 16,
    marginTop: 15,
  },

  footer: {
    color: COLORS.accent,
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 8,
  },
});