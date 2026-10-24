
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopContext = createContext();

const CART_KEY = '@like_studio_cart';
const WISHLIST_KEY = '@like_studio_wishlist';

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart and wishlist when the app starts.
  useEffect(() => {
    async function loadShopData() {
      try {
        const savedCart = await AsyncStorage.getItem(CART_KEY);
        const savedWishlist = await AsyncStorage.getItem(WISHLIST_KEY);

        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        }

        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          if (Array.isArray(parsedWishlist)) {
            setWishlist(parsedWishlist);
          }
        }
      } catch (error) {
        console.warn('Could not load saved shopping data:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadShopData();
  }, []);

  // Save cart whenever it changes after initial loading.
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart))
      .catch(error => {
        console.warn('Could not save cart:', error);
      });
  }, [cart, isLoaded]);

  // Save wishlist whenever it changes after initial loading.
  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
      .catch(error => {
        console.warn('Could not save wishlist:', error);
      });
  }, [wishlist, isLoaded]);

  // Add a product or increase its quantity.
  function addToCart(product) {
    setCart(currentCart => {
      const existing = currentCart.find(
        item => String(item.id) === String(product.id)
      );

      if (existing) {
        return currentCart.map(item =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // Decrease quantity by one.
  function decreaseQuantity(productId) {
    setCart(currentCart =>
      currentCart
        .map(item =>
          String(item.id) === String(productId)
            ? {
                ...item,
                quantity: Number(item.quantity || 1) - 1,
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  // Remove a product completely.
  function removeFromCart(productId) {
    setCart(currentCart =>
      currentCart.filter(
        item => String(item.id) !== String(productId)
      )
    );
  }

  // Add or remove a product from the wishlist.
  function toggleWishlist(product) {
    setWishlist(currentWishlist => {
      const exists = currentWishlist.some(
        item => String(item.id) === String(product.id)
      );

      return exists
        ? currentWishlist.filter(
            item => String(item.id) !== String(product.id)
          )
        : [...currentWishlist, product];
    });
  }

  // Calculate subtotal before discount.
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        subtotal,
        isLoaded,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
