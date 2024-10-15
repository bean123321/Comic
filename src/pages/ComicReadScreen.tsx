import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Image, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';

const ComicReadScreen = ({ route }) => {
  const { chapterUrl } = route.params;
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChapterImages = async () => {
    try {
      const response = await axios.get(chapterUrl);
      const { domain_cdn, item } = response.data.data;
      const images = item.chapter_image.map((image) => ({
        uri: `${domain_cdn}/${item.chapter_path}/${image.image_file}`
      }));
      setChapterImages(images);
    } catch (error) {
      setError('Failed to load chapter images.');
      console.error('Error fetching chapter images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterImages();
  }, []);

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item.uri }}
      style={{ width: '100%', height: 500, marginBottom: 10 }}
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
          <Text style={{ color: 'red' }}>{error}</Text>
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
