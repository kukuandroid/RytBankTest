import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TransferAcknowledgment() {
  const { status, message, amount, contact } = useLocalSearchParams();

  const isSuccess = status === 'success';
  let contactName: string = '';
  if (typeof contact === 'string') {
    contactName = contact;
  } else if (Array.isArray(contact)) {
    contactName = contact.join(', ');
  } else if (contact && typeof contact === 'object' && 'name' in contact) {
    contactName = (contact as { name: string }).name;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, isSuccess ? styles.success : styles.fail]}>
        <Text style={styles.icon}>{isSuccess ? '✓' : '✗'}</Text>
      </View>
      <Text style={[styles.title, isSuccess ? styles.successText : styles.failText]}>
        {isSuccess ? 'Transfer Successful!' : 'Transfer Failed'}
      </Text>
      <Text style={styles.amount}>RM {amount}</Text>
      <Text style={styles.contact}>{contactName}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={[styles.button, isSuccess ? styles.success : styles.fail]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>{isSuccess ? 'Back to Dashboard' : 'Try Again'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: '#22C55E',
  },
  fail: {
    backgroundColor: '#EF4444',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  successText: {
    color: '#22C55E',
  },
  failText: {
    color: '#EF4444',
  },
  amount: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  contact: {
    fontSize: 18,
    color: '#475569',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
