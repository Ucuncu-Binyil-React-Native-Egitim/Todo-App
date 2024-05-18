import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { useState } from 'react';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* email */}
      <Text>Email</Text>
      <TextInput
        autoCapitalize='none'
        style={styles.textField}
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <Text>Password</Text>
      {/* password */}
      <TextInput
        autoCapitalize='none'
        style={styles.textField}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <Button title='Giriş yap' onPress={handleLogIn} />
      <Button
        title='Hesabınız yok mu?'
        onPress={() => navigation.navigate('Create User')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  textField: {
    padding: 14,
    backgroundColor: 'grey',
    borderRadius: 8,
  },
});
