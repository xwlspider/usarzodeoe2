import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegistreScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SesionScreen" options={{ headerShown: false }} />
    </Stack>
  );
}