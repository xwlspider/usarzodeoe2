import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { object, string } from 'zod';
import { useRouter } from "expo-router";
import "../global.css";

// 📋 Validaciones con Zod
const loginSchema = object({
  email: string()
    .min(1, { message: 'El email es obligatorio' })
    .refine(val => val.includes('@'), { message: 'El email debe contener el símbolo "@"' })
    .refine(
      val => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val),
      { message: 'El formato del email es inválido (ej: usuario@dominio.com)' }
    ),
  password: string()
    .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
    .max(12, { message: 'La contraseña no puede tener más de 12 caracteres' })
    .refine(val => /[A-Z]/.test(val), { message: 'Debe tener al menos una mayúscula' })
    .refine(val => /[0-9]/.test(val), { message: 'Debe tener al menos un número' })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'Debe tener un carácter especial' }),
});

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === 'email' || field === 'password') {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log('✅ Login válido:', result.data);
      router.push("/SesionScreen");
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-950">
      <View className="flex-1 bg-blue-950">
        {/* Fondo decorativo */}
        <View className="absolute inset-0">
          <View className="absolute top-0 left-0 right-0 h-1/3 bg-blue-900 opacity-90" />
          <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-cyan-600 opacity-80" />
        </View>

        <View className="min-h-screen justify-center px-6 py-12 relative">
          {/* Logo / Título */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full items-center justify-center mb-4 shadow-2xl border-4 border-white">
              <Text className="text-white text-5xl">⚡</Text>
            </View>
            <Text className="text-5xl font-black text-white mb-2 tracking-wide">
              ログイン
            </Text>
            <Text className="text-cyan-200 text-lg font-semibold tracking-widest">
              WELCOME BACK
            </Text>
          </View>

          {/* Tarjeta del formulario */}
          <View className="bg-white/95 rounded-3xl p-8 shadow-2xl border-2 border-cyan-200">
            {/* Email */}
            <View className="mb-6">
              <Text className="text-blue-800 font-black text-base mb-2">📧 EMAIL</Text>
              <TextInput
                className={`bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl px-5 py-4 text-base text-gray-800 font-medium ${
                  errors.email ? 'border-2 border-red-400' : 'border-2 border-blue-200'
                }`}
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="usuario@dominio.com"
                placeholderTextColor="#93c5fd"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View className="mb-6">
              <Text className="text-blue-800 font-black text-base mb-2">🔐 PASSWORD</Text>
              <TextInput
                className={`bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl px-5 py-4 text-base text-gray-800 font-medium ${
                  errors.password ? 'border-2 border-red-400' : 'border-2 border-blue-200'
                }`}
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#93c5fd"
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.password}</Text>
              )}
            </View>

            {/* Botón Login */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl py-5 shadow-xl border-2 border-cyan-300 active:opacity-90"
            >
              <Text className="text-center font-black text-xl tracking-widest">
                LOGIN ⚡
              </Text>
            </TouchableOpacity>

            {/* Volver al menú principal */}
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl py-4 shadow-md active:opacity-90 border-2 border-cyan-200"
            >
              <Text className="text-center font-black text-lg">
                ← VOLVER
              </Text>
            </TouchableOpacity>

            {/* Enlace para registrarse */}
            <View className="mt-8 items-center">
              <TouchableOpacity onPress={() => router.push("/RegistreScreen")}>
                <Text className="text-blue-700 font-semibold">
                  ¿No tienes cuenta?{" "}
                  <Text className="text-cyan-500 font-extrabold underline">
                    ¡Regístrate!
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
