import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';

const CardList = ({
  cards,
}: {
  cards: { id: any; onPress?: () => void; source?: any }[];
}) => (
  <ScrollView
    style={styles.container}
    horizontal
    showsHorizontalScrollIndicator={false}
  >
    {cards.map((c) => (
      <Image style={styles.card} key={c.id} source={c.source} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    marginLeft: 10,
    height: 208,
  },
  card: {
    height: 208,
    width: 152,
    marginRight: 12,
  },
});

export default CardList;
