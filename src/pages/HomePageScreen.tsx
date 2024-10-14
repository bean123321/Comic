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
import useFetchComics from "@/hooks/useFetchComics";
import useFetchCategories from "@/hooks/useFetchCategories";
const SearchLogo = require("../assets/images/SearchLogo.png");
const FilterLogo = require("../assets/images/FilterLogo.png");
const BackLogo = require("../assets/images/BackLogo.png");
const HomePageScreen = () => {
  const { comics, loading, error } = useFetchComics();
  const { categories, categoriesLoading, categoriesError } =
    useFetchCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigation();

  // Function to chunk comics into groups of 5
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Filter comics based on the search query
  const filteredComics = comics.filter((comic) =>
    comic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const comicChunks = chunkArray(filteredComics.slice(0, 200), 5);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-center items-center mt-[50px] mx-[9px]">
        <TouchableOpacity
          onPress={() => navigation.navigate("GetStartedScreen")}
        >
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
          <TextInput
            placeholder="Search Comic"
            className="flex-1 h-10 text-black"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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

      <View className="mt-[10px] ml-[9px]">
        <Text className="text-lg font-normal text-black">Home</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {comicChunks.map((chunk, chunkIndex) => (
          <ScrollView
            key={chunkIndex}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row space-x-3 ml-[9px]">
              {chunk.map((comic, index) => (
                <View className="pr-[8px] pt-[8px]" key={index}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate("ComicDetailScreen", {
                      slug: comic.slug,
                      name: comic.name,
                    });
                  }}>
                    <Image
                      source={{
                        uri: `https://otruyenapi.com/uploads/comics/${comic.thumb_url}`,
                      }}
                      className="w-[120px] h-[150px] rounded-2xl"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text className="text-lg font-normal">
                    {comic.name.length > 10
                      ? `${comic.name.slice(0, 10)}...`
                      : comic.name}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePageScreen;
