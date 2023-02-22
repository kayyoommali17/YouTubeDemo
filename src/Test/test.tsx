import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DATA = [
  {id: '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  {id: '3', name: 'Item 3'},
  {id: '4', name: 'Item 4'},
  {id: '5', name: 'Item 5'},
];

const renderItem = item => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.name}</Text>
  </View>
);

const RenderCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>{DATA.map(renderItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#eee',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default RenderCard;
