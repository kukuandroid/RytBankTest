import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ActionButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  text?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, style, iconStyle, text = 'Sign Out' }) => (
  <TouchableOpacity style={[styles.signOutButton, style]} onPress={onPress}>
    <MaterialCommunityIcons name="logout" size={24} color="#fff" style={[styles.signOutIcon, iconStyle]} />
    <Text style={styles.signOutButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: Colors.light.background, // Use the light tint color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    width: '90%',
  },
  signOutIcon: {
    marginRight: 10,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActionButton;
