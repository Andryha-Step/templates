/* eslint-disable global-require */
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from 'react-native';

import { RootStackParamList } from '../types';
import CardList from '../components/CardList';

export default function Dashboard({
  navigation,
}: StackScreenProps<RootStackParamList, 'Dashboard'>) {
  const cards = [
    { id: 1, source: require(`../assets/images/mockImage.png`) },
    { id: 2, source: require(`../assets/images/mockImage.png`) },
    { id: 3, source: require(`../assets/images/mockImage.png`) },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image
        style={styles.image}
        source={require(`../assets/images/header1.png`)}
      />
      <Image
        style={styles.image2}
        source={require(`../assets/images/header2.png`)}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.searchButton}
        onPress={() => navigation.navigate(`Search`, { isSearching: true })}
      >
        <Image
          style={styles.searchImage}
          source={require(`../assets/images/search.png`)}
        />
        <Text style={styles.searchText}>Search Ob-vious-lyyy</Text>
      </TouchableOpacity>
      <Text style={styles.title}>New in:</Text>
      <View>
        <CardList cards={cards} />
      </View>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseText}>Browse Products</Text>
      </TouchableOpacity>
      <View style={styles.contact}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() =>
            Linking.openURL(`https://www.instagram.com/ob.vious.lyyy/ `)
          }
        >
          <Image
            style={styles.contactImage}
            source={require(`../assets/images/instagram.png`)}
          />
          <Text style={styles.contactText}>ob.vious.lyyy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() =>
            Linking.openURL(`https://www.instagram.com/theblackgirlsketchbook/`)
          }
        >
          <Image
            style={styles.contactImage}
            source={require(`../assets/images/instagram.png`)}
          />
          <Text style={styles.contactText}>theblackgirlsketchbook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: `100%`,
    height: 259,
  },
  image2: {
    width: `100%`,
    height: 39,
  },
  contact: {
    flexDirection: `row`,
    marginVertical: 20,
    justifyContent: `center`,
  },
  contactButton: {
    alignItems: `center`,
    justifyContent: `center`,
    marginLeft: 15,
  },
  contactImage: {
    width: 50,
    height: 50,
  },
  contactText: {
    fontSize: 12,
    marginTop: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: `80%`,
  },
  searchButton: {
    flexDirection: `row`,
    marginTop: 8,
    width: 247,
    alignSelf: `center`,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: `#f5c500`,
    borderRadius: 6,
    paddingVertical: 11,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  searchImage: {
    width: 19,
    height: 19,
  },
  searchText: {
    fontSize: 18,
    fontWeight: `bold`,
    color: `#fff`,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: `bold`,
    marginTop: 8,
    marginBottom: 6,
    marginLeft: 10,
  },
  browseButton: {
    backgroundColor: `#f5c500`,
    borderRadius: 20,
    paddingVertical: 8,
    width: 189,
    alignSelf: `center`,
    alignItems: `center`,
    marginTop: 10,
  },
  browseText: {
    fontSize: 18,
    fontWeight: `bold`,
    color: `#fff`,
  },
});
