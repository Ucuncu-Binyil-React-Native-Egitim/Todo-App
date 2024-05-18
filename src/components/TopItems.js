import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEditButtonOff, toggleEditButton } from '../store/features/topItems';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';

export const TopItems = () => {
  const buttonState = useSelector((state) => state.topItems);
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const isEdit = buttonState.isEdit;
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(setEditButtonOff());
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [todos]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={[styles.buttonText, { color: '#007AFF' }]}>Çıkış yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={isDisable}
        style={styles.editButton}
        onPress={() => dispatch(toggleEditButton())}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isDisable ? 'grey' : isEdit ? 'red' : '#007AFF' },
          ]}
        >
          {isEdit ? 'Cancel' : 'Edit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
});
