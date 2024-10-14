import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
const SearchLogo = require("../assets/images/SearchLogo.png");
const FilterLogo = require("../assets/images/FilterLogo.png");
const ReadLogo = require("../assets/images/ReadLogo.png");
const BackLogo = require("../assets/images/BackLogo.png");
import useFetchComicDetails from '@/hooks/useFetchComicDetails';
import { useNavigation } from 'expo-router';
import useFetchCategories from '@/hooks/useFetchCategories';
const ComicDetailScreen = ({route}) => {
  const { slug, name } = route.params; // Get the slug from route params
  const { comic, loading, error } = useFetchComicDetails(slug);
  const { categories, categoriesLoading, categoriesError } =
    useFetchCategories();
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigation();
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
  if (!comic) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Not found!</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-row justify-center items-center mt-[50px] mx-[9px]">
        <TouchableOpacity onPress={() => navigation.navigate("HomePageScreen")}>
          <Image
            source={BackLogo}
            style={{ width: 45, height: 45 }}
            resizeMode="contain"
            className="mr-4 rounded-full"
          />
        </TouchableOpacity>
        <View className="flex-row justify-center items-center bg-white rounded-3xl shadow-md p-3 flex-1">
          <Image
            source={SearchLogo}
            style={{ width: 18, height: 19 }}
            resizeMode="contain"
            className="mr-2"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1 h-10"
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Text className="text-black text-center">
              {name}
            </Text>
          </ScrollView>
          <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
            <Image
              source={FilterLogo}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>
      {showCategories && (
        <ScrollView className="bg-gray-200 mt-[8px] mx-[9px] p-4 rounded-2xl">
          {categoriesLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : categoriesError ? (
            <Text style={{ color: "red" }}>
              Error: {categoriesError.message}
            </Text>
          ) : (
            categories.map((category, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setShowCategories(false); // Close the category dropdown
                    navigation.navigate("CategoryScreen", {
                      slug: category.slug,
                      name: category.name,
                    });
                  }}
                >
                  <Text className="text-black text-base py-2 my-2">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}
      <View className='mt-[8px]'>
        <Image
          source={{
            uri: `https://otruyenapi.com/uploads/comics/${comic.thumb_url}`,
          }}
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
          className='rounded-2xl'
        />
      </View>
    </SafeAreaView>
  )
}

export default ComicDetailScreen;
