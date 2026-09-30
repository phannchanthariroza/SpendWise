import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  note?: string;
  icon: string;
  color: string;
};

const initialTransactions: Transaction[] = [
  { id: '1', merchant: 'Campus Cafe', category: 'Food', amount: 6.5, date: 'Today, 10:24 AM', note: 'Breakfast and coffee', icon: 'cafe-outline', color: '#f59e0b' },
  { id: '2', merchant: 'Grab Ride', category: 'Transport', amount: 4.25, date: 'Yesterday, 6:40 PM', note: 'Ride home', icon: 'car-outline', color: '#3b82f6' },
  { id: '3', merchant: 'Book World', category: 'Education', amount: 18.9, date: 'Sep 10, 2026', note: 'UX design workbook', icon: 'book-outline', color: '#8b5cf6' },
  { id: '4', merchant: 'Fresh Market', category: 'Shopping', amount: 32.4, date: 'Sep 8, 2026', note: 'Weekly groceries', icon: 'cart-outline', color: '#10b981' },
  { id: '5', merchant: 'Emergency fund', category: 'Saving', amount: 100, date: 'Sep 7, 2026', note: 'Monthly savings contribution', icon: 'trending-up-outline', color: '#14b8a6' },
];

type TransactionsContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, changes: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
  getTransaction: (id: string) => Transaction | undefined;
  totalSpent: number;
  totalSaved: number;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const value = useMemo(() => ({
    transactions,
    addTransaction: (transaction: Omit<Transaction, 'id'>) => setTransactions((current) => [{ ...transaction, id: Date.now().toString() }, ...current]),
    updateTransaction: (id: string, changes: Partial<Omit<Transaction, 'id'>>) => setTransactions((current) => current.map((item) => item.id === id ? { ...item, ...changes } : item)),
    deleteTransaction: (id: string) => setTransactions((current) => current.filter((item) => item.id !== id)),
    getTransaction: (id: string) => transactions.find((transaction) => transaction.id === id),
    totalSpent: transactions.filter((transaction) => transaction.category !== 'Saving').reduce((total, transaction) => total + transaction.amount, 0),
    totalSaved: transactions.filter((transaction) => transaction.category === 'Saving').reduce((total, transaction) => total + transaction.amount, 0),
  }), [transactions]);
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions must be used inside TransactionsProvider');
  return context;
}