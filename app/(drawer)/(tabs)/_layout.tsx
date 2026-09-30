import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppPreferences } from '../../../contexts/AppPreferencesContext';

export default function TabsLayout() {
  const { darkMode } = useAppPreferences();
  const tabBarBackground = darkMode ? '#1e293b' : '#ffffff';
  const tabBarBorder = darkMode ? '#334155' : '#e2e8f0';
  const tabBarText = darkMode ? '#f8fafc' : '#0f172a';
  return <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: true, tabBarActiveTintColor: '#60a5fa', tabBarInactiveTintColor: darkMode ? '#cbd5e1' : '#64748b', tabBarHideOnKeyboard: true, tabBarStyle: { backgroundColor: tabBarBackground, borderTopColor: tabBarBorder }, tabBarLabelStyle: { color: tabBarText, fontSize: 11, fontWeight: '600' } }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="explore" options={{ title: 'Spending', tabBarIcon: ({ color, size }) => <Ionicons name="pie-chart-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="notifications" options={{ title: 'Alerts', tabBarBadge: 2, tabBarIcon: ({ color, size }) => <Ionicons name="notifications-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> }} />
  </Tabs>;
}