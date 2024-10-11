import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { slides } from "@/assets/data/SlideData";
import Swiper from "react-native-swiper";
import { useNavigation } from "expo-router";
const GoogleLogo = require("../assets/images/GoogleLogo.png");
const MetaLogo = require("../assets/images/MetaLogo.png");
const GetStartedScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#A2BAFC]">
      <View className="flex-col justify-center items-center mt-[100px]">
        <Text className="font-medium text-3xl">Online Comic</Text>
        <Text className="font-normal text-base">Continue to start</Text>
      </View>
      <View className="flex-col justify-center items-center mt-[60px]">
        <TouchableOpacity className="flex-row justify-center items-center rounded-3xl bg-white w-[280px] h-[43px] shadow-md">
          <Image
            source={GoogleLogo}
            style={{ width: 28, height: 29 }}
            resizeMode="contain"
          />
          <Text className="font-normal text-base pl-[14px]">
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row mt-[40px] bg-[#2079FF] w-[280px] h-[43px] justify-center items-center rounded-3xl">
          <Image
            source={MetaLogo}
            style={{ width: 27, height: 29 }}
            resizeMode="contain"
          />
          <Text className="font-normal text-base pl-[14px] text-white">
            Continue with Meta
          </Text>
        </TouchableOpacity>
      </View>
      {/* Swiper*/}
      <Swiper
        loop={false}
        dot={<View className="w-2 h-2 bg-gray-500 mx-1 rounded-full" />}
        activeDot={<View className="w-2 h-2 bg-white mx-1 rounded-full" />}
        paginationStyle={{ bottom: 30 }}
      >
        {slides.map((slide) => (
          <View key={slide.id} className="flex-1 justify-center items-center">
            <Image
              source={slide.logo}
              style={{ width: slide.width, height: slide.height }}
              resizeMode="contain"
              className="mb-[5px]"
            />
          </View>
        ))}
      </Swiper>
      <View className="justify-center items-center pb-8">
        <TouchableOpacity
          className="bg-[#424242] rounded-3xl w-[280px] h-[43px]"
          onPress={() => navigation.navigate("HomePageScreen")}
        >
          <Text className="text-white text-base text-center font-normal pt-[8px]">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;
