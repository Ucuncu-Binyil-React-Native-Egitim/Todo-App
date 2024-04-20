import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = () => {
  const [buttonState, setButtonState] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setButtonState(!buttonState)}
      >
        <Text
          style={[
            styles.buttonText,
            { color: buttonState ? 'red' : '#007AFF' },
          ]}
        >
          {buttonState ? 'Cancel' : 'Edit'}
        </Text>
      </TouchableOpacity>
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
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
});
