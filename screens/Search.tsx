/* eslint-disable global-require */
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import {
  Animated,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Input from '../components/Input';
import { Text, View } from '../components/Themed';

export default function Search({
  route,
  handleSearch,
}: {
  route: any;
  handleSearch: () => void;
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState(``);
  let searchRef = useRef(null as any);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const transformYAnim = useRef(new Animated.Value(-200)).current;
  const transformYAnim2 = useRef(new Animated.Value(0)).current;

  console.log(`route`, route);

  useEffect(() => {
    if (route && route.params && route.params.isSearching) {
      setIsSearching(true);
      searchRef.focus();
    }
  }, [route]);

  useEffect(() => {
    console.log(isSearching);
    if (isSearching) {
      Animated.timing(transformYAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      Animated.timing(transformYAnim2, {
        toValue: -200,
        duration: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transformYAnim, {
        toValue: -200,
        duration: 10,
        useNativeDriver: true,
      }).start();
      Animated.timing(transformYAnim2, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [isSearching]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: transformYAnim2 }] }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.searchButton}
          onPress={() => {
            setIsSearching(true);
            searchRef.focus();
          }}
        >
          <Image
            style={styles.searchImage}
            source={require(`../assets/images/search.png`)}
          />
          <Text style={styles.searchText}>
            {searchText || `Search Ob-vious-lyyy`}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchWrapper,
          { opacity: fadeAnim, transform: [{ translateY: transformYAnim }] },
        ]}
      >
        <TextInput
          ref={(input) => {
            searchRef = input;
          }}
          style={styles.input}
          placeholder="Search"
          onChangeText={(v) => setSearchText(v)}
          onBlur={() => {
            setIsSearching(false);
          }}
        />
      </Animated.View>
      {/* <Text>Search results here...</Text> */}
      <Text />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    position: `relative`,
  },
  title: {
    fontSize: 20,
    fontWeight: `bold`,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: `80%`,
  },
  input: {
    borderWidth: 3,
    borderColor: `#F5C500`,
    width: `110%`,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 6,
    position: `relative`,
    left: -3,
    fontSize: 18,
    fontWeight: `bold`,
    paddingLeft: 18,
  },
  searchWrapper: {
    position: `absolute`,
    top: 50,
    width: `100%`,
  },
  searchButton: {
    flexDirection: `row`,
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
});
