import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAppPreferences } from '../../contexts/AppPreferencesContext';

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useAppPreferences();
  const theme = darkMode ? { background: '#0f172a', card: '#1e293b', text: '#f8fafc', muted: '#cbd5e1' } : { background: '#fff', card: '#f8fafc', text: '#102a43', muted: '#52667a' };
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></Pressable>
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      <Text style={[styles.description, { color: theme.muted }]}>Make SpendWise feel right for you.</Text>
      <SettingsToggle label="Budget alerts" description="Get reminders before you overspend." theme={theme} />
      <SettingsToggle label="Weekly summary" description="Receive a weekly spending snapshot." theme={theme} />
      <View style={[styles.setting, { backgroundColor: theme.card }]}><View style={styles.copy}><Text style={[styles.settingTitle, { color: theme.text }]}>Dark mode</Text><Text style={[styles.settingDescription, { color: theme.muted }]}>Use a darker color scheme throughout the app.</Text></View><Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#93c5fd' }} thumbColor={darkMode ? '#2563eb' : '#e2e8f0'} /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  back: {
    fontSize: 18,
    color: '#2563eb',
  },
  title: {
    marginTop: 32,
    fontSize: 28,
    fontWeight: '700',
    color: '#102a43',
  },
  description: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: '#52667a',
  },
  setting: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: { flex: 1, paddingRight: 12 },
  settingTitle: { fontSize: 16, fontWeight: '700', color: '#102a43' },
  settingDescription: { marginTop: 4, color: '#52667a', lineHeight: 19 },
});

function SettingsToggle({ label, description, theme }: { label: string; description: string; theme: { card: string; text: string; muted: string } }) {
  const [enabled, setEnabled] = useState(true);
  return <View style={[styles.setting, { backgroundColor: theme.card }]}><View style={styles.copy}><Text style={[styles.settingTitle, { color: theme.text }]}>{label}</Text><Text style={[styles.settingDescription, { color: theme.muted }]}>{description}</Text></View><Switch value={enabled} onValueChange={setEnabled} trackColor={{ true: '#93c5fd' }} thumbColor={enabled ? '#2563eb' : '#e2e8f0'} /></View>;
}
