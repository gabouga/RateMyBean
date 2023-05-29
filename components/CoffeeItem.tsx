import { Coffee } from '../Types';
import { cardStyles } from '../Styles';
import { View, Text, ListRenderItemInfo, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CoffeeItemProps = {
  item: ListRenderItemInfo<Coffee>,
  deleteItem: (item: Coffee) => void,
}
export default function CoffeeItem(props: CoffeeItemProps) {
  const { item, deleteItem } = props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.rowView}>
        <View>
          <Text>{item.item.name}</Text>
          <Text>Roast: {item.item.roast}</Text>
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
