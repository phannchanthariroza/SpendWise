import { createContext, useContext, useState, type ReactNode } from 'react';

type AppPreferences = {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  profile: { name: string; email: string };
  updateProfile: (profile: { name: string; email: string }) => void;
};

const AppPreferencesContext = createContext<AppPreferences | null>(null);

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({ name: 'Alex Morgan', email: 'alex.morgan@example.com' });
  return <AppPreferencesContext.Provider value={{ darkMode, setDarkMode, profile, updateProfile: setProfile }}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) throw new Error('useAppPreferences must be used inside AppPreferencesProvider');
  return context;
}