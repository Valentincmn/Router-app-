import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter, Stack } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

function isValidEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

export default function SignupScreen() {
  const { user, ready, register } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!ready) return null;
  if (user) return <Redirect href="/tasks" />;

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <Stack.Screen options={{ title: "Inscription" }} />
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
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
        title="S'inscrire"
        onPress={() => {
          const n = name.trim();
          const e = email.trim();
          const p = password.trim();

          if (!n) {
            Alert.alert(
              "Erreur",
              "Le nom ne peut pas être vide ni ne contenir uniquement des espaces.",
            );
            return;
          }
          if (!e) {
            Alert.alert(
              "Erreur",
              "L’email ne peut pas être vide ni ne contenir uniquement des espaces.",
            );
            return;
          }
          if (!isValidEmail(e)) {
            Alert.alert("Erreur", "L’email doit être valide.");
            return;
          }
          if (!p) {
            Alert.alert(
              "Erreur",
              "Le mot de passe ne peut pas être vide ni ne contenir uniquement des espaces.",
            );
            return;
          }

          const r = register(e, p, n);
          if (!r.ok) Alert.alert("Erreur", r.err);
          else router.replace("/login");
        }}
      />
      <Button title="Déjà un compte" onPress={() => router.push("/login")} />
    </View>
  );
}
