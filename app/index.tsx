import React from "react";
import { View, Text,  TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-blue-100"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center">
          {/* Tarjeta principal */}
          <View className="bg-blue-200 p-8 rounded-3xl shadow-lg w-11/12 max-w-sm items-center border border-cyan-300">
            {/* Título */}
            <Text className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
              🌸 ¡Bienvenido!
            </Text>

            {/* Subtítulo */}
            <Text className="text-blue-600 mb-8 text-center text-base">
              Inicia sesión o crea una cuenta para continuar.
            </Text>

            {/* Botón Iniciar Sesión */}
            <TouchableOpacity
              onPress={() => router.push("/LoginScreen")}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 w-full py-3 rounded-2xl mb-4 active:opacity-90 shadow-md border border-blue-300"
            >
              <Text className="text-white text-center text-lg font-bold tracking-wide">
                Iniciar Sesión ⚡
              </Text>
            </TouchableOpacity>

            {/* Botón Registrarse */}
            <TouchableOpacity
              onPress={() => router.push("/RegistreScreen")}
              className="bg-gradient-to-r from-cyan-400 to-blue-400 w-full py-3 rounded-2xl active:opacity-90 shadow-md border border-cyan-300"
            >
              <Text className="text-white text-center text-lg font-bold tracking-wide">
                Registrarse 💫
              </Text>
            </TouchableOpacity>
          </View>

          {/* Decoración de fondo */}
          <View className="absolute top-16 left-10 w-3 h-3 bg-cyan-200 rounded-full opacity-70" />
          <View className="absolute bottom-20 right-12 w-4 h-4 bg-blue-300 rounded-full opacity-60" />
          <View className="absolute top-32 right-16 w-2 h-2 bg-white rounded-full opacity-50" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
