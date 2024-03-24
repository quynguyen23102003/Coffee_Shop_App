import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? addToFavoriteList(type,id) : deleteFromFavoriteList(type, id);
  }

  const BackHandler = () => {
    navigation.pop();
  }

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo 
         EnableBackhandler = {true}
         imagelink_portrait = {ItemOfIndex.imagelink_portrait}
         type = {ItemOfIndex.type}
         id = {ItemOfIndex.id}
         favourite = {ItemOfIndex.favourite}
         name = {ItemOfIndex.name}
         special_ingreidient = {ItemOfIndex.special_ingreidient}
         ingredients = {ItemOfIndex.ingredients}
         average_rating = {ItemOfIndex.average_rating}
         ratings_count = {ItemOfIndex.ratings_count}
         roasted = {ItemOfIndex.roasted}
         BackHandler = {BackHandler}
         ToggleFavourite = {ToggleFavourite}
         />
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  }
})