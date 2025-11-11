import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SesionScreen() {
  const router = useRouter();

  // Animación suave de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="bg-blue-200 rounded-3xl p-8 w-11/12 max-w-sm items-center shadow-xl"
      >
        <Text className="text-4xl font-extrabold text-blue-700 mb-3 text-center">
          ¡Hola, bro! 👋
        </Text>
        <Text className="text-lg text-blue-600 mb-4 text-center">
          ¡Bienvenido de nuevo al mundo anime! 💫
        </Text>

        <View className="bg-blue-50 rounded-2xl p-4 mb-6 w-full">
          <Text className="text-blue-700 text-center font-semibold text-base">
            🌸 ¿Qué anime verás hoy?
          </Text>
          <Text className="text-blue-600 text-center text-sm mt-2">
            Tal vez algo de acción, romance o un clásico shōnen.  
            ¡Tú decides, héroe del día! ⚔️✨
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/LoginScreen")}
          className="bg-cyan-500 py-3 w-full rounded-2xl active:bg-cyan-600"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Cerrar Sesión
          </Text>
        </TouchableOpacity>

        <Text className="text-blue-600 text-xs mt-4 text-center">
          “El poder del anime está en tu corazón 💙”
        </Text>
      </Animated.View>
    </View>
  );
}
