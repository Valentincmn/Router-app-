import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "@app";

const empty = { users: {}, session: null, tasks: {} };

async function load() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : empty;
  } catch {
    return empty;
  }
}

function save(data) {
  void AsyncStorage.setItem(KEY, JSON.stringify(data)).catch(() => {});
}

export const PUBLIC_TASKS = [
  { id: "p1", title: "Tâche publique 1" },
  { id: "p2", title: "Tâche publique 2" },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(empty);

  useEffect(() => {
    load()
      .then(setData)
      .finally(() => setReady(true));
  }, []);

  function persist(next) {
    setData(next);
    save(next);
  }

  const email = data.session?.email;
  const user = email ? { email, name: data.users[email]?.name ?? email } : null;
  const myTasks = email ? (data.tasks[email] ?? []) : [];

  function register(mail, password, name) {
    const e = mail.trim().toLowerCase();
    if (!e || !password)
      return { ok: false, err: "Remplis email et mot de passe." };
    if (data.users[e]) return { ok: false, err: "Email déjà utilisé." };
    persist({
      ...data,
      users: { ...data.users, [e]: { password, name: name.trim() || e } },
    });
    return { ok: true };
  }

  function login(mail, password) {
    const e = mail.trim().toLowerCase();
    const u = data.users[e];
    if (!u || u.password !== password)
      return { ok: false, err: "Identifiants incorrects." };
    persist({ ...data, session: { email: e } });
    return { ok: true };
  }

  function logout() {
    persist({ ...data, session: null });
  }

  function addTask(title) {
    const t = title.trim();
    if (!email || !t) return;
    const next = [...myTasks, { id: String(Date.now()), title: t }];
    persist({ ...data, tasks: { ...data.tasks, [email]: next } });
  }

  return (
    <AppContext.Provider
      value={{
        ready,
        user,
        myTasks,
        register,
        login,
        logout,
        addTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const v = useContext(AppContext);
  if (!v) throw new Error("AppProvider manquant");
  return v;
}
