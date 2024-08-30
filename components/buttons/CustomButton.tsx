import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface CustomButtonProps extends PressableProps {
  title: string;
  handlePress: () => void;
}

const CustomButton = ({ title, handlePress }: CustomButtonProps) => {
  return (
    <View>
      <Pressable
        onPress={handlePress}
        className="mt-4 w-full flex-row items-center justify-center rounded-full bg-blue-600 py-3"
      >
        <Text className="text-lg font-semibold text-white">{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;
