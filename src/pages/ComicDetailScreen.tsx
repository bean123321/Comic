import React, { useState } from "react";
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
import useFetchComicDetails from "@/hooks/useFetchComicDetails";
import { useNavigation } from "expo-router";
import useFetchCategories from "@/hooks/useFetchCategories";
const ComicDetailScreen = ({ route }) => {
  const { slug, name } = route.params; // Get the slug from route params
  const { comic, loading, error } = useFetchComicDetails(slug);
  const { categories, categoriesLoading, categoriesError } =
    useFetchCategories();
  const [showCategories, setShowCategories] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
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
    <SafeAreaView className="flex-1 bg-white">
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
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-black text-center">{name}</Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-gray-200 mt-[8px] mx-[9px] p-4 rounded-2xl"
        >
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
      <View className="mt-[8px] mx-[8px]">
        <Image
          source={{
            uri: `https://otruyenapi.com/uploads/comics/${comic.item.thumb_url}`,
          }}
          style={{ width: "100%", height: 300 }}
          resizeMode="cover"
          className="rounded-2xl"
        />
      </View>
      <View className="flex-row mt-[10px] mx-[8px] justify-between">
        <View className="mt-[5px]">
          <Text className="text-xl font-semibold">
            {comic?.seoOnPage?.seoSchema?.director}
          </Text>
        </View>
        <View>
          <Image
            source={ReadLogo}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
            className="rounded-full"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mx-[8px] mt-[10px]"
      >
        <Text className="text-lg font-normal">
          {comic.item.content.replace(/<\/?p>/g, "")}
        </Text>
      </ScrollView>
      <View className="justify-center items-center pb-8 mt-[10px]">
        <TouchableOpacity
          className="bg-[#424242] rounded-3xl w-[280px] h-[43px]"
          onPress={() => setShowChapters(!showChapters)}
        >
          <Text className="text-white text-base text-center font-normal pt-[8px]">
            Read now
          </Text>
        </TouchableOpacity>
      </View>
      {showChapters && (
        <>
          {comic?.item?.chapters &&
          comic?.item?.chapters[0]?.server_data?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mx-[8px] mt-[10px]"
            >
              <Text className="text-lg font-bold mb-2">Chapters:</Text>
              {comic?.item?.chapters[0]?.server_data?.map((chapter, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-gray-200 p-3 mb-2 rounded-2xl"
                  onPress={() => {
                    setShowChapters(false);
                    navigation.navigate("ComicReadScreen", {
                      chapterUrl: chapter.chapter_api_data,
                    });
                  }}
                >
                  <Text className="text-black">{`Chapter ${chapter.chapter_name}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text className="text-lg mx-[8px] mt-[10px]">
              Hiện tại chưa có thông tin truyện, vui lòng chờ đợi!
            </Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ComicDetailScreen;
