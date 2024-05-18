import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

export const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
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
      <Button title='Kayıt Ol' onPress={handleCreateUser} />
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
