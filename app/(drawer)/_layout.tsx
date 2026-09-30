import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppPreferences } from '../../contexts/AppPreferencesContext';

export default function DrawerLayout() {
  const { darkMode } = useAppPreferences();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEdgeWidth: 40,
        drawerActiveTintColor: '#60a5fa',
        drawerInactiveTintColor: darkMode ? '#cbd5e1' : '#64748b',
        drawerStyle: { backgroundColor: darkMode ? '#0f172a' : '#ffffff' },
        drawerLabelStyle: { color: darkMode ? '#f8fafc' : '#0f172a', fontSize: 15, fontWeight: '600' },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
