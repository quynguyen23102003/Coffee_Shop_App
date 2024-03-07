import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All')
    return data;
  else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setcategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(
    categoryIndex.category, CoffeeList
  ));
  const tabBerHeight = useBottomTabBarHeight();

  // console.log("sortCoffee =", sortedCoffee.length);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.title}>Find the best{'\n'}coffee for you</Text>
        {/* Search Input */}
        <View style={styles.groupInput}>
          <TouchableOpacity onPress={() => { }}>
            <CustomIcon
              style={styles.iconInput}
              name='search'
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
        </View>
        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.category}
        >
          {
            categories.map((item, index) => (
              <View key={index.toString()} style={styles.groupCategory}>
                <TouchableOpacity
                  onPress={() => {
                    setcategoryIndex({ index: index, category: categories[index] });
                    setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)]);
                  }}
                  style={styles.btnCategory}>
                  <Text style={[styles.textCategory, categoryIndex.index == index
                    ? { color: COLORS.primaryOrangeHex }
                    : {}
                  ]}>
                    {item}
                  </Text>
                  {categoryIndex.index == index
                    ? <View style={styles.activeCategory} /> : <></>}
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        {/* Coffee list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.FlatlistContainer}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <CoffeeCard 
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2].price}
                buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            )
          }}
        />
        {/* Beans list */}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  },
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  groupInput: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center'
  },
  iconInput: {
    marginHorizontal: SPACING.space_20
  },
  textInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  groupCategory: {
    paddingHorizontal: SPACING.space_15
  },
  btnCategory: {
    alignItems: 'center'
  },
  category: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  textCategory: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  FlatlistContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  }
})