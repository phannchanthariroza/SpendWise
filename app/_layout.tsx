import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionsProvider } from '../contexts/TransactionsContext';
import { AppPreferencesProvider } from '../contexts/AppPreferencesContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppPreferencesProvider>
          <TransactionsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(drawer)" />
              <Stack.Screen name="transaction/new" options={{ presentation: 'modal' }} />
              <Stack.Screen name="transaction/[id]" />
              <Stack.Screen name="profile/personal-details" options={{ presentation: 'modal' }} />
              <Stack.Screen name="profile/payment-methods" options={{ presentation: 'modal' }} />
              <Stack.Screen name="summary/[type]" />
            </Stack>
          </TransactionsProvider>
        </AppPreferencesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
