import { View } from 'react-native';
import { TodoList } from './src/screens/todoList';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Root } from './src/navigation/root';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <NavigationContainer>
          <StatusBar style='dark' />
          <Root />
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
}
