
import { BrewingMethod } from '../Types';
import { cardStyles } from '../Styles';
import { View, Text, ListRenderItemInfo, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BrewMethodItemProps = {
  item: ListRenderItemInfo<BrewingMethod>,
  deleteItem: (item: BrewingMethod) => void,
}
export default function BrewMethodItem(props: BrewMethodItemProps) {
  const { item, deleteItem } = props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.rowView}>
        <View>
          <Text>{item.item.name}</Text>
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
