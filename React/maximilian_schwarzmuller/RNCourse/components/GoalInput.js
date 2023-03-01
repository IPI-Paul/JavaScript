import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";

function GoalInput(props) {
  const {onAddGoal, isVisible, onCancel} = props
  const [enteredGoalText, setEnteredGoalText] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler() {
    onAddGoal(enteredGoalText);
    setEnteredGoalText('');
  }

  return (
    <Modal visible={isVisible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image 
          source={require('../assets/images/edit.png')} 
          style={styles.image}
        />
        <TextInput 
          placeholder='Your course goal!' 
          style={styles.textInput} 
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title='Add Goal' 
              onPress={addGoalHandler} 
              color='#5e0acc'
            />
          </View>
          <View style={styles.button}>
            <Button 
              title="Cancel" onPress={onCancel} 
              color='#f31282'
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    width: '100%',
    padding: 16,
    borderRadius: 10
  }, 
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row'
  },
  button: {
    width: 100,
    marginHorizontal: 8
  },
  image: {
    width: 50,
    height: 50,
    margin: 20
  }
});