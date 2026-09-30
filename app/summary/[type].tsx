import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppPreferences } from '../../contexts/AppPreferencesContext';
import { useTransactions } from '../../contexts/TransactionsContext';

export default function SummaryScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const isSavings = type === 'savings';
  const { darkMode } = useAppPreferences();
  const { transactions, totalSpent, totalSaved } = useTransactions();
  const theme = darkMode ? { background: '#0f172a', card: '#1e293b', text: '#f8fafc', muted: '#cbd5e1', line: '#334155' } : { background: '#f8fafc', card: '#fff', text: '#0f172a', muted: '#64748b', line: '#e2e8f0' };
  const matchingTransactions = transactions.filter((transaction) => isSavings ? transaction.category === 'Saving' : transaction.category !== 'Saving');
  const total = isSavings ? totalSaved : totalSpent;
  const accent = isSavings ? '#14b8a6' : '#2563eb';
  return <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={24} color={theme.text} /><Text style={[styles.backText, { color: theme.text }]}>Home</Text></Pressable>
      <View style={[styles.hero, { backgroundColor: isSavings ? (darkMode ? '#134e4a' : '#ccfbf1') : accent }]}><Ionicons name={isSavings ? 'trending-up-outline' : 'wallet-outline'} size={30} color={isSavings ? '#fff' : '#dbeafe'} /><Text style={[styles.heroLabel, { color: isSavings ? (darkMode ? '#99f6e4' : '#0f766e') : '#dbeafe' }]}>{isSavings ? 'Total savings' : 'Spent this month'}</Text><Text style={[styles.heroAmount, { color: isSavings ? (darkMode ? '#f0fdfa' : '#115e59') : '#fff' }]}>{isSavings ? '+' : ''}${total.toFixed(2)}</Text><Text style={[styles.heroHint, { color: isSavings ? (darkMode ? '#a7f3d0' : '#0f766e') : '#bfdbfe' }]}>{matchingTransactions.length} transaction{matchingTransactions.length === 1 ? '' : 's'}</Text></View>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{isSavings ? 'Savings activity' : 'Spending activity'}</Text>
      {matchingTransactions.map((transaction) => <Pressable key={transaction.id} onPress={() => router.push(`/transaction/${transaction.id}`)} style={[styles.row, { backgroundColor: theme.card, borderBottomColor: theme.line }]}><View style={[styles.icon, { backgroundColor: transaction.color + '20' }]}><Ionicons name={transaction.icon as never} size={21} color={transaction.color} /></View><View style={styles.info}><Text style={[styles.merchant, { color: theme.text }]}>{transaction.merchant}</Text><Text style={[styles.meta, { color: theme.muted }]}>{transaction.category} · {transaction.date}</Text></View><Text style={[styles.amount, { color: isSavings ? '#14b8a6' : theme.text }]}>{isSavings ? '+' : '-'}${transaction.amount.toFixed(2)}</Text></Pressable>)}
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, paddingHorizontal: 22 }, back: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 14 }, backText: { fontSize: 16, fontWeight: '700' }, hero: { borderRadius: 22, padding: 22, marginTop: 8 }, heroLabel: { fontSize: 14, fontWeight: '700', marginTop: 16 }, heroAmount: { fontSize: 36, fontWeight: '800', marginTop: 5 }, heroHint: { fontSize: 13, marginTop: 5 }, sectionTitle: { fontSize: 20, fontWeight: '800', marginTop: 28, marginBottom: 12 }, row: { borderRadius: 17, borderBottomWidth: 1, padding: 14, marginBottom: 9, flexDirection: 'row', alignItems: 'center' }, icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, info: { flex: 1, marginLeft: 12 }, merchant: { fontSize: 15, fontWeight: '700' }, meta: { fontSize: 12, marginTop: 4 }, amount: { fontWeight: '800' } });