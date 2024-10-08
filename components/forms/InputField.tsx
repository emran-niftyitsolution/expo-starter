import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Image,
  Platform,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { cn } from "../../common/utils/cn"; // Adjust path accordingly

interface InputFieldProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  rules?: object;
  secureTextEntry?: boolean;
  type:
    | "text"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "time"
    | "url"
    | "week"
    | "button"
    | "switch";
  options?: { label: string; value: any }[]; // For select dropdown
  mode?: "date" | "time" | "datetime"; // For DateTimePicker
  imageSrc?: string; // For image type input
  leftIcon?: () => React.ReactNode;
  rightIcon?: () => React.ReactNode;
  onReset?: () => void; // For reset button
  onSubmit?: () => void; // For submit button
  onFileSelect?: (file: any) => void; // For file type input
  className?: string; // New prop for custom class name
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  label,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  type,
  options = [],
  mode = "date",
  leftIcon,
  rightIcon,
  onReset,
  onSubmit,
  className, // Destructure the new className prop
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const buttonTypes = ["button", "submit", "reset"];

  const handleDateChange =
    (onChange: (date: Date) => void) => (event: any, selectedDate?: Date) => {
      setShowPicker(Platform.OS === "ios"); // Keep picker open on iOS after selection
      if (selectedDate) {
        onChange(selectedDate);
      }
    };

  const handleImagePicker = async (onChange: (uri: string) => void) => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0].uri || "");
    }
  };

  const renderInput = ({
    onChange,
    onBlur,
    value,
    error,
  }: {
    onChange: (value: any) => void;
    onBlur: () => void;
    value: any;
    error?: any;
  }) => {
    switch (type) {
      case "text":
      case "email":
      case "tel":
      case "url":
      case "search":
      case "password":
      case "number":
        return (
          <View
            className={cn(
              "flex-row items-center rounded-lg border px-4 py-3 shadow-md focus:border-blue-500",
              className,
            )}
          >
            {leftIcon && <View className="mr-2">{leftIcon()}</View>}
            <TextInput
              className={cn(
                "flex-1",
                error ? "border-red-500" : "border-gray-300",
              )}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              keyboardType={
                type === "email"
                  ? "email-address"
                  : type === "tel"
                    ? "phone-pad"
                    : type === "url"
                      ? "url"
                      : type === "search"
                        ? "web-search"
                        : type === "number"
                          ? "numeric"
                          : "default"
              }
            />
            {rightIcon && <View className="ml-2">{rightIcon()}</View>}
          </View>
        );

      case "switch":
        return (
          <Switch
            value={value}
            onValueChange={onChange}
            className={cn(className)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            value={value}
            onValueChange={onChange}
            color={value ? "#3b82f6" : undefined}
            className={cn("rounded-md", className)}
          />
        );

      case "range":
        return (
          <Slider
            value={value || 0}
            onValueChange={onChange}
            minimumValue={0}
            maximumValue={100}
            step={1}
            className={cn("h-10 w-full", className)}
          />
        );

      case "date":
      case "time":
        return (
          <>
            <Pressable
              onPress={() => setShowPicker(true)}
              className={cn(className)}
            >
              <View
                className={cn(
                  "flex-row items-center rounded-md border px-4 py-3 shadow-md focus:border-blue-500",
                  className,
                )}
              >
                {leftIcon && <View className="mr-2">{leftIcon()}</View>}
                <TextInput
                  className="flex-1"
                  placeholder={placeholder}
                  value={value ? value.toDateString() : ""}
                  onFocus={() => setShowPicker(true)}
                  editable={false}
                />
                {rightIcon && <View className="ml-2">{rightIcon()}</View>}
              </View>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={value || new Date()}
                mode={mode}
                display="default"
                onChange={handleDateChange(onChange)}
                className={cn(className)}
              />
            )}
          </>
        );

      case "image":
        return (
          <Pressable
            onPress={() => handleImagePicker(onChange)}
            className={cn("flex items-center justify-center", className)}
          >
            {value ? (
              <Image
                source={{ uri: value }}
                className="h-32 w-32 rounded-full shadow-lg"
              />
            ) : (
              <Text className="text-blue-500">Upload Image</Text>
            )}
          </Pressable>
        );

      case "button":
      case "submit":
      case "reset":
        return (
          <Pressable
            onPress={type === "reset" ? onReset : onSubmit}
            className={cn(
              "rounded-full bg-blue-600 py-3 shadow-md hover:bg-blue-700 active:bg-blue-800",
              type === "reset"
                ? "bg-gray-600 hover:bg-gray-700 active:bg-gray-800"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
              className,
            )}
          >
            <Text className="text-center text-white">
              {label || (type === "submit" ? "Submit" : "Button")}
            </Text>
          </Pressable>
        );

      default:
        return null;
    }
  };

  return (
    <View className={cn("mb-6", className)}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            {label && !buttonTypes.includes(type) && (
              <Text className="mb-2 text-lg font-semibold text-gray-800">
                {label}
              </Text>
            )}
            {renderInput({ onChange, onBlur, value, error })}
            {error && (
              <Text className="mt-1 text-red-500">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default InputField;
