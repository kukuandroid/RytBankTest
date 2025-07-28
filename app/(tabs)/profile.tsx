import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile</Text>
      
      <Pressable 
        onPress={() => {router.push('/profile/edit')}}
        style={{ 
          backgroundColor: '#007AFF', 
          padding: 15, 
          borderRadius: 8 
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Edit Profile
        </Text>
      </Pressable>
    </View>
  );
}