import { View, Text, FlatList, Button, Modal, Pressable, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Coffee, Roast } from '../Types';
import { add, remove } from '../Crud';
import { useState } from 'react';
import { styles } from '../Styles';
import CoffeeItem from '../components/CoffeeItem';

type CoffeePropsType = {
  coffees: Coffee[],
  setCoffees: (coffees: Coffee[]) => void,
}


export default function CoffeeScreen(props: CoffeePropsType) {
  const { coffees, setCoffees } = props;
  const [newCoffeeVisible, setNewCoffeeVisible] = useState<boolean>(false);

  function deleteCoffee(coffee: Coffee) {
    remove(coffees, setCoffees, coffee);
  }

  function NewCoffeeModal() {
    const [nameValue, setNameValue] = useState<string>("");
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
    const [roastValue, setRoastValue] = useState<Roast>(Roast.Medium);
    const [dropDownItems, setDropDownItems] = useState([
      { label: Roast.Light, value: Roast.Light },
      { label: Roast.Medium, value: Roast.Medium },
      { label: Roast.Dark, value: Roast.Dark },
    ]);

    function createCoffee() {
      const newCoffee: Coffee = {
        id: 0,
        name: nameValue,
        roast: roastValue,
      }
      add(coffees, setCoffees, newCoffee);
      setNewCoffeeVisible(false);
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={newCoffeeVisible}
        onRequestClose={() => {
          setNewCoffeeVisible(!newCoffeeVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a new coffee</Text>
            <Text style={styles.modalLabel}>Name:</Text>
            <TextInput
              style={styles.input}
              value={nameValue}
              onChangeText={setNameValue}
              placeholder="Coffee name"
            />
            <Text style={styles.modalLabel}>Roast:</Text>
            <View style={{ elevation: 1, zIndex: 1 }}>
              <DropDownPicker
                open={dropDownOpen}
                value={roastValue}
                items={dropDownItems}
                setItems={setDropDownItems}
                setOpen={setDropDownOpen}
                setValue={setRoastValue}
              />
            </View>
            <View style={styles.rowView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setNewCoffeeVisible(!newCoffeeVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={createCoffee}>
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
          title="New coffee"
          onPress={() => setNewCoffeeVisible(true)}
        />
      </View>
      <NewCoffeeModal />
      <FlatList
        data={coffees}
        renderItem={(item) => <CoffeeItem item={item} deleteItem={deleteCoffee} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

