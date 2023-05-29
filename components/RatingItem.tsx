import { Rating } from '../Types';
import { cardStyles } from '../Styles';
import { View, Text, ListRenderItemInfo, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RatingItemProps = {
  item: ListRenderItemInfo<Rating>,
  deleteItem: (item: Rating) => void,
}
export default function RatingItem(props: RatingItemProps) {
  const { item, deleteItem } = props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.rowView}>
        <View>
          <Text>Coffee: {item.item.coffee.name}</Text>
          <Text>Brew Method: {item.item.brewingMethod.name}</Text>
        </View>
        <View>
          <Pressable
            style={cardStyles.deleteButton}
            onPress={() => { deleteItem(item.item) }}>
            <Text style={cardStyles.textStyle}>
              <MaterialCommunityIcons name="close" color={'white'} size={20} />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
