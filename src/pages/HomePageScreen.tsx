import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import { useNavigation } from "expo-router";
import useFetchComics from "@/hooks/useFetchComics";
const SearchLogo = require("../assets/images/SearchLogo.png");
const FilterLogo = require("../assets/images/FilterLogo.png");

const HomePageScreen = () => {
  const { comics, loading, error } = useFetchComics();
  const [searchQuery, setSearchQuery] = useState("");
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
  const filteredComics = comics.filter(
    (comic) =>
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
      <View className="flex-row justify-center items-center bg-white rounded-3xl shadow-md mt-[50px] mx-[8px] p-2">  
        <Image
          source={SearchLogo}
          style={{ width: 18, height: 19 }}
          resizeMode="contain"
          className="mr-2"
        />
        <TextInput
          placeholder="Search Comic"
          className="flex-1 h-10 text-black"
          value={searchQuery} onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Image
            source={FilterLogo}
            style={{ width: 20, height: 10 }}
            resizeMode="contain"
            className="mr-2"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-[20px] ml-[9px]">
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
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: `https://otruyenapi.com/uploads/comics/${comic.thumb_url}`,
                      }}
                      className="w-[120px] h-[150px] rounded-2xl"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text className="text-lg font-normal">{comic.name.length > 10 ? `${comic.name.slice(0, 10)}...` : comic.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePageScreen;
