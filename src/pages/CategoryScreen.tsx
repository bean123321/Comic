import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
  } from "react-native";
import { useNavigation } from "expo-router";
import useFetchCategoryDetails from "@/hooks/useFetchCategoryDetails";
import useFetchCategories from "@/hooks/useFetchCategories";
const SearchLogo = require("../assets/images/SearchLogo.png");
const FilterLogo = require("../assets/images/FilterLogo.png");
const ReadLogo = require("../assets/images/ReadLogo.png");  
const CategoryScreen = ({route}) => {
  const { slug } = route.params; // Get the slug from route params
  const {category, loading, error} = useFetchCategoryDetails(slug);
  const { categories, categoriesLoading, categoriesError } = useFetchCategories();
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigation();   
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    if (!loading) {
      setShowCategories(!showCategories);
    }
  }, [loading]);
  
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      </View>
    );
  }
  if (!category) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Not found!</Text>
      </SafeAreaView>
    );
  }  
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-center items-center bg-white rounded-3xl shadow-md mt-[50px] mx-[8px] p-2">
            <Image
            source={SearchLogo}
            style={{ width: 18, height: 19 }}
            resizeMode="contain"
            className="mr-2"
            />
            <TextInput
            placeholder={capitalizeFirstLetter(slug)}
            className="flex-1 h-10 text-black"
            editable={false}
            />
            <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
                <Image
                    source={FilterLogo}
                    style={{ width: 20, height: 10 }}
                    resizeMode="contain"
                    className="mr-2 p-2"
                />
            </TouchableOpacity>
        </View>
        {showCategories && (
            <ScrollView className="bg-gray-200 mt-4 mx-[8px] p-4 rounded-2xl">
            {categoriesLoading ? (
                <ActivityIndicator size="small" color="#000000" />
            ) : categoriesError ? (
                <Text style={{ color: "red" }}>Error: {categoriesError.message}</Text>
            ) : (
                categories.map((category, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => {
                    navigation.navigate("CategoryScreen", {
                        slug: category.slug,
                    });
                    }}>
                    <Text className="text-black text-base py-2 my-2">
                        {category.name}
                    </Text>
                    </TouchableOpacity>
                </View>
                ))
            )}
            </ScrollView>
        )}
        <ScrollView>
            {category.map((ct, index) => (
            <TouchableOpacity
                key={index}
                className="flex-row justify-between my-2 rounded-2xl"
            >
                <View className="flex-row items-center">
                <Image
                    source={{ uri: `https://otruyenapi.com/uploads/comics/${ct.thumb_url}` }}
                    style={{ width: 60, height: 96 }}
                    resizeMode="contain"
                />
                <Text className="text-gray-400 text-xs font-bold">
                    {ct.name?.length > 35
                    ? `${ct.name.slice(0, 35)}...`
                    : ct.name}
                </Text>
                </View>
                <Image
                    source={ReadLogo}
                    style={{ width: 32, height: 32 }}
                    resizeMode="contain"
                    className="mr-4 mt-2"
                />
            </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default CategoryScreen;
