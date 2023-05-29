import { View, Text, FlatList, Button, Modal, Pressable, TextInput } from 'react-native';
import { BrewingMethod } from '../Types';
import { add, remove } from '../Crud';
import { useState } from 'react';
import { styles } from '../Styles';
import BrewMethodItem from '../components/BrewMethodItem';

type BrewMethodPropsType = {
  brewMethods: BrewingMethod[],
  setBrewMethods: (brewMethods: BrewingMethod[]) => void,
}


export default function BrewMethodScreen(props: BrewMethodPropsType) {
  const { brewMethods, setBrewMethods } = props;
  const [newBrewMethodVisible, setNewBrewMethodVisible] = useState<boolean>(false);

  function deleteBrewMethod(brewMethod: BrewingMethod) {
    remove(brewMethods, setBrewMethods, brewMethod);
  }

  function NewCoffeeModal() {
    const [nameValue, setNameValue] = useState<string>("");
    const [accessoryValue, setAccessoryValue] = useState<string>("");

    function createBrewMethod() {
      const newBrewMethod: BrewingMethod = {
        id: 0,
        name: nameValue,
        accessory: accessoryValue,
      }
      add(brewMethods, setBrewMethods, newBrewMethod);
      setNewBrewMethodVisible(false);
    }


    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={newBrewMethodVisible}
        onRequestClose={() => {
          setNewBrewMethodVisible(!newBrewMethodVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a new brew method</Text>
            <Text style={styles.modalLabel}>Name:</Text>
            <TextInput
              style={styles.input}
              value={nameValue}
              onChangeText={setNameValue}
              placeholder="Brew method name"
            />
            <Text style={styles.modalLabel}>Accessory:</Text>
            <TextInput
              style={styles.input}
              value={accessoryValue}
              onChangeText={setAccessoryValue}
              placeholder="Accessory name"
            />
            <View style={styles.rowView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setNewBrewMethodVisible(!newBrewMethodVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={createBrewMethod}>
                <Text style={styles.textStyle}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View>
      <View>
        <Button
          title="New brew method"
          onPress={() => setNewBrewMethodVisible(true)}
        />
      </View>
      <NewCoffeeModal />
      <FlatList
        data={brewMethods}
        renderItem={(item) => <BrewMethodItem item={item} deleteItem={deleteBrewMethod} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

