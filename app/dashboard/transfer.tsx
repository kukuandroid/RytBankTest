import React from 'react';
import { Button, Text, View } from 'react-native';

export default function TransferPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Transfer Funds</Text>
      <Button title="Perform Transfer" onPress={() => alert('Transfer initiated!')} />
    </View>
  );
}
