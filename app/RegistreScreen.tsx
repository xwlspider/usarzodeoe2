import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import CustomInput from "./CustomInput";


// 📋 Esquema de validación con Zod (incluye confirmación de contraseña)
const registerSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Debe ser un correo electrónico válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Debes confirmar tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function RegistreScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = () => {
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("✅ Registro exitoso");
      router.push("/LoginScreen");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-blue-100"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center mt-20 mb-10">
          <View className="bg-blue-200 p-8 rounded-3xl shadow-lg w-11/12 max-w-sm">
            <Text className="text-3xl font-bold text-blue-700 text-center mb-6">
              Crear cuenta
            </Text>

            {/* Campo Nombre */}
            <CustomInput
              label="Nombre"
              placeholder="Tu nombre"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              error={errors.name}
              />

            {/* Campo Email */}
            <CustomInput
                label="Correo electrónico"
                placeholder="ejemplo@gmail.com"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                error={errors.email}
                />

            {/* Campo Contraseña */}
            <CustomInput
                label="Contraseña"
                placeholder="••••••••"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                error={errors.password}
            />

            {/* Campo Confirmar Contraseña */}
            <CustomInput
               label="Confirmar contraseña"
                placeholder="••••••••"
                secureTextEntry
                value={form.confirmPassword}
                onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                error={errors.confirmPassword}
              />

            {/* TexSchemas → Requerimientos */}
            <View className="bg-blue-50 p-3 rounded-xl mt-2 mb-4">
              <Text className="text-blue-600 text-sm font-medium">🔹 Requisitos:</Text>
              <Text className="text-blue-600 text-xs">
                - El nombre debe tener al menos 3 caracteres.{"\n"}
                - Usa un correo electrónico válido.{"\n"}
                - La contraseña debe tener al menos 6 caracteres.{"\n"}
                - Ambas contraseñas deben coincidir.
              </Text>
            </View>

            {/* Botón Registrarse */}
            <TouchableOpacity
              onPress={handleRegister}
              className="bg-cyan-500 py-3 rounded-2xl mb-3 active:bg-cyan-600"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Registrarse
              </Text>
            </TouchableOpacity>

            {/* Botón volver */}
            <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
              <Text className="text-blue-600 text-center mt-2 underline">
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

