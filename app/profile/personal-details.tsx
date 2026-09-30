import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAppPreferences } from '../../contexts/AppPreferencesContext';

export default function PersonalDetailsScreen() {
  const { profile, updateProfile } = useAppPreferences();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);
  const save = () => { if (!name.trim() || !email.trim()) return; updateProfile({ name: name.trim(), email: email.trim() }); setSaved(true); };
  return <SafeAreaView style={styles.screen}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></Pressable><Text style={styles.title}>Personal details</Text><Text style={styles.subtitle}>Keep your profile information up to date.</Text><View style={styles.card}><Text style={styles.label}>Full name</Text><TextInput value={name} onChangeText={setName} style={styles.input} /><Text style={styles.label}>Email address</Text><TextInput value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} autoCapitalize="none" /><Pressable style={styles.button} onPress={save}><Text style={styles.buttonText}>{saved ? 'Changes saved' : 'Save changes'}</Text></Pressable></View></SafeAreaView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#f8fafc', padding: 22 }, back: { color: '#2563eb', fontSize: 17, fontWeight: '700' }, title: { color: '#0f172a', fontSize: 30, fontWeight: '800', marginTop: 28 }, subtitle: { color: '#64748b', marginTop: 6 }, card: { backgroundColor: '#fff', borderRadius: 18, padding: 18, marginTop: 26 }, label: { color: '#334155', fontWeight: '700', marginBottom: 8, marginTop: 10 }, input: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 14, color: '#0f172a' }, button: { backgroundColor: '#2563eb', borderRadius: 13, padding: 15, alignItems: 'center', marginTop: 24 }, buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 } });