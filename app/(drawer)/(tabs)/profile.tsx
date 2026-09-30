import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppPreferences } from '../../../contexts/AppPreferencesContext';

export default function ProfileScreen() {
  const { darkMode, profile } = useAppPreferences();
  const theme = darkMode ? darkTheme : lightTheme;
  const actions: Array<['person-outline' | 'card-outline' | 'settings-outline', string, string]> = [['person-outline', 'Personal details', '/profile/personal-details'], ['card-outline', 'Payment methods', '/profile/payment-methods'], ['settings-outline', 'Settings', '/settings']];
  return <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}><View style={styles.profile}><View style={styles.avatar}><Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text></View><Text style={[styles.name, { color: theme.text }]}>{profile.name}</Text><Text style={[styles.email, { color: theme.muted }]}>{profile.email}</Text></View><View style={[styles.menu, { backgroundColor: theme.card }]}>{actions.map(([icon, label, path]) => <Pressable key={label} style={[styles.item, { borderBottomColor: theme.border }]} onPress={() => router.push(path as never)}><Ionicons name={icon} size={22} color="#2563eb" /><Text style={[styles.label, { color: theme.text }]}>{label}</Text><Ionicons name="chevron-forward" size={18} color="#94a3b8" /></Pressable>)}</View></SafeAreaView>;
}

const lightTheme = { background: '#f8fafc', card: '#fff', text: '#0f172a', muted: '#64748b', border: '#f1f5f9' };
const darkTheme = { background: '#0f172a', card: '#1e293b', text: '#f8fafc', muted: '#cbd5e1', border: '#334155' };
const styles = StyleSheet.create({ screen: { flex: 1, paddingHorizontal: 22 }, profile: { alignItems: 'center', paddingVertical: 34 }, avatar: { width: 84, height: 84, borderRadius: 28, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#2563eb', fontSize: 34, fontWeight: '800' }, name: { fontSize: 22, fontWeight: '800', marginTop: 14 }, email: { marginTop: 4 }, menu: { borderRadius: 18, paddingHorizontal: 16 }, item: { minHeight: 62, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 }, label: { flex: 1, fontSize: 15, fontWeight: '600', marginLeft: 14 } });