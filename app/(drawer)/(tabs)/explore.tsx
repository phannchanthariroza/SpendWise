import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '../../../contexts/TransactionsContext';
import { useAppPreferences } from '../../../contexts/AppPreferencesContext';

export default function ExploreScreen() {
  const { transactions } = useTransactions();
  const [query, setQuery] = useState('');
  const { darkMode } = useAppPreferences();
  const theme = darkMode ? { background: '#0f172a', card: '#1e293b', text: '#f8fafc', muted: '#cbd5e1' } : { background: '#f8fafc', card: '#fff', text: '#0f172a', muted: '#94a3b8' };
  const filtered = transactions.filter((item) => `${item.merchant} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
    <Text style={[styles.title, { color: theme.text }]}>Spending</Text><Text style={[styles.subtitle, { color: theme.muted }]}>Every expense, in one clear view.</Text>
    <View style={styles.search}><Ionicons name="search-outline" size={20} color="#94a3b8" /><TextInput value={query} onChangeText={setQuery} placeholder="Search transactions" placeholderTextColor="#94a3b8" style={styles.input} /></View>
    <FlatList data={filtered} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListEmptyComponent={<Text style={[styles.empty, { color: theme.muted }]}>No transactions match your search.</Text>} renderItem={({ item }) => <Pressable onPress={() => router.push(`/transaction/${item.id}`)} style={[styles.row, { backgroundColor: theme.card }]}><View style={[styles.icon, { backgroundColor: item.color + '20' }]}><Ionicons name={item.icon as never} size={21} color={item.color} /></View><View style={styles.info}><Text style={[styles.merchant, { color: theme.text }]}>{item.merchant}</Text><Text style={[styles.meta, { color: theme.muted }]}>{item.category} · {item.date}</Text></View><Text style={[styles.amount, { color: theme.text }]}>-${item.amount.toFixed(2)}</Text></Pressable>} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#f8fafc', paddingHorizontal: 22 }, title: { color: '#0f172a', fontSize: 30, fontWeight: '800', marginTop: 20 }, subtitle: { color: '#64748b', marginTop: 5 }, search: { height: 50, backgroundColor: '#fff', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginVertical: 20 }, input: { flex: 1, marginLeft: 10, color: '#0f172a' }, list: { paddingBottom: 20 }, row: { backgroundColor: '#fff', borderRadius: 18, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }, icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, info: { flex: 1, marginLeft: 12 }, merchant: { color: '#0f172a', fontSize: 15, fontWeight: '700' }, meta: { color: '#94a3b8', fontSize: 12, marginTop: 4 }, amount: { color: '#0f172a', fontWeight: '800' }, empty: { textAlign: 'center', color: '#64748b', marginTop: 40 } });