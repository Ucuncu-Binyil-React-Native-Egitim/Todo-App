import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export const TodoItem = ({ data, range }) => {
  const isLastItem = data.index + 1 === range; // false
  const [isDone, setIsDone] = useState(false);

  console.log(data);
  return (
    <TouchableOpacity
      onPress={() => setIsDone(!isDone)}
      style={[
        styles.container,
        {
          borderTopLeftRadius: data.index === 0 ? 16 : 0,
          borderTopRightRadius: data.index === 0 ? 16 : 0,
          borderBottomLeftRadius: isLastItem ? 16 : 0,
          borderBottomRightRadius: isLastItem ? 16 : 0,
        },
      ]}
    >
      <Ionicons
        name={isDone ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        color='black'
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{data.item.text}</Text>
        <Text style={styles.itemDateText}>20.04.2024 13:45:50</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  textContainer: {
    paddingLeft: 8,
  },
  itemText: {
    fontSize: 16,
  },
  itemDateText: {
    fontSize: 11,
    marginTop: 8,
    color: '#a0a0a0',
  },
});
