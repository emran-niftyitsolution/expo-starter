import React from "react";
import { Pressable, PressableProps, Text } from "react-native";
import { cn } from "../../common/utils/cn";

interface CustomButtonProps extends PressableProps {
  title: string;
  handlePress?: () => void;
  leftIcon?: () => React.ReactNode;
  rightIcon?: () => React.ReactNode;
  className?: string;
  titleStyle?: string;
}

const CustomButton = ({
  title,
  handlePress,
  className,
  titleStyle,
  leftIcon,
  rightIcon,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        "mt-4 w-full flex-row items-center justify-center space-x-3 rounded-full bg-blue-600 py-3",
        className,
      )}
      {...props}
    >
      {leftIcon && leftIcon()}
      <Text className={cn("text-white", titleStyle)}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
