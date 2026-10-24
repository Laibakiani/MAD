// product card  
import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

// Reusable product card used on different screens.
export default function ProductCard({
  product,
  onPress,
  onAdd,
  onWishlist,
}) {
  return (
    <View style={styles.card}>
      <View>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.price}>
          Rs. {product.price.toLocaleString()}
        </Text>

        <View style={styles.detailsButton}>
          <Button
            title="View Details"
            onPress={onPress}
            color="#795E4C"
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={styles.addButton}>
          <Button
            title="Add to Cart"
            onPress={onAdd}
            color="#513A2E"
          />
        </View>

        <View style={styles.wishlistButton}>
          <Button
            title="♡"
            onPress={onWishlist}
            color="#795E4C"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F8F3EC',
    borderRadius: 14,
    padding: 10,
    margin: 6,
    borderWidth: 1,
    borderColor: '#D6C3B0',
  },

  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    backgroundColor: '#E5D5C3',
  },

  name: {
    color: '#513A2E',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },

  price: {
    color: '#795E4C',
    marginTop: 5,
  },

  detailsButton: {
    marginTop: 8,
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  addButton: {
    flex: 1,
  },

  wishlistButton: {
    width: 55,
  },
});
