import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEditButtonOff, toggleEditButton } from '../store/features/topItems';
import { useEffect, useState } from 'react';

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
  );
};

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
});
