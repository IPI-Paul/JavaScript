import { useState } from 'react';
import { 
  Button,
  FlatList,
  StatusBar,
  StyleSheet, 
  View 
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, {
        text: enteredGoalText, id: Math.random().toString()
        //use : key: Math.random().toString() to not need keyExtractor
      }
    ]);
    endGoalHandler();
  }

  function deleteGoalItem(id) {
    setCourseGoals(currentCourseGoals => 
      currentCourseGoals.filter(goal => goal.id !== id)
    );
  }

  return (
    <>
      <StatusBar barStyle={'auto'} />
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color='#5e0acc' 
          onPress={startAddGoalHandler}
        />
        <GoalInput 
          onAddGoal={addGoalHandler} 
          isVisible={modalIsVisible}
          onCancel={endGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            alwaysBounceVertical={false}
            renderItem={(itemData) => 
              <GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id} 
                onDeleteItem={deleteGoalItem}
              />
            }
            keyExtractor={(item, index) => {
              return item.id
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  }, 
  goalsContainer: {
    flex: 7
  }
});
