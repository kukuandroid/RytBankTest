// app/(tabs)/profile/index.tsx
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>
        Profile
      </Text>
      
      {user && (
        <View style={{ 
          backgroundColor: '#f8f9fa', 
          padding: 20, 
          borderRadius: 12, 
          marginBottom: 30 
        }}>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Name</Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{user.name}</Text>
          </View>
          
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Email</Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{user.username}</Text>
          </View>
          
          <View>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>User ID</Text>
            <Text style={{ fontSize: 16, color: '#888', fontFamily: 'monospace' }}>
              {user.id}
            </Text>
          </View>
        </View>
      )}

      <View style={{ gap: 12 }}>
        <Pressable 
          onPress={() => router.push('/profile/edit')}
          style={{ 
            backgroundColor: '#007AFF', 
            padding: 16, 
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Edit Profile
          </Text>
        </Pressable>

        <Pressable 
          onPress={handleLogout}
          style={{ 
            backgroundColor: '#FF3B30', 
            padding: 16, 
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}