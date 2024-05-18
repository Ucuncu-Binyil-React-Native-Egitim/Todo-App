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
  ActivityIndicator,
} from 'react-native';
import { TodoItem } from '../components/TodoItem';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';

export const TodoList = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const docReferance = collection(FIREBASE_DB, 'todos');
    const q = query(
      docReferance,
      where('userId', '==', FIREBASE_AUTH.currentUser.uid)
    );

    const subscriber = onSnapshot(q, {
      next: (snapshot) => {
        const arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(arr);
      },
    });

    setLoading(false);
    return () => subscriber();
  }, []);

  const addNewItem = async () => {
    if (text.trim() === '') {
      setText('');
      Alert.alert('Please enter a todo and press add');
    } else {
      const todoId = uuid.v4();
      const currentDate = new Date();
      try {
        setLoading(true);
        await setDoc(doc(FIREBASE_DB, 'todos', todoId), {
          id: todoId,
          userId: FIREBASE_AUTH.currentUser.uid,
          title: text,
          createdAt: currentDate.toLocaleString('tr-TR'),
          completed: false,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setText('');
        setLoading(false);
      }
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
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              {
                backgroundColor: `rgba(0, 123, 255, ${text === '' ? 0.4 : 1})`,
              },
            ]}
            onPress={addNewItem}
            disabled={text === ''}
          >
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={styles.buttonText}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={(item) => <TodoItem data={item} range={todos?.length} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 24 }}
          scrollEnabled={todos?.length}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyComponent}>
              <Ionicons name='add-circle' size={64} color={'rgba(0,0,0,0.2)'} />
              <Text style={styles.emptyText}>Get things done!</Text>
            </View>
          )}
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
  emptyComponent: {
    marginTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'grey',
    fontSize: 24,
  },
});
