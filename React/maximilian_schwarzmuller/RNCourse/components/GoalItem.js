import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  const {text, onDeleteItem, id} = props
  return (
    <View style={styles.goalItem}>
      <Pressable 
        android_ripple={styles.rippleText}
        onPress={onDeleteItem.bind(this, id)}
      >
          <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  }, 
  goalText: {
    padding: 8,
    color: 'white'
  },
  rippleText: {
    color: '#210644'
  }
});