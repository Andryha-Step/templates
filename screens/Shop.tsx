import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function Shop() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basket:</Text>
      <View style={{ height: `100%`, justifyContent: `center` }}>
        <Text style={styles.text}>You have no purchases yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: `bold`,
    marginBottom: 6,
    marginLeft: 10,
  },
  text: {
    textAlign: `center`,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: `80%`,
  },
});
