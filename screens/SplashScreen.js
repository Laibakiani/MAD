
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTabs', {
        screen: 'Home',
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#EDD9BE"
        barStyle="dark-content"
      />

      <Text style={styles.topText}>
        THE ART OF EVERYDAY LUXURY
      </Text>

      {/* Decorative fashion card */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
          }}
          style={styles.image}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={styles.imageOverlay}>
            <Text style={styles.imageCaption}>
              EFFORTLESSLY YOU
            </Text>
          </View>
        </ImageBackground>
      </View>

      <Text style={styles.brandName}>
        LIKÉ Studio
      </Text>

      <Text style={styles.tagline}>
        Your Style, Your Story.
      </Text>

      <View style={styles.offerBox}>
        <Text style={styles.offerTitle}>
          20% OFF
        </Text>

        <Text style={styles.offerSubtitle}>
          LIMITED STOCK!
        </Text>
      </View>

      <Text style={styles.offerDescription}>
        On shopping above Rs. 1,200
      </Text>

      <Text style={styles.bottomText}>
        FASHION  •  BEAUTY  •  ACCESSORIES
      </Text>

      <Text style={styles.loadingText}>
        Discover your style...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDD9BE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
 
  topText: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#513A2E',
    marginBottom: 22,
    textAlign: 'center',
  },

  imageContainer: {
    width: 270,
    height: 270,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#513A2E',
    backgroundColor: '#D6C3B0',
  },

  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  imageStyle: {
    borderRadius: 18,
  },

  imageOverlay: {
    backgroundColor: 'rgba(81, 58, 46, 0.45)',
    paddingVertical: 15,
    alignItems: 'center',
  },

  imageCaption: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  brandName: {
    fontSize: 34,
    fontWeight: '600',
    color: '#513A2E',
    marginTop: 22,
    letterSpacing: 2,
  },

  tagline: {
    fontSize: 13,
    color: '#513A2E',
    marginTop: 7,
    letterSpacing: 1,
  },

  offerBox: {
    backgroundColor: '#513A2E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#513A2E',
  },

  offerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },

  offerSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: 3,
  },

  offerDescription: {
    fontSize: 12,
    color: '#513A2E',
    marginTop: 10,
  },

  bottomText: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: '#513A2E',
    marginTop: 22,
    textAlign: 'center',
  },

  loadingText: {
    fontSize: 10,
    color: '#795E4C',
    marginTop: 18,
  },
});
