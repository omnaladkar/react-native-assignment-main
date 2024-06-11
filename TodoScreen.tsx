import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { addTodoItem, getTodoItems, updateTodoItem, deleteTodoItem } from './helper';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};

const TodoScreen = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = useState('');
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const items = await getTodoItems(page, 10);
      setTodoItems(prevItems => [...prevItems, ...items]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setIsFetching(false);
  };

  const openUpdateModal = (item: TodoItem) => {
    setSelectedTodo(item);
    setUpdatedText(item.title);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (selectedTodo) {
      try {
        const updatedTodo: TodoItem = { ...selectedTodo, title: updatedText };
        await updateTodoItem(updatedTodo);
        setTodoItems(prevItems =>
          prevItems.map(item => (item.id === selectedTodo.id ? updatedTodo : item))
        );
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleAddTodo = async () => {
    try {
      await addTodoItem(newTodoItem);
      setTodoItems([]);
      setPage(0);
      loadMoreItems();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodoItem(id);
      setTodoItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={todoItems}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openUpdateModal(item)}>
            <View style={styles.todoItem}>
              <Text style={styles.sectionDescription}>{item.title}</Text>
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>TODO</Text>
            <TextInput
              style={styles.sectionDescription}
              placeholder="Add your todo item"
              onChange={e => setNewTodoItem(e.nativeEvent.text)}
            />
            <Button title="Add" onPress={handleAddTodo} />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              value={updatedText}
              onChangeText={setUpdatedText}
            />
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TodoScreen;
