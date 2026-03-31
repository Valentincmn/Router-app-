import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter, Stack } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { user, ready, login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!ready) return null;
  if (user) return <Redirect href="/tasks" />;

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <Stack.Screen options={{ title: "Connexion" }} />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button
        title="Se connecter"
        onPress={() => {
          const r = login(email, password);
          if (!r.ok) Alert.alert("Erreur", r.err);
          else router.replace("/tasks");
        }}
      />
      <Button title="Inscription" onPress={() => router.push("/signup")} />
    </View>
  );
}
