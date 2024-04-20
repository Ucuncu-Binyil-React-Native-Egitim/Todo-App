import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { TodoItem } from '../components/TodoItem';
import { useState } from 'react';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/features/todoSlice';

export const TodoList = () => {
  const [text, setText] = useState();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addNewItem = () => {
    if (text === '') {
      Alert.alert('Please enter a todo and press add');
    } else {
      dispatch(addTodo(text));
      setText('');
    }
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={(e) => setText(e)}
            style={styles.textInput}
            placeholder='Enter a todo'
            placeholderTextColor={'#555'}
          />
          <TouchableOpacity style={styles.button} onPress={addNewItem}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={(item) => <TodoItem data={item} range={todos.length} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 24 }}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          ListEmptyComponent={() => <Text>boş</Text>}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#adadad',
    color: 'black',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 16,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seperator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
});
