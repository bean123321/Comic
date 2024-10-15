import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import useFetchReadComics from "@/hooks/useFetchReadComics";

const ComicReadScreen = ({ route }) => {
  const { chapterUrl } = route.params;
  const { chapterImages, loading, error } = useFetchReadComics(chapterUrl);
  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item.uri }}
      style={{ width: "100%", height: 500, marginBottom: 10 }}
      resizeMode="contain"
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading ? (
        <SafeAreaView className="flex-1 bg-black justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </SafeAreaView>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={chapterImages}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ComicReadScreen;
