import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import InputField from "../../../../components/forms/InputField";

interface LoginFormInputs {
  email: string;
  password: string;
  age: string;
}

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <View className="mt-5">
      <InputField
        control={control}
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Please enter a valid email address",
          },
        }}
      />

      <InputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        rightIcon={() => (
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}
      />

      <InputField
        control={control}
        name="submit"
        type="submit"
        onSubmit={handleSubmit(onSubmit)}
      />
    </View>
  );
}
