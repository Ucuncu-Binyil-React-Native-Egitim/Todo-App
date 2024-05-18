import { createStackNavigator } from '@react-navigation/stack';
import { TodoList } from '../screens/todoList';
import { Login } from '../screens/Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { ActivityIndicator, View } from 'react-native';
import { CreateUser } from '../screens/CreateUser';

const Stack = createStackNavigator();

export const Root = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={'blue'} size={'large'} />
      </View>
    );
  }

  const mainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='TodoList' component={TodoList} />
      </Stack.Navigator>
    );
  };

  const authStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Sign In' component={Login} />
        <Stack.Screen name='Create User' component={CreateUser} />
      </Stack.Navigator>
    );
  };

  if (user) {
    return mainStack();
  } else {
    return authStack();
  }
};
