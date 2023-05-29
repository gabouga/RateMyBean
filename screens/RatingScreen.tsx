import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, Pressable } from 'react-native';
import { BrewingMethod, Coffee, Rating } from '../Types';
import { add, remove } from '../Crud';
import { styles } from "../Styles";
import DropDownPicker from 'react-native-dropdown-picker';
import RatingItem from "../components/RatingItem";

type RatingPropsType = {
  ratings: Rating[],
  setRatings: (ratings: Rating[]) => void,
  coffees: Coffee[],
  brewMethods: BrewingMethod[],
}

type NewRatingModalProps = {
  ratings: Rating[],
  setRatings: (ratings: Rating[]) => void,
  newRatingVisible: boolean,
  setNewRatingVisible: (visible: boolean) => void,
  coffees: Coffee[],
  brewMethods: BrewingMethod[],
}

function NewRatingModal(props: NewRatingModalProps): React.ReactElement {
  const { ratings, setRatings, newRatingVisible, setNewRatingVisible, coffees, brewMethods } = props;
  const coffeeItems = coffees?.map(e => ({ label: e.name, value: e.name, key: e.id })) || [];
  const brewDropDownItems = brewMethods?.map(e => ({ label: e.name, value: e.name })) || [];
  const [scoreValue, setScoreValue] = useState<string>("");
  const [grindSize, setGrindSize] = useState<string>("");
  const [brewTime, setBrewTime] = useState<string>("");
  const [brewTimeUnit, setBrewTimeUnit] = useState<string>("");
  const [coffeeDropDownOpen, setCoffeeDropDownOpen] = useState<boolean>(false);
  const [coffeeName, setCoffeeName] = useState<string>("");
  const [brewDropDownOpen, setBrewDropDownOpen] = useState<boolean>(false);
  const [brewMethodName, setBrewMethodName] = useState<string>("");

  function createRating() {
    const intScoreValue = parseInt(scoreValue);
    const intGrindSize = parseInt(grindSize);
    const intBrewTime = parseInt(brewTime);
    if (intGrindSize == NaN || intBrewTime == NaN || intScoreValue == NaN) {
      return;
    }

    const newRating: Rating = {
      id: 0,
      date: new Date,
      score: intScoreValue,
      brewingMethod: brewMethods.find(e => e.name == brewMethodName),
      grindSize: intGrindSize,
      brewTime: intBrewTime,
      brewTimeUnit: brewTimeUnit,
      coffee: coffees.find(e => e.name == coffeeName),
    }
    add(ratings, setRatings, newRating);
    setNewRatingVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={newRatingVisible}
      onRequestClose={() => {
        setNewRatingVisible(!newRatingVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create a new rating</Text>
          <Text style={styles.modalLabel}>Coffee:</Text>
          <View style={{ elevation: 1, zIndex: 1 }}>
            <DropDownPicker
              open={coffeeDropDownOpen}
              value={coffeeName}
              items={coffeeItems}
              setOpen={setCoffeeDropDownOpen}
              setValue={setCoffeeName}
            />
          </View>
          <Text style={styles.modalLabel}>Brew Method:</Text>
          <View style={{ elevation: 1, zIndex: 1 }}>
            <DropDownPicker
              open={brewDropDownOpen}
              value={brewMethodName}
              items={brewDropDownItems}
              setOpen={setBrewDropDownOpen}
              setValue={setBrewMethodName}
            />
          </View>
          <Text style={styles.modalLabel}>Grind size:</Text>
          <TextInput
            style={styles.input}
            value={grindSize}
            onChangeText={setGrindSize}
            placeholder="Score value"
          />
          <Text style={styles.modalLabel}>Brew time:</Text>
          <TextInput
            style={styles.input}
            value={brewTime}
            onChangeText={setBrewTime}
            placeholder="Score value"
          />
          <Text style={styles.modalLabel}>Brew time unit</Text>
          <TextInput
            style={styles.input}
            value={brewTimeUnit}
            onChangeText={setBrewTimeUnit}
            placeholder="Score value"
          />
          <Text style={styles.modalLabel}>Score value:</Text>
          <TextInput
            style={styles.input}
            value={scoreValue}
            onChangeText={setScoreValue}
            placeholder="Score value"
          />
          <View style={styles.rowView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setNewRatingVisible(!newRatingVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={createRating}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default function RatingScreen(props: RatingPropsType) {
  const {
    ratings,
    setRatings,
    coffees,
    brewMethods
  } = props;

  function deleteRating(rating: Rating) {
    remove(ratings, setRatings, rating);
  }

  const [newRatingVisible, setNewRatingVisible] = useState<boolean>(false);

  return (
    <View>
      <View>
        <Button
          title="New Rating"
          onPress={() => setNewRatingVisible(true)}
        />
      </View>
      <NewRatingModal ratings={ratings} setRatings={setRatings} newRatingVisible={newRatingVisible} setNewRatingVisible={setNewRatingVisible} coffees={coffees} brewMethods={brewMethods} />
      <FlatList
        data={ratings}
        renderItem={(item) => <RatingItem item={item} deleteItem={deleteRating} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
