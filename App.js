import { View } from 'react-native';
import { TodoList } from './src/screens/todoList';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <View style={{ flex: 1, backgroundColor: '#d4d4d4' }}>
          <TodoList />
        </View>
      </ActionSheetProvider>
    </Provider>
  );
}
