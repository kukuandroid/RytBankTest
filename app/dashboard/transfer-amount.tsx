import { Colors } from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { postApi } from '../../utils/api';

const getAcronym = (name = '') => name.split(' ').map(w => w[0]).join('').toUpperCase();

export default function TransferAmount() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const { contactId = null, name = null, phoneNumber = null } = useLocalSearchParams() as {
    contactId: string | null ; 
    name: string | null;
    phoneNumber: string | null;
  };

  const handleTransfer = async () => {
    try {
      await postApi('/transfer', {
        amount: parseFloat(amount),
        userId: 'fatimah123', // user id should come from token, this is just a demo
        note,
        toAccount: name, // Assuming mobile is used as constact ID
      });
      router.push({
        pathname: '/dashboard/transfer-acknowledment',
        params: {
          status: 'success',
          message: 'Transfer successful',
          amount,
          contact: [name ?? '', phoneNumber ?? ''],
        },
      });
    } catch (error) {
      router.replace({
        pathname: '/dashboard/transfer-acknowledment',
        params: {
          status: 'fail',
          message: 'An error occurred while processing the transfer. Please try again.',
          amount,
          contact: [name ?? "", phoneNumber?? ""],
        },
      });
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={64}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Transfer Funds</Text>
          <View style={styles.tile}>
            <View style={styles.avatarAcronym}>
              <Text style={styles.avatarText}>{getAcronym(name ?? undefined)}</Text>
            </View>
            <View>
              <Text style={styles.personName}>{name}</Text>
              <Text style={styles.personMobile}>{phoneNumber}</Text>
            </View>
          </View>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount (RM)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="next"
          />
          <Text style={styles.label}>Note <Text style={styles.optional}>(optional)</Text></Text>
          <TextInput
            style={[styles.input, styles.inputNote]}
            placeholder="Add a note (e.g. for lunch, gift, etc.)"
            value={note}
            onChangeText={setNote}
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[styles.button, !amount && styles.buttonDisabled]}
            onPress={handleTransfer}
            disabled={!amount}
          >
            <Text style={styles.buttonText}>Send Money</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 18,
    marginTop: 2,
    alignSelf: 'stretch',
  },
  avatarAcronym: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  personName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  personMobile: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
    marginTop: 10,
  },
  optional: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '400',
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  inputNote: {
    minHeight: 40,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
