
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const API_URL = 'https://fakestoreapi.com/products';

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
  white: '#FFFFFF',
};

const categoryOptions = [
  {
    name: 'Accessories',
    detail: 'Jewellery, watches & purses',
    image:
      'https://sbpbags.com/cdn/shop/articles/Why_Fashion_Accessories_Matter_in_Everyday_Styling.png?v=1780479692',
  },
  {
    name: 'Clothes',
    detail: 'Stitched & unstitched',
    image:
      'https://media.istockphoto.com/id/2187107620/photo/womens-clothes-and-shoes-clothes-rack-with-stylish-and-elegant-garments-in-fashion-atelier.jpg?s=612x612&w=0&k=20&c=pv2aQpfvi3Z_fuHjlNyeXftkbuhc2UxPySohjXjDSaA=',
  },
  {
    name: 'Makeup',
    detail: 'Beauty and makeup products',
    image:
      'https://t4.ftcdn.net/jpg/02/73/55/33/360_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg',
  },
];

const subcategories = {
  Accessories: {
    Male: ['Purses/Wallets', 'Watches'],
    Female: ['Jewellery', 'Purses'],
  },
  Clothes: {
    Male: ['Stitched', 'Unstitched'],
    Female: ['Stitched', 'Unstitched'],
  },
};

const normalize = (value) =>
  String(value || '').trim().toLowerCase();

export default function CategoriesScreen({ navigation, route }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { addToCart, toggleWishlist } = useShop();

  const selectedCategory = route.params?.category;
  const selectedGender = route.params?.gender;
  const selectedSubcategory = route.params?.subcategory;

  // Fetch products from Fake Store API
  useEffect(() => {
    if (selectedCategory !== 'Makeup') {
      return;
    }

    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid products response from API.');
        }

        const formattedProducts = data.map((item) => ({
          id: `api-${item.id}`,
          originalId: item.id,
          name: item.title,
          title: item.title,
          price: Math.round(Number(item.price) * 280),
          category: 'Makeup',
          image: item.image,
          thumbnail: item.image,
          description: item.description,
          rating: item.rating,
        }));

        if (mounted) {
          setApiProducts(formattedProducts);
        }
      } catch (e) {
        console.log('Fake Store API error:', e);

        if (mounted) {
          setError(
            'Unable to load products. Check your internet connection and try again.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  const openCategory = (category) => {
    setApiProducts([]);
    navigation.setParams({
      category,
      gender: undefined,
      subcategory: undefined,
    });
  };

  const openGender = (gender) => {
    navigation.setParams({
      gender,
      subcategory: undefined,
    });
  };

  const openSubcategory = (subcategory) => {
    navigation.setParams({ subcategory });
  };

  const resetCategories = () => {
    navigation.setParams({
      category: undefined,
      gender: undefined,
      subcategory: undefined,
    });
  };

  const resetSubcategory = () => {
    navigation.setParams({
      gender: undefined,
      subcategory: undefined,
    });
  };

  const matchingLocalProducts = products.filter((product) => {
    const category = normalize(product.category);
    const gender = normalize(product.gender);
    const subcategory = normalize(product.subcategory);
    const name = normalize(product.name || product.title);

    const selectedCat = normalize(selectedCategory);
    const selectedGen = normalize(selectedGender);
    const selectedSub = normalize(selectedSubcategory);

    const categoryMatches =
      !selectedCat || category === selectedCat;

    const genderMatches =
      !selectedGen ||
      !gender ||
      gender === selectedGen ||
      (selectedGen === 'male' && gender === 'men') ||
      (selectedGen === 'female' && gender === 'women');

    let subcategoryMatches = true;

    if (selectedSub) {
      subcategoryMatches =
        subcategory === selectedSub ||
        name.includes(selectedSub);

      if (selectedSub === 'purses/wallets') {
        subcategoryMatches =
          subcategoryMatches ||
          name.includes('purse') ||
          name.includes('wallet') ||
          subcategory.includes('wallet');
      }

      if (selectedSub === 'jewellery') {
        subcategoryMatches =
          subcategoryMatches ||
          name.includes('jewelry') ||
          name.includes('jewellery') ||
          name.includes('bracelet') ||
          name.includes('necklace') ||
          name.includes('ring');
      }
    }

    return categoryMatches && genderMatches && subcategoryMatches;
  });

  let visibleProducts = [];

  if (selectedCategory === 'Makeup') {
    visibleProducts = apiProducts;
  } else if (selectedSubcategory) {
    visibleProducts = matchingLocalProducts;
  } else if (selectedCategory) {
    visibleProducts = products.filter(
      (product) =>
        normalize(product.category) === normalize(selectedCategory)
    );
  } else {
    visibleProducts = products;
  }

  const showProductGrid = Boolean(
    selectedCategory === 'Makeup' ||
      selectedSubcategory ||
      (!selectedCategory && visibleProducts.length > 0)
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.brand}>LIKÉ Studio</Text>

      <Text style={styles.title}>
        {selectedSubcategory ||
          selectedGender ||
          selectedCategory ||
          'Shop by Category'}
      </Text>

      <Text style={styles.subtitle}>
        Explore the LIKÉ Studio collection.
      </Text>

      {!selectedCategory && (
        <View style={styles.categoryGrid}>
          {categoryOptions.map((category) => (
            <View key={category.name} style={styles.categoryCard}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />

              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDetail}>{category.detail}</Text>

              <View style={styles.buttonContainer}>
                <Button
                  title="Explore"
                  onPress={() => openCategory(category.name)}
                  color={COLORS.brown}
                />
              </View>
            </View>
          ))}
        </View>
      )}

      {(selectedCategory === 'Accessories' ||
        selectedCategory === 'Clothes') &&
        !selectedGender && (
          <View style={styles.optionContainer}>
            <Text style={styles.sectionTitle}>Shop for</Text>

            {['Male', 'Female'].map((gender) => (
              <View key={gender} style={styles.optionCard}>
                <Text style={styles.optionTitle}>{gender}</Text>

                <View style={styles.optionButton}>
                  <Button
                    title="Select"
                    onPress={() => openGender(gender)}
                    color={COLORS.brown}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

      {selectedCategory &&
        subcategories[selectedCategory] &&
        selectedGender &&
        !selectedSubcategory && (
          <View style={styles.optionContainer}>
            <Text style={styles.sectionTitle}>
              {selectedGender} {selectedCategory}
            </Text>

            {subcategories[selectedCategory][selectedGender].map(
              (subcategory) => (
                <View key={subcategory} style={styles.optionCard}>
                  <Text style={styles.optionTitle}>{subcategory}</Text>

                  <View style={styles.optionButton}>
                    <Button
                      title="Explore"
                      onPress={() => openSubcategory(subcategory)}
                      color={COLORS.brown}
                    />
                  </View>
                </View>
              )
            )}
          </View>
        )}

      {selectedCategory === 'Makeup' && loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.brown}
          style={styles.loader}
        />
      )}

      {selectedCategory === 'Makeup' && error !== '' && (
        <View>
          <Text style={styles.message}>{error}</Text>
          <View style={styles.navigationButton}>
            <Button
              title="Retry Loading Products"
              onPress={() => {
                setError('');
                setLoading(true);
                setApiProducts([]);
                navigation.setParams({ category: undefined });
                setTimeout(() => {
                  navigation.setParams({ category: 'Makeup' });
                }, 100);
              }}
              color={COLORS.brown}
            />
          </View>
        </View>
      )}

      {showProductGrid && (
        <>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'Makeup'
              ? 'Beauty Products'
              : selectedSubcategory
                ? `${selectedGender} ${selectedSubcategory}`
                : 'Featured Products'}
          </Text>

          {!loading &&
            !error &&
            visibleProducts.length === 0 && (
              <Text style={styles.message}>
                No products found in this section yet.
              </Text>
            )}

          <View style={styles.productGrid}>
            {visibleProducts.map((product) => (
              <View
                key={String(product.id)}
                style={styles.productItem}
              >
                <ProductCard
                  product={product}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product })
                  }
                  onAdd={() => addToCart(product)}
                  onWishlist={() => toggleWishlist(product)}
                />
              </View>
            ))}
          </View>
        </>
      )}

      {selectedCategory && (
        <View style={styles.navigationButton}>
          <Button
            title="← All Categories"
            onPress={resetCategories}
            color={COLORS.brown}
          />
        </View>
      )}

      {selectedGender && !selectedSubcategory && (
        <View style={styles.navigationButton}>
          <Button
            title="← Change Gender"
            onPress={resetSubcategory}
            color={COLORS.brown}
          />
        </View>
      )}

      {selectedSubcategory && (
        <View style={styles.navigationButton}>
          <Button
            title="← Other Subcategories"
            onPress={() =>
              navigation.setParams({ subcategory: undefined })
            }
            color={COLORS.brown}
          />
        </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.brown,
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.brown,
    marginTop: 8,
  },
  subtitle: {
    color: COLORS.accent,
    marginTop: 6,
    marginBottom: 18,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 4,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 9,
    backgroundColor: COLORS.border,
  },
  categoryName: {
    color: COLORS.brown,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryDetail: {
    color: COLORS.accent,
    fontSize: 11,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  optionContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    color: COLORS.brown,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    color: COLORS.brown,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  optionButton: {
    minWidth: 100,
  },
  loader: {
    marginVertical: 24,
  },
  message: {
    color: COLORS.brown,
    padding: 12,
    lineHeight: 20,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  productItem: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  navigationButton: {
    marginTop: 18,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
