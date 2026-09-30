import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '../../contexts/TransactionsContext';

export default function NewTransactionScreen() {
  const { addTransaction } = useTransactions();
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const categories = ['Food', 'Transport', 'Shopping', 'Education', 'Saving'];
  const save = () => { const numericAmount = Number(amount); if (!merchant.trim() || !numericAmount) return; addTransaction({ merchant: merchant.trim(), amount: numericAmount, category, date: 'Just now', note: category === 'Saving' ? 'Added to savings' : 'Added from SpendWise', icon: category === 'Food' ? 'cafe-outline' : category === 'Transport' ? 'car-outline' : category === 'Education' ? 'book-outline' : category === 'Saving' ? 'trending-up-outline' : 'cart-outline', color: category === 'Saving' ? '#14b8a6' : '#2563eb' }); router.back(); };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()}><Ionicons name="close" size={26} color="#0f172a" /></Pressable>
        <Text style={styles.title}>Add expense</Text>
        <View style={{ width: 26 }} />
      </View>
      <Text style={styles.label}>Merchant</Text>
      <TextInput value={merchant} onChangeText={setMerchant} placeholder="e.g. Campus Cafe" placeholderTextColor="#94a3b8" style={styles.input} autoFocus />
      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountInput}>
        <Text style={styles.currency}>$</Text>
        <TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor="#94a3b8" keyboardType="decimal-pad" style={styles.amountText} />
      </View>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categories}>
        {categories.map((item) => (
          <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.selected]}>
            <Text style={[styles.categoryText, category === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={save} style={[styles.save, (!merchant.trim() || !Number(amount)) && styles.disabled]}>
        <Text style={styles.saveText}>{category === 'Saving' ? 'Save contribution' : 'Save expense'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#f8fafc', padding: 22 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }, title: { color: '#0f172a', fontSize: 19, fontWeight: '800' }, label: { color: '#334155', fontWeight: '700', marginBottom: 8, marginTop: 16 }, input: { backgroundColor: '#fff', borderRadius: 14, padding: 16, color: '#0f172a', fontSize: 16 }, amountInput: { backgroundColor: '#fff', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center' }, currency: { color: '#2563eb', fontSize: 24, fontWeight: '800', marginHorizontal: 5 }, amountText: { flex: 1, color: '#0f172a', fontSize: 24, fontWeight: '700' }, categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, category: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 }, selected: { backgroundColor: '#dbeafe' }, categoryText: { color: '#64748b', fontWeight: '700' }, selectedText: { color: '#2563eb' }, save: { backgroundColor: '#2563eb', borderRadius: 15, padding: 17, alignItems: 'center', marginTop: 34 }, disabled: { opacity: 0.45 }, saveText: { color: '#fff', fontWeight: '800', fontSize: 16 } });