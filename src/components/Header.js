import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TopItems } from './TopItems';

export const Header = () => {
  return (
    <View style={styles.header}>
      <TopItems />
      <Text style={styles.headerText}>Todo's</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
  },
  headerText: {
    fontSize: 48,
    marginBottom: 16,
  },
});
