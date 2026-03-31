import { useApp } from "@/contexts/app-context";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function NewTaskScreen() {
  const { user, ready, addTask } = useApp();
  const router = useRouter();
  const [title, setTitle] = useState("");

  if (!ready) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12 }}>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button
        title="Créer"
        onPress={() => {
          addTask(title);
          router.replace("/tasks");
        }}
      />
    </View>
  );
}
