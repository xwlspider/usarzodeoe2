import React from "react";
import { TextInput, View, Text } from "react-native";

interface CustomInputProps {
  label?: string; // opcional, por si quieres mostrar un texto arriba
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  error?: string; // mensaje de error (Zod)
}

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
}: CustomInputProps) {
  return (
    <View className="mb-5 w-full">
      {/* Etiqueta opcional */}
      {label && (
        <Text className="text-blue-700 font-semibold mb-1 ml-1">{label}</Text>
      )}

      {/* Campo de texto */}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        placeholderTextColor="#93c5fd"
        className={`bg-white rounded-xl px-4 py-3 text-gray-800 border-2 
          ${
            error
              ? "border-red-400"
              : "border-blue-300 focus:border-cyan-400"
          }`}
      />

      {/* Mensaje de error */}
      {error && (
        <Text className="text-red-500 text-sm mt-1 ml-1">⚠️ {error}</Text>
      )}
    </View>
  );
}
