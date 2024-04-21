import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  toggleComplete,
} from '../store/features/todoSlice';
import { useActionSheet } from '@expo/react-native-action-sheet';

export const TodoItem = ({ data, range }) => {
  const isLastItem = data.index + 1 === range;
  const dispatch = useDispatch();
  const isDone = data.item.completed;
  const topItems = useSelector((state) => state.topItems);
  const { showActionSheetWithOptions } = useActionSheet();

  const onLongPress = () => {
    const options = ['Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // edit func
            break;

          case destructiveButtonIndex:
            dispatch(deleteTodo(data.item.id));
            break;

          case cancelButtonIndex:
            console.log('cancel');
        }
      }
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => dispatch(toggleComplete(data.item.id))}
      onLongPress={onLongPress}
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
      <View style={styles.innerContainer}>
        <Ionicons
          name={isDone ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={24}
          color='black'
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{data.item.text}</Text>
          <Text style={styles.itemDateText}>{data.item.createdAt}</Text>
        </View>
      </View>

      {topItems.isEdit && (
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name='edit' size={24} color={'#007AFF'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => dispatch(deleteTodo(data.item.id))}
          >
            <Ionicons name='trash' size={24} color={'red'} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconButton: {
    padding: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
