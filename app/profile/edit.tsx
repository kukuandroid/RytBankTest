import React from 'react';
import { Text, View } from 'react-native';

export default function EditProfile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, color: 'red' }}>Edit Profile</Text>
      <Text style={{ marginTop: 10 }}>Sorry, the page you are looking for does not exist.</Text>
    </View>
  );
}
